const fs = require('fs/promises');

async function main() {

  // Problem: build application excute commands from command.txt file
  async function process() {
    // 1. Open file command.txt
    let commandFileHandle = await fs.open('./command.txt');

    // 2. Read content
    let commandFileBuffer = await commandFileHandle.readFile();

    let commandFileContent = commandFileBuffer.toString('utf-8');

    // 3. Capture command
    /*
      Define commands:
      - Create file: `Create file ${pathFile}`
      - Delete file: `Delete file ${pathFile}`
      - Add content: `Add content file ${pathFile}: ${content}`
      Note: Command seperate by row
    */
    const commandPrefix = {
      createFile: 'Create file: ',
      deleteFile: 'Delete file: ',
      addContent: 'Add content file '
    };

    async function isFileExisted(pathFile) {
      let ans = null;
      if(!pathFile) {
        ans = false;
      }

      try {
        await fs.open(pathFile);
        ans = true;
      } catch (error) {
        ans = false;
      }

      return ans;
    }

    // 4. Excute command (Create/Remove/Update files)
    let commands = commandFileContent.split('\n');
    if(commands.length > 0) {
      for(let i=0; i<commands.length; i++) {
        let command = commands[i];

        if(command.startsWith(commandPrefix.createFile)) {
          let pathFile = command.substring(commandPrefix.createFile.length);
          if(!(await isFileExisted(pathFile))) {
            await fs.appendFile(pathFile, '');
            console.log(`[Done] ${command}`);
          }else {
            console.error(`[Error] ${command}: Found file with path`);
          }
        }else if(command.startsWith(commandPrefix.deleteFile)) {
          let pathFile = command.substring(commandPrefix.deleteFile.length);
          if(await isFileExisted(pathFile)) {
            await fs.unlink(pathFile);
            console.log(`[Done] ${command}`);
          }else {
            console.error(`[Error] ${command}: Not found file with path`);
          }
        }else if(command.startsWith(commandPrefix.addContent)) {
          let colonIndex = command.indexOf(':');
          let pathFile = command.substring(commandPrefix.addContent.length, colonIndex);

          if(await isFileExisted(pathFile)) {
            let content = command.substring((colonIndex + 1));
            await fs.appendFile(pathFile, content);
            console.log(`[Done] ${command}`);
          }else {
            console.error(`[Error] ${command}: Not found file with path`);
          }
        }
      }
    }
  }

  // 5. Listen when command.txt change
  try {
    const commandWatcher = await fs.watch('./command.txt');
    for await (const event of commandWatcher) {
      if(event.eventType == 'change') {
        await process();
      }
    }
  } catch (err) {
    if (err.name === 'AbortError')
      return;
    throw err;
  }
}

main();
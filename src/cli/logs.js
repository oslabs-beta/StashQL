// const conf = new (require('conf'))()
// const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const stashCLI = {};

stashCLI.logAll = async () => {
  const logs = await fs.readFileSync( path.join(process.cwd(), "/logs/logs.txt"), {encoding: 'utf8'});
  console.log(logs);
}

stashCLI.clearLog = async () => {
  await fs.writeFile(path.join(process.cwd(), "/logs/logs.txt"), '', (err) => {
    if (err) console.log(err);
    else {
      console.log('logs cleared');
    }
  });
}


module.exports = stashCLI;
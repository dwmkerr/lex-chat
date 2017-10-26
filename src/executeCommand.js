const exec = require('child_process').exec;
const debug = require('debug')('lex-cli');

/**
 * executeCommand - runs a process and waits for it to terminate. Returns the 
 output of the command as a string.
 *
 * @param command - the shell command to execute.
 * @returns - A promise which resolves with the result of the command as a
 string.
 */
function executeCommand(command) {
  return new Promise((resolve, reject) => {
    let stdout = '';
    let stderr = '';
    const childProcess = exec(command);
    childProcess.stdout.on('data', (data) => { stdout += data; });
    childProcess.stderr.on('data', (data) => { stderr += data; });
    childProcess.on('close', (code) => {
      //  If we have a non-zero error code, reject. Otherwise resolve with the
      //  console output.
      if (code !== 0) {
        const error = new Error(`An error occured running the command: ${command}`);
        error.stderr = stderr;
  
        //  If we're in debug mode, log details.
        debug(`Error running command: ${command}`);
        debug(`Process Exit Code: ${code}`);
        debug(`Stderr Output: ${stderr}`);

        return reject(error);
      }
      resolve(stdout);
    });
  });
}

module.exports = executeCommand;

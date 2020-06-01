const chalk = require('chalk');
const debug = require('debug')('lex-chat');
const readline = require('readline');

const executeCommand = require('./src/executeCommand');

const chooseBot = require('./src/chooseBot');
/**
 * createUserNameForSession - creates a random username suitable for the cli
 session.
 *
 * @returns - a username for the session.
 */
function createUserNameForSession() {
  const sessionNumber = Math.floor(Math.random() * (100000) + 1);
  return `User${sessionNumber}`;
}

function createPrompt(userName, botName) {
  //  Get the longest name, this'll be for formatting the prompt.
  const l1 = userName.length;
  const l2 = botName.length;
  const l = l1 > l2 ? l1 : l2;

  //  Use it to work out the padding.
  const pad1 = ' '.repeat(l - l1);
  const pad2 = ' '.repeat(l - l2);

  return {
    user: () => `${pad1} ${chalk.green(userName)} > `,
    bot: () => `${pad2} ${chalk.blue(botName)} > `
  };
}

function cli() {

  chooseBot()
    .then((choice) => {
      //  If we have no bot, then we can fail and suggest they use the starter
      //  kit.
      if (!choice) {
        console.log();
        console.log('No Lex bots were found on your account!');
        console.log(`The ${chalk.blue.bold('lex-starter-kit')} project can be used to quickly create one:`);
        console.log();
        console.log(`  ${chalk.blue('https://github.com/dwmkerr/lex-starter-kit')}`);
        console.log();
        process.exit(0);
      }

      //  Ready!
      const { bot, version } = choice;
      console.log(`Ready to chat to: ${bot}`);
      console.log('');
      
      //  Create a username for the session.
      const userName = createUserNameForSession();

      //  Create a prompt helper.
      const prompt = createPrompt('me', bot);

      //  Create a readline interface (i.e. an interactive prompt).
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: prompt.user()
      });

      rl.on('line', (line) => {

        //  Create the command.
        const command = `aws lex-runtime post-text --bot-name "${bot}" --bot-alias '${version}' --user-id "${userName}" --input-text "${line}"`;

        //  Excecute the command.
        executeCommand(command)
          .then((response) => {
            //  Decode and write the response.
            const val = JSON.parse(response);
            console.log(`${prompt.bot()}${val.message}`);
            debug(JSON.stringify(val, null, 2));

            //  Run the prompt again.
            rl.prompt();
          })
          .catch((error) => {
            debug('Error executing command...');
            debug(error);
            console.log(`${chalk.red('error')}: ${error.stderr.trim()}`);
            process.exit(1);
          });

      }).on('close', () => {
        process.exit(0);
      });

      //  Start the interactive prompt.
      rl.prompt();
    });

}

module.exports = cli;

const inquirer = require('inquirer');
const executeCommand = require('./executeCommand');

/**
 * chooseBot - Allow the user to select a chat bot. If no chat bots are found,
 * resolves with null.
 *
 * @returns - A promise which resolves with an object containing the bot name
 * and bot version. If no chat bots are found, the promise resolves with null.
 */
function chooseBot() {
  //  Get the bots.
  return executeCommand('aws lex-models get-bots')
    .then((response) => {
      const bots = JSON.parse(response).bots;

      //  Resolve with null if there are no bots.
      if (bots.length === 0) return null;

      return inquirer.prompt([
        {
          type: 'list',
          name: 'bot',
          message: 'Which bot do you want to chat to?',
          choices: bots.map(b => b.name)
        }])
        .then((answers) => {
          const bot = answers.bot;
          const version = bots.find(b => b.name === bot).version;
          return { bot, version };
        });
    });
}

module.exports = chooseBot;

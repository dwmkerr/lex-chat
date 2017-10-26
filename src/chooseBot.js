const inquirer = require('inquirer');
const executeCommand = require('./executeCommand');

function chooseBot() {
  //  Get the bots.
  return executeCommand('aws lex-models get-bots')
    .then((response) => {
      const bots = JSON.parse(response).bots;

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

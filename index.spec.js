const assert = require('assert');
const cli = require('./index');

describe('index', () => {
  it('should export a cli function', () => {
    assert(cli);
  });
});

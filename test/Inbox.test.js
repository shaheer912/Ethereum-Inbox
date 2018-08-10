const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');

let accounts;
let inbox;

beforeEach( async () => {
  // Get a list of all accounts
  // web3.eth.getAccounts()
  //   .then(fetchedAccounts => {
  //     console.log(fetchedAccounts);
  //   });
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deply contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
        data: bytecode,
        arguments: ['Hi There!']
      })
    .send({ from: accounts[0], gas: '1000000' })
    ;
});

describe('Inbox', () => {
  it('should deploy a contract', (done) => {
      assert.ok(inbox.options.address);
      done();
  });

  it('should have a default message "Hi There!"', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, "Hi There!");
  });

  it('should update the message to "Hello"', async () => {
    await inbox.methods.setMessage("Hello").send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, "Hello");
  });
});

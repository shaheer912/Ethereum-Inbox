const HDWalletProvider = require('truffle-hdWallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
  'frozen negative skull expand pulse spawn skirt hobby antique health vacant blush',
  'https://rinkeby.infura.io/v3/6d5f6d8b666c4f4e9939d452d2312096'
);

const web3 = new Web3(provider);

const deploy = async (done) => {
  const accounts = await web3.eth.getAccounts();

  const balance = await web3.eth.getBalance(accounts[0]);
  console.log(balance);
  //return;

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy(
      {
        data:'0x' + bytecode,  // this is a bug fix, see https://github.com/trufflesuite/truffle/issues/558#issuecomment-392344663
        arguments: ['Hello']
      }
    )
    .send({ gas: '279139', from: accounts[0] })
    ;
  console.log('Contract deployed to address', result.options.address);
  done();
};

deploy();

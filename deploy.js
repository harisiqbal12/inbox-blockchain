const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');

const bytecode = evm.bytecode.object;

const provider = new HDWalletProvider(
	'try tunnel vendor sniff insane recall way absent horror mean host rookie',
	'wss://rinkeby.infura.io/ws/v3/adf6f921808849aa9095cb864d23a5ac'
);

const web3 = new Web3(provider);

const deploy = async () => {
	try {
		const accounts = await web3.eth.getAccounts();
		console.log('Deploying by: ', accounts[0]);

		const result = await new web3.eth.Contract(abi)
			.deploy({
				data: bytecode,
				arguments: ['Deployed By @devharis'],
			})
			.send({ from: accounts[0], gas: '1000000' });

		console.log('Contract Deployed At');
		console.log(result.options.address);
    provider.engine.stop()
	} catch (err) {
		console.log(err);
		console.log('error at deploying contracts');
	}
};

deploy();

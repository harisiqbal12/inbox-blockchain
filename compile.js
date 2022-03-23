const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

let complierInput = {
	language: 'Solidity',
	sources: {
		'Inbox.sol': {
			content: source,
		},
	},
	settings: {
		optimizer: {
			enabled: true,
		},
		outputSelection: {
			'*': {
				'*': ['*'],
			},
		},
	},
};

let compiledContract = JSON.parse(solc.compile(JSON.stringify(complierInput)));
module.exports = compiledContract.contracts['Inbox.sol'].Inbox;
// for (let contractName in compiledContract.contracts['Inbox.sol']) {

// 	let abi = compiledContract.contracts['Inbox.sol'][contractName].abi;
// 	console.log(compiledContract.contracts['Inbox.sol'][contractName].evm);
// }

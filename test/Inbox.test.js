const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { abi, evm } = require('../compile');

const bytecode = evm.bytecode.object;

let accounts;
let inbox;
const initialStr = 'Hi there!';

beforeEach(async () => {
	// get a list of all accounts
	accounts = await web3.eth.getAccounts();
	inbox = await new web3.eth.Contract(abi)
		.deploy({
			data: bytecode,
			arguments: [initialStr],
		})
		.send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
	it('deploys a contract', () => {
		assert.ok(inbox.options.address);
	});

	it('has a default message', async () => {
		const message = await inbox.methods.message().call();
		assert.equal(message, initialStr);
	});

	it('can change the message', async () => {
		const setMessageRes = await inbox.methods
			.setMessage('bye')
			.send({ from: accounts[0] });

		const message = await inbox.methods.message().call();
		assert.equal(message, 'bye');
	});
});

// class Car {
// 	park() {
// 		return 'stopped';
// 	}

// 	drive() {
// 		return 'vroom';
// 	}
// }

// let car;

// beforeEach(() => {
// 	car = new Car();
// });

// describe('Car', () => {
// 	it('park function', () => {
// 		assert.equal(car.park(), 'stopped');
// 	});

// 	it('drive function', () => {
// 		assert.equal(car.drive(), 'vroom');
// 	});
// });

/*

+-------------------------------------------------------------------+
|      ____              ____           _        _    ____ ___      |
|     / ___| _   _ _ __ |  _ \ ___   __| |      / \  |  _ \_ _|     |
|     \___ \| | | | '_ \| |_) / _ \ / _` |     / _ \ | |_) | |      |
|      ___) | |_| | | | |  _ < (_) | (_| |    / ___ \|  __/| |      |
|     |____/ \__,_|_| |_|_| \_\___/ \__,_|   /_/   \_\_|  |___|     |
|                                                                   |
+-------------------------------------------------------------------+

             +----------------------------------------------+
 ENGLISH --> |      DO NOT COPY ANY CODE FROM THIS API!     |
             |   NON COPIARE NESSUN CODICE DA QUESTA API!   | <-- ITALIAN
             +----------------------------------------------+

*/

const axios = require('axios');
const { promisify } = require('utils');

const statusCodes = [
	{ status: 0, result: 'success' },
	{ status: 1, result: 'invalid token' },
	{ status: 2, result: 'non-existing type' },
	{ status: 3, result: 'user not found' },
	{ status: 4, result: 'invalid input' },
	{ status: 5, result: 'user has not enough coins' }
];

const getStatus = (statusCode) => statusCodes.find(code => code.status == statusCode)?.result || 'unknown';

class SunRodAPI {
	constructor() {
		this.connect = (token) => this.token = token;
		this.get = async ({ user, bypass }) => {
			if (!this.token) throw new TypeError('SunRodAPI not connected yet, token is missing.');
			if (typeof user !== 'string') throw new TypeError('User id must be a string.');
			const { data } = await axios.post('http://185.196.21.208:5001/', { type: 'get', token: this.token, user });
			if (data.status !== 0 && !bypass) throw new TypeError(`Expected status code was 0, but received ${data.status}. This status code is related to "${getStatus(data.status)}".`);
			return { data: data.coins, result: data.status, result: data.status };
		};
		this.has = async ({ user, coins, bypass }) => {
			if (!this.token) throw new TypeError('SunRodAPI not connected yet, token is missing.');
			if (typeof user !== 'string') throw new TypeError('User id must be a string.');
			if (typeof coins !== 'number') throw new TypeError('Coins must be a number.');
			const { data } = await axios.post('http://185.196.21.208:5001/', { type: 'get', token: this.token, user });
			if (data.status !== 0 && !bypass) throw new TypeError(`Expected status code was 0, but received ${data.status}. This status code is related to "${getStatus(data.status)}".`);
			return { data: coins >= data.coins, result: data.status };
		};
		this.set = async ({ user, coins, bypass }) => {
			if (!this.token) throw new TypeError('SunRodAPI not connected yet, token is missing.');
			if (typeof user !== 'string') throw new TypeError('User id must be a string.');
			if (typeof coins !== 'number') throw new TypeError('Coins must be a number.');
			const { data } = await axios.post('http://185.196.21.208:5001/', { type: 'set', token: this.token, user, coins });
			if (data.status !== 0 && !bypass) throw new TypeError(`Expected status code was 0, but received ${data.status}. This status code is related to "${getStatus(data.status)}".`);
			return { data: { user, coins }, result: data.status };
		};
		this.add = async ({ user, coins, bypass }) => {
			if (!this.token) throw new TypeError('SunRodAPI not connected yet, token is missing.');
			if (typeof user !== 'string') throw new TypeError('User id must be a string.');
			if (typeof coins !== 'number') throw new TypeError('Coins must be a number.');
			const { data } = await axios.post('http://185.196.21.208:5001/', { type: 'add', token: this.token, user, coins });
			if (data.status !== 0 && !bypass) throw new TypeError(`Expected status code was 0, but received ${data.status}. This status code is related to "${getStatus(data.status)}".`);
			return { data: { user, coins }, result: data.status };
		};
		this.remove = async ({ user, coins, bypass }) => {
			if (!this.token) throw new TypeError('SunRodAPI not connected yet, token is missing.');
			if (typeof user !== 'string') throw new TypeError('User id must be a string.');
			if (typeof coins !== 'number') throw new TypeError('Coins must be a number.');
			const { data } = await axios.post('http://185.196.21.208:5001/', { type: 'remove', token: this.token, user, coins });
			if (data.status !== 0 && !bypass) throw new TypeError(`Expected status code was 0, but received ${data.status}. This status code is related to "${getStatus(data.status)}".`);
			return { data: { user, coins }, result: data.status };
		};
		this.transfer = async ({ user1, user2, coins, bypass }) => {
			if (!this.token) throw new TypeError('SunRodAPI not connected yet, token is missing.');
			if (typeof user1 !== 'string' || typeof user2 !== 'string') throw new TypeError('User id must be a string.');
			if (typeof coins !== 'number') throw new TypeError('Coins must be a number.');
			const { data } = await axios.post('http://185.196.21.208:5001/', { type: 'transfer', token: this.token, user1, user2, coins });
			if (data.status !== 0 && !bypass) throw new TypeError(`Expected status code was 0, but received ${data.status}. This status code is related to "${getStatus(data.status)}".`);
			return { data: [ { user: user1, coins: data.coins[0] }, { user: user2, coins: data.coins[1] } ], result: data.status };
		};
	}
}

module.exports = SunRodAPI;
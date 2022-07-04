/*

+-------------------------------------------------------------------+
|      ____              ____           _        _    ____ ___      |
|     / ___| _   _ _ __ |  _ \ ___   __| |      / \  |  _ \_ _|     |
|     \___ \| | | | '_ \| |_) / _ \ / _` |     / _ \ | |_) | |      |
|      ___) | |_| | | | |  _ < (_) | (_| |    / ___ \|  __/| |      |
|     |____/ \__,_|_| |_|_| \_\___/ \__,_|   /_/   \_\_|  |___|     |
|                                                                   |
+-------------------------------------------------------------------+

             +--------------------------------------------------+
 ENGLISH --> |      AVOID TO COPY ANY CODE FROM THIS API!       |
             |   EVITA DI COPIARE ALCUN CODICE DA QUESTA API!   | <-- ITALIAN
             +--------------------------------------------------+

*/

const axios = require('axios');

const statusCodes = [
	{ status: 0, result: 'success' },
	{ status: 1, result: 'invalid token' },
	{ status: 2, result: 'non-existing type' },
	{ status: 3, result: 'invalid input' },
	{ status: 4, result: 'user has not enough coins' }
];

const getStatus = (statusCode) => statusCodes.find(code => code.status == statusCode)?.result || 'unknown';

class SunRodAPI {
	async constructor(token) {
		if (!token) throw new TypeError('Token is missing.');
		const { data } = await axios.post('http://sadyn.it:5001/', { type: 'login', token: this.token });
		if (data.status == 1) throw new TypeError('SunRod token is invalid.');
		this.token = token;
	}
	get = async (input) => {
		if (typeof input !== 'object') throw new TypeError('Input must be an object. Follow docs for more details.');
		const { user, bypass } = input;
		if (!this.token) throw new TypeError('SunRodAPI not connected yet, token is missing.');
		if (typeof user !== 'string') throw new TypeError('User id must be a string.');
		const { data } = await axios.post('http://sadyn.it:5001/', { type: 'get', token: this.token, user });
		if (data.status !== 0 && !bypass) throw new TypeError(`Expected status code was 0, but received ${data.status}. This status code is related to "${getStatus(data.status)}".`);
		return { data: data.coins, result: data.status };
	};
	has = async (input) => {
		if (typeof input !== 'object') throw new TypeError('Input must be an object. Follow docs for more details.');
		const { user, coins, bypass } = input;
		if (!this.token) throw new TypeError('SunRodAPI not connected yet, token is missing.');
		if (typeof user !== 'string') throw new TypeError('User id must be a string.');
		if (typeof coins !== 'number') throw new TypeError('Coins must be a number.');
		const { data } = await axios.post('http://sadyn.it:5001/', { type: 'get', token: this.token, user });
		if (data.status !== 0 && !bypass) throw new TypeError(`Expected status code was 0, but received ${data.status}. This status code is related to "${getStatus(data.status)}".`);
		return { data: coins <= data.coins, result: data.status };
	};
	set = async (input) => {
		if (typeof input !== 'object') throw new TypeError('Input must be an object. Follow docs for more details.');
		const { user, coins, bypass } = input;
		if (!this.token) throw new TypeError('SunRodAPI not connected yet, token is missing.');
		if (typeof user !== 'string') throw new TypeError('User id must be a string.');
		if (typeof coins !== 'number') throw new TypeError('Coins must be a number.');
		const { data } = await axios.post('http://sadyn.it:5001/', { type: 'set', token: this.token, user, coins });
		if (data.status !== 0 && !bypass) throw new TypeError(`Expected status code was 0, but received ${data.status}. This status code is related to "${getStatus(data.status)}".`);
		return { data: { user, coins }, result: data.status };
	};
	add = async (input) => {
		if (typeof input !== 'object') throw new TypeError('Input must be an object. Follow docs for more details.');
		const { user, coins, bypass } = input;
		if (!this.token) throw new TypeError('SunRodAPI not connected yet, token is missing.');
		if (typeof user !== 'string') throw new TypeError('User id must be a string.');
		if (typeof coins !== 'number') throw new TypeError('Coins must be a number.');
		const { data } = await axios.post('http://sadyn.it:5001/', { type: 'add', token: this.token, user, coins });
		if (data.status !== 0 && !bypass) throw new TypeError(`Expected status code was 0, but received ${data.status}. This status code is related to "${getStatus(data.status)}".`);
		return { data: { user, coins: data.coins }, result: data.status };
	};
	remove = async (input) => {
		if (typeof input !== 'object') throw new TypeError('Input must be an object. Follow docs for more details.');
		const { user, coins, bypass } = input;
		if (!this.token) throw new TypeError('SunRodAPI not connected yet, token is missing.');
		if (typeof user !== 'string') throw new TypeError('User id must be a string.');
		if (typeof coins !== 'number') throw new TypeError('Coins must be a number.');
		const { data } = await axios.post('http://sadyn.it:5001/', { type: 'remove', token: this.token, user, coins });
		if (data.status !== 0 && !bypass) throw new TypeError(`Expected status code was 0, but received ${data.status}. This status code is related to "${getStatus(data.status)}".`);
		return { data: { user, coins: data.coins }, result: data.status };
	};
	transfer = async (input) => {
		if (typeof input !== 'object') throw new TypeError('Input must be an object. Follow docs for more details.');
		const { user1, user2, coins, bypass } = input;
		if (!this.token) throw new TypeError('SunRodAPI not connected yet, token is missing.');
		if (typeof user1 !== 'string' || typeof user2 !== 'string') throw new TypeError('User id must be a string.');
		if (typeof coins !== 'number') throw new TypeError('Coins must be a number.');
		const { data } = await axios.post('http://sadyn.it:5001/', { type: 'transfer', token: this.token, user1, user2, coins });
		if (data.status !== 0 && !bypass) throw new TypeError(`Expected status code was 0, but received ${data.status}. This status code is related to "${getStatus(data.status)}".`);
		return { data: [ { user: user1, coins: data.coins[0] }, { user: user2, coins: data.coins[1] } ], result: data.status };
	};
}

module.exports = SunRodAPI;
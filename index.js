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
	{ status: 1, result: 'wrong token' },
	{ status: 2, result: 'non-existing type' },
	{ status: 3, result: 'user not found' },
];

const getStatus = (statusCode) => statusCodes.find(code => code.status == statusCode)?.result || 'unknown';

class SunRodAPI {
	constructor() {
		this.connect = (token) => this.token = token;
		this.get = async (user) => {
			if (!this.token) throw new TypeError('SunRodAPI not connected yet, token is missing.');
			if (typeof user !== 'string') throw new TypeError('User id must be a string.');
			const { data } = await axios.post('http://localhost:5001/', { type: 'get', token: this.token, user });
			if (data.status !== 0) throw new TypeError(`Expected status code was 0, but received ${data.status}. This status code is related to "${getStatus(data.status)}".`);
			return data.coins;
		};
		// this.set = promisify(async (user, coins) => {
		// 	if (!this.token) throw new TypeError('SunRodAPI not connected yet.');
		// 	console.log(`set ${coins}$ of ${user}`);
		// 	const { data } = await axios.post('http://localhost:5001/', { type: 'get', token: this.token, user });
		// 	if (data.status !== 0) throw new TypeError(`Expected status code was 0, but received ${data.status}. This status code is related to "${getStatus(data.status)}".`);
		// });
	}
}

module.exports = SunRodAPI;

// const x = async () => {

// 	const res = await axios.post('http://185.196.21.208:5001/', {
// 		answer: 42,
// 	});

// };

// x();
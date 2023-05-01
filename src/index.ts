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

import endpoint from './endpoint';
import checkType from './checkType';
import checkError from './checkError';

import User from './components/User';

/**
 * The SunRod Client you need to interact with the API.
 */
export default class SunRod {

	/**
	 * The SunRod Token
	 */
	readonly token: string;

	/**
	 * If this is enabled, SunRod will not throw any error
	 */
	readonly bypass: boolean;

	/**
	 * Constructs the SunRod Client.
	 * @constructor
	 * @param token The SunRod Token you're using to connect to the API
	 * @param options.bypass Whenever there's an error, it will not appear
	 * @returns The constructed client linked to your token
	 * @example
	 * const SunRod = require('sunrod-api');
	 * const client = new SunRod('your-token');
	 */
	constructor(token: string, options?: { bypass?: boolean }) {
		if (!token) throw new TypeError('Token is missing.');
		this.token = token;
		if (options.bypass !== undefined) this.bypass = options.bypass;
		endpoint.get('verify', token).then((res) => {
			if (!res) throw new Error('SunRod is currently unreachable. Check availability on https://status.sadyn.it');
			if (!res.data.verify) throw new Error('Your SunRod token is invalid.');
		});
	}
	
	/**
	 * Get the amount of coins owned by the user
	 * @param id The user ID
	 * @returns The amount of coins owned by the user
	 * @example
	 * const SunRod = require('sunrod-api');
	 * const client = new SunRod('your-token');
	 * await client.get('604790617138266149'); // Returns the User
	 */
	async get(id: string): Promise<User | { error: string }> {
		checkType([ { name: 'user', type: 'string', value: id } ]);
		const res = await endpoint.get(`user/${id}`, this.token);
		if (res.status !== 200 && !this.bypass) throw checkError(res.status);
		if (res.data.error) return { error: res.data.error };
		const { coins } = res.data;
		return new User(id, coins);
	}

	/**
	 * Check if the user has the minimum amount of coins
	 * @param id The user ID
	 * @param coins The amount of minimum coins
	 * @returns A boolean, true if the user has the minimum amount of coins
	 * @example
	 * const SunRod = require('sunrod-api');
	 * const client = new SunRod('your-token');
	 * await client.has('604790617138266149', 100); // Returns a boolean
	 */
	async has(id: string, coins: number): Promise<boolean | { error: string }> {
		checkType([
			{ name: 'id', type: 'string', value: id },
			{ name: 'coins', type: 'number', value: coins },
		]);
		const res = await endpoint.get(`user/${id}`, this.token);
		if (res.status !== 200 && !this.bypass) throw checkError(res.status);
		if (res.data.error) return { error: res.data.error };
		const { coins: userCoins } = res.data;
		return coins <= userCoins;
	}

	/**
	 * Set the precise amount of coins owned by a user
	 * @param id The user ID
	 * @param coins The amount of coins
	 * @returns The new user
	 * @example
	 * const SunRod = require('sunrod-api');
	 * const client = new SunRod('your-token');
	 * await client.set('604790617138266149', 100); // Sets to 100 coins
	 */
	async set(id: string, coins: number): Promise<User | { error: string }> {
		checkType([
			{ name: 'id', type: 'string', value: id },
			{ name: 'coins', type: 'number', value: coins },
		]);
		const res = await endpoint.post(`user/${id}`, { coins, protocol: 'SET' }, this.token);
		if (res.status !== 200 && !this.bypass) throw checkError(res.status);
		if (res.data.error) return { error: res.data.error };
		return new User(id, coins);
	}

	/**
	 * Adds a specific amount of coins to a user
	 * @experimental
	 * @param id Insert an user id
	 * @param coins Insert an amount of coins
	 * @returns The new user
	 * @example
	 * const SunRod = require('sunrod-api');
	 * const client = new SunRod('your-token');
	 * await client.add('604790617138266149', 100); // Adds 100 coins
	 */
	async add(id: string, coins: number): Promise<User | { error: string }> {
		checkType([
			{ name: 'id', type: 'string', value: id },
			{ name: 'coins', type: 'number', value: coins },
		]);
		const res = await endpoint.post(`user/${id}`, { coins, protocol: 'ADD' }, this.token);
		if (res.status !== 200 && !this.bypass) throw checkError(res.status);
		if (res.data.error) return { error: res.data.error };
		return new User(id, res.data.coins);
	}

	/**
	 * Removes a specific amount of coins from a user
	 * @experimental
	 * @param id The user ID
	 * @param coins Insert an amount of coins
	 * @returns The new user
	 * @example
	 * const SunRod = require('sunrod-api');
	 * const client = new SunRod('your-token');
	 * await client.remove('604790617138266149', 100); // Removes 100 coins
	 */
	async remove(id: string, coins: number): Promise<User | { error: string }> {
		checkType([
			{ name: 'id', type: 'string', value: id },
			{ name: 'coins', type: 'number', value: coins },
		]);
		const res = await endpoint.post(`user/${id}`, { coins, protocol: 'SUB' }, this.token);
		if (res.status !== 200 && !this.bypass) throw checkError(res.status);
		if (res.data.error) return { error: res.data.error };
		return new User(id, res.data.coins);
	}

	/**
	 * Transfers coins from one user to another
	 * @param firstId Insert an user id
	 * @param secondId Insert an user id
	 * @param coins Insert an amount of coins
	 * @returns The two new users
	 * @example
	 * const SunRod = require('sunrod-api');
	 * const client = new SunRod('your-token');
	 * await client.transfer('604790617138266149', '604790617138266149', 100); // Transfers 100 coins from first to second user
	 */
	async transfer(firstId: string, secondId: string, coins: number): Promise<User[] | { error: string }> {
		checkType([
			{ name: 'firstId', type: 'string', value: firstId },
			{ name: 'secondId', type: 'string', value: secondId },
			{ name: 'coins', type: 'number', value: coins },
		]);
		const res1 = await endpoint.get(`user/${firstId}`, this.token);
		if (res1.status !== 200 && !this.bypass) throw checkError(res1.status);
		if (res1.data.error) return { error: res1.data.error };
		if (res1.data.coins < coins) return { error: 'Insufficient coins' };
		const res2 = await endpoint.post(`user/${firstId}`, { coins, protocol: 'SUB' }, this.token);
		if (res2.status !== 200 && !this.bypass) throw checkError(res2.status);
		if (res2.data.error) return { error: res2.data.error };
		const res3 = await endpoint.post(`user/${secondId}`, { coins, protocol: 'ADD' }, this.token);
		if (res3.status !== 200 && !this.bypass) throw checkError(res3.status);
		if (res3.data.error) return { error: res3.data.error };
		return [
			new User(firstId, res2.data.coins),
			new User(secondId, res3.data.coins),
		];
	}
}
export { User };
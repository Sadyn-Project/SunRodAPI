import axios from 'axios';

const endpoint = {
	hostname: 'sunrod.it',
	get: async (dir: string, token: string): Promise<any> => {
		try {
			const res = await axios.get(`https://${endpoint.hostname}/api/v1/${dir}`, { headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			} });
			if (res.data === 'Internal Server Error') throw new Error('SunRod had an Internal Error. Check availability on https://status.sadyn.it');
			else if (res.data === 'Unauthorized') throw new Error('You tried to use the SunRod API, but the token is invalid.');
			else return res;
		} catch (err) {
			throw new Error('SunRod is currently unreachable. Check availability on https://status.sadyn.it');
		}
	},
	post: async (dir: string, body: any, token: string): Promise<any> => {
		try {
			const res = await axios.post(`https://${endpoint.hostname}/api/v1/${dir}`, body, { headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			} });
			if (res.data === 'Internal Server Error') throw new Error('SunRod had an Internal Error. Check availability on https://status.sadyn.it');
			else if (res.data === 'Unauthorized') throw new Error('You tried to use the SunRod API, but the token is invalid.');
			else return res;
		} catch (err) {
			throw new Error('SunRod is currently unreachable. Check availability on https://status.sadyn.it');
		}
	},
	delete: async (dir: string, token: string): Promise<any> => {
		try {
			const res = await axios.delete(`https://${endpoint.hostname}/api/v1/${dir}`, { headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			} });
			if (res.data === 'Internal Server Error') throw new Error('SunRod had an Internal Error. Check availability on https://status.sadyn.it');
			else if (res.data === 'Unauthorized') throw new Error('You tried to use the SunRod API, but the token is invalid.');
			else return res;
		} catch (err) {
			throw new Error('SunRod is currently unreachable. Check availability on https://status.sadyn.it');
		}
	}
}

export default endpoint;
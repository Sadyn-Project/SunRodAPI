import axios from 'axios';

const endpoint = {
	hostname: 'sunrod.it',
	get: async (dir: string, token: string): Promise<any> => {
		const res = await axios.get(`https://${endpoint.hostname}/api/v1/${dir}`, { headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		} });
		if (res.data === 'Internal Server Error') throw new Error('SunRod had an Internal Error. Check availability on https://status.sadyn.it');
		else return res;
	},
	post: async (dir: string, body: any, token: string): Promise<any> => {
		const res = await axios.post(`https://${endpoint.hostname}/api/v1/${dir}`, body, { headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		} });
		if (res.data === 'Internal Server Error') throw new Error('SunRod had an Internal Error. Check availability on https://status.sadyn.it');
		else return res;
	},
	delete: async (dir: string, token: string): Promise<any> => {
		const res = await axios.delete(`https://${endpoint.hostname}/api/v1/${dir}`, { headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		} });
		if (res.data === 'Internal Server Error') throw new Error('SunRod had an Internal Error. Check availability on https://status.sadyn.it');
		else return res;
	}
}

export default endpoint;
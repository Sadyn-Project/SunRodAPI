const checkError = (status: number): any => {
	switch (status) {
		case 401: return new TypeError('Your SunRod token is invalid.');
		case 400: return new TypeError('Input is invalid.');
	}
};

export default checkError;
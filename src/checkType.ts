const checkType = (input: { name: string, type: string, value: any }[]) => {
	for (const element of input) {
		if (typeof element.value !== element.type) {
			throw new TypeError(`"${element.name}" property was expected to be ${element.type == 'object' ? 'an' : 'a'} ${element.type}, \
			but received ${typeof element.value == 'object' ? 'an' : 'a'} ${typeof element.value}. Follow documentation for more details.`);
		}
	}
};

export default checkType;
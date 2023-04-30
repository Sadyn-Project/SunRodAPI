class User {
	readonly id: string;
	readonly coins: number;

	constructor(id: string, coins: number) {
		this.id = id;
		this.coins = coins;
	}
}

export default User;
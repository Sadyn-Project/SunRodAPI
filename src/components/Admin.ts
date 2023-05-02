class Admin {
	readonly id: string;
	readonly name: string;
    readonly token: string;
    readonly permissions: number;

	constructor(id: string, name: string, token: string, permissions: number) {
        this.id = id;
        this.name = name;
        this.token = token;
        this.permissions = permissions;
	}
}

export default Admin;
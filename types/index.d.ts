declare class SunRodAPI {
    token: string;
    /**
     * @constructor
     * @param token Must be inserted to log in
    */
    constructor(token: string);
    /**
     * @param input Must be an object
     * @param input.user Insert an user id
     * @example '604790617138266149'
     * @param input.bypass Decide to bypass error crashing or not
    */
    get(input: {
        user: string;
        bypass?: boolean;
    }): Promise<{
        data: any;
        result: any;
    }>;
    /**
     * @param input Must be an object
     * @param input.user Insert an user id
     * @example '604790617138266149'
     * @param input.coins Insert an amount of coins
     * @param input.bypass Decide to bypass error crashing or not
    */
    has(input: {
        user: string;
        coins: number;
        bypass?: boolean;
    }): Promise<{
        data: boolean;
        result: any;
    }>;
    /**
     * @param input Must be an object
     * @param input.user Insert an user id
     * @example '604790617138266149'
     * @param input.coins Insert an amount of coins
     * @param input.bypass Decide to bypass error crashing or not
    */
    set(input: {
        user: string;
        coins: number;
        bypass?: boolean;
    }): Promise<{
        data: {
            user: string;
            coins: number;
        };
        result: any;
    }>;
    /**
     * @param input Must be an object
     * @param input.user Insert an user id
     * @example '604790617138266149'
     * @param input.coins Insert an amount of coins
     * @param input.bypass Decide to bypass error crashing or not
    */
    add(input: {
        user: string;
        coins: number;
        bypass?: boolean;
    }): Promise<{
        data: {
            user: string;
            coins: any;
        };
        result: any;
    }>;
    /**
     * @param input Must be an object
     * @param input.user Insert an user id
     * @example '604790617138266149'
     * @param input.coins Insert an amount of coins
     * @param input.bypass Decide to bypass error crashing or not
    */
    remove(input: {
        user: string;
        coins: number;
        bypass?: boolean;
    }): Promise<{
        data: {
            user: string;
            coins: any;
        };
        result: any;
    }>;
    /**
     * @param input Must be an object
     * @param input.user1 Insert an user id
     * @example '604790617138266149'
     * @param input.user2 Insert an user id
     * @example '604790617138266149'
     * @param input.coins Insert an amount of coins
     * @param input.bypass Decide to bypass error crashing or not
    */
    transfer(input: {
        user1: string;
        user2: string;
        coins: number;
        bypass?: boolean;
    }): Promise<{
        data: {
            user: string;
            coins: any;
        }[];
        result: any;
    }>;
}
export = SunRodAPI;

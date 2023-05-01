[![Logo](https://sunrod.it/playground_assets/sunrod.svg)](https://sunrod.it)
# SunRod API

**Join our Discord server to receive announcements about new updates, and receive support at anytime you need!**  

SunRod is a project started by **Sadyn Development**, and our aim is to create an API available to Discord Bot developers that allows to use a global economy system as you wish.  

This will not be as simple as the other economy systems, because to gain coins users will need to seriously work, and not only running a command.  

In fact we want to replace paid subscriptions or premium features with our economy. *For example users can buy a premium command for a week just with 50 or 80 coins.*  

Prices and features will be your decision, you can choose what to do with this system but you will need to ask for an authorization from us. *This is because we will then discuss together about prices and rewards.*

# Installation

**Install the package with NPM:**  

```console
npm install sunrod-api@latest
```

**Install the package with YARN:**  

```console
yarn add sunrod-api@latest
```

> *Installing the `latest` version is more reccommended, as `dev` versions may not work as you wish.*  

# Token

> A token is required for **SunRod** to work, and you can receive one just by [joining](#participate-to-sunrod) the SunRod Project.  

**SunRod Tokens** are used to login to the API. They are 30-characters long passwords, and each bot [participating to SunRod](#participate-to-sunrod) has its own token.  

Tokens are useful for us to monitor how bots use the API, and to identify who is authorized to use it and who is not.  

**ATTENTION:** We do **NOT** receive any private information about you and your bot from this API and we do **NOT** share how you interact with the API.  
Also, a SunRod token **is different** from your discord bot token and should not be shared with us or anybody else.  

Look up our [Security Section](#security) for more info.

# Documentation

Welcome to our documentation! Here you can learn how the constructor and the methods work.

> If you need any help or explanation, ask for support in our [Discord Server](https://discord.gg/PBrPeuACnU/)!

## Constructor

To log into the API you must insert your token:  

```js
const SunRod = require('sunrod-api'); // Requires the library

const client = new SunRod(token); // Logs into the API
```

**The `token` parameter must be your [SunRod Token](#token).**  

If you want to bypass every possible error that could generate over time, use this:  

```js
const client = new SunRod(token, { bypass: true });
```

**IMPORTANT: If the token is not authorized to SunRod, you'll get an error.**  

> For ease, in your discord bot you would probably set `SunRod` inside the `client` variable:  
```js
client.sunrod = new SunRod(token);
```

## Classes

### SunRod

```js
const SunRod = require('sunrod-api');
```

This contains complete access to the API. More info on [Methods](#methods).

### User

```js
const { User } = require('sunrod-api');
```

This class contains all necessary info about a user.

```js
const myUser = new User('604790617138266149', 100) // id, coins

console.log(myUser.id); // '604790617138266149'
console.log(myUser.coins); // 100
```

## Methods

These are the methods inside the SunRod class:  

- [SunRod#*get*](#sunrodget)  
- [SunRod#*has*](#sunrodhas)  
- [SunRod#*set*](#sunrodset)  
- [SunRod#*add*](#sunrodadd)  
- [SunRod#*remove*](#sunrodremove)  
- [SunRod#*transfer*](#sunrodtransfer)  

Whenever an error should appear, it will be returned as { error: 'your error' } .  
This makes it easier to prevent your bot from crashing.  

### SunRod#*get*

The `get` method returns the amount of coins the user has.  

> Parameters:  
> `id: string`  

```js
const user = await client.get(id);

console.log(user.coins); // The amount of coins
```

All methods return a [User](#user), and inside the `data` property there will be the result you need (in this case the user coins amount).  

> `result` is another property available in the returned object, which gives you the status code of that method. 0 usually means "success", but if the result code is different it means that an error has occurred and a TypeError will appear.  

### SunRod#*has*

The `has` method returns a boolean: if the user has the minimum amount of coins, its true.  

> Parameters:  
> `id: string`  
> `coins: number`  

```js
const hasCoins = await client.has(id, coins);

console.log(hasCoins); // true or false
```

### SunRod#*set*

The `set` method sets to the user a specific amount of coins, and returns the user data.  

> Parameters:  
> `id: string`  
> `coins: number`  

```js
const user = await client.set(id, coins); // The user amount of coins gets modified

console.log(user.coins); // The new amount of coins
```

Inside the `data` property you can find user data, with how many coins does he have in total and his id.  

### SunRod#*add*

The `add` method adds a specific amount of coins to a user and returns user data.  

> Parameters:  
> `id: string`  
> `coins: number`  

```js
await client.add({ user: 'id', coins: 0 }); // Add the amount of coins to the user


```

Structure is similar to the `set` method, although this sums to the current user balance and adds the given amount.  

### SunRod#*remove*

The `remove` method removes a specific amount of coins to a user and returns user data.  

> Parameters:  
> `id: string`  
> `coins: number`  

```js
await client.remove({ user: 'id', coins: 0 }); // Should return { data: { user: string, coins: number }, result: 0 };
```

This method has the same structure as the `set` and the `add` method, but this subtracts coins from the user.  

**ATTENTION:** The user may not have enough coins in some situations, and { error: 'Insufficient coins' } could be returned instead.

### SunRod#*transfer*

The `transfer` method transfers an amount of coins from a user to another and returns an array of 2 Users.  

> Parameters:  
> `firstId: string`  
> `secondId: string`  
> `coins: number`  

```js
const users = await client.transfer(firstId, secondId, coins); // Transfers coins from first to second user

console.log(users[0].coins); // The first user new amount of coins
console.log(users[1].coins); // The second user new amount of coins
```

## Status Codes  

> Each status code means something, and is given in the object returned from any method, as the `result` variable.  

| Code | Meaning |
| :-----: | ----- |
| `0` | The method was successful. |
| `1` | The token you are trying to use is not valid. |
| `2` |  An invalid method was given. *This usually returns when somebody changes the API or creates one by his own.* |
| `3` | An invalid input was given. *It may be a wrong user id, or you passed a string in the coins variable instead of an integer.* |
| `4` | Given user has not enough coins. *It may appear when you try to remove or transfer coins from a user, but he doesn't have enough.* |
| `5` | An invalid amount of users was given. *Usually returned by `SunRodAPI#top()`.* |
| `6` | Given amount of users was higher than fetched users. *Usually returned by `SunRodAPI#top()`.* |
| `7` | The function you're trying to use is temporarily not available. *Usually because of important bugs to fix.* |

When the returned status code is not 0, your application (usually your bot) would crash ans give a TypeError on your console.  
To avoid this add `bypass: true` as a property inside the object you insert as the method parameter, and inside the returned object you will find a `result` property which will be the status code that relates to the problem.  

# Security

We grant security and privacy with our API, it does not require any private information like your bot token or personal data.  

We suggest to never download and use any alternative API to SunRod, as somebody may be trying to hack you or take your personal information. Just install our official APIs to interact with SunRod. *If you find an API you prefer to use, ask us if it is safe so that we will examinate it and check if there can be any problem.*  

We use tokens as a login system but also to track your interactions with the API for security reason. The reason of this is that if somebody manages to have access to your token and tries to ruin our database, we can notice it and change or disable your token immediately. *In case something like this happens, we will alert you.*  

# Participate to __SunRod__!

Ask to participate to **SunRod Project** in our Discord Server: [Join us!](https://discord.gg/PBrPeuACnU/)  

> Else just dm to **GabrieleAGenius#0001** on discord.  
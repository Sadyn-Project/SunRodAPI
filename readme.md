[![Logo](https://sunrod.it/playground_assets/sunrod.svg)](https://sunrod.it)  

# <div align="center">SunRod v2.0.0</div>  

Find out about SunRod on our [website](https://sunrod.it/about) or our [Discord server](https://discord.gg/PBrPeuACnU).  

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

These are multiple classes you should know about.

### SunRod

```js
const SunRod = require('sunrod-api');
```

This contains complete access to the API. More info on [Methods](#methods).

### User  

This class contains all necessary info about a user.

```js
const user = client.get('604790617138266149'); // Returns the User class

console.log(user.id); // '604790617138266149' (the id of the user)
console.log(user.coins); // 100 (the amount of coins)
```

> You can find it in these methods:  
> [SunRod#get](#sunrodget), [SunRod#set](#sunrodset), [SunRod#add](#sunrodadd), [SunRod#remove](#sunrodremove), [SunRod#transfer](#sunrodtransfer).  

### Admin

```js
const admin = client.profile(); // Returns the Admin class

console.log(admin.id); // Your admin id
console.log(admin.name); // Your name as an admin
console.log(admin.token); // Your token
console.log(admin.permissions); // Your permission level
```

> You can find it in these methods:  
> [SunRod#profile](#sunrodprofile).  

## Methods  

These are the methods inside the SunRod class:  

- [SunRod#*profile*](#sunrodprofile)
- [SunRod#*get*](#sunrodget)  
- [SunRod#*has*](#sunrodhas)  
- [SunRod#*set*](#sunrodset)  
- [SunRod#*add*](#sunrodadd)  
- [SunRod#*remove*](#sunrodremove)  
- [SunRod#*transfer*](#sunrodtransfer)  

Whenever an error should appear, it will be returned as { error: 'your error' } .  
This makes it easier to prevent your bot from crashing.  

### SunRod#*profile*

The `profile` method returns your Admin Profile.  

> No Parameters required.  

```js
const profile = await client.profile(); // The Admin class is returned

console.log(profile.permissions) // Your permission level
```

This method returns an [Admin](#admin).  

### SunRod#*get*  

The `get` method returns the amount of coins the user has.  

> Parameters:  
> `id: string`  

```js
const user = await client.get(id); // The User class is returned

console.log(user.coins); // The amount of coins
```

Most methods return a [User](#user).  

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
await client.remove({ user: 'id', coins: 0 }); // Remove the amount of coins from the user
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

## Errors  

Sometimes you may get `{ error: 'your error' }` instead of the actual response.  

That doesn't mean that there's anything wrong with your code, but it's possible.  

> **NOTICE:** These are SunRod errors, while actual errors get thrown and you can prevented using the `bypass` parameter.  

| Error | Meaning |
| :----- | :----- |
| `Insufficient coins` | This could come out using [SunRod#remove](#sunrodremove) or [SunRod#transfer](#sunrodtransfer), and means that the user you're taking coins from has not enough. |

*It's just one, but in the future they could become more.*  

### Other Errors  

There could also be other errors, that would eventually stop your bot from running without an error handler.  

There's not a list, but

When the returned status code is not 0, your application (usually your bot) would crash ans give a TypeError on your console.  
To avoid this add `bypass: true` as a property inside the object you insert as the method parameter, and inside the returned object you will find a `result` property which will be the status code that relates to the problem.  

# Security  

Read about this to learn more about how we protect your data.  

- SunRod does NOT retreive any personal or professional information from your code or hosting device.  
- SunRod does NOT share the information you share with us, with anyone else. (es. token, activity, etc.)  
- This is the official SunRod Package, as you find on our [website](https://sunrod.it/packages). Do NOT use 3rd-party packages.  

# Participate to __SunRod__!  

Ask to participate to **SunRod Project** in our Discord Server: [Join us!](https://discord.gg/PBrPeuACnU/)  

> Else just dm to **GabrieleAGenius#0001** on discord.  
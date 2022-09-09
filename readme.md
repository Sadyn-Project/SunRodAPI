# SunRod API

**Join our Discord server to receive announcements about new updates, and receive support at anytime you need!**  

[![Discord](https://i.ibb.co/nstT7dj/ff41b628a47ef3141164bfedb04fb220.png)](https://discord.gg/PBrPeuACnU/)

SunRod is a project started by **Sadyn Development**, and our aim is to create an API available to Discord Bot developers that allows to use a global economy system as you wish.  

This will not be as simple as the other economy systems, because to gain coins users will need to seriously work, and not only running a command.  

In fact we want to replace paid subscriptions or premium features with our economy. *For example users can buy a premium command for a week just with 50 or 80 coins.*  

Prices and features will be your decision, you can choose what to do with this system but you will need to ask for an authorization from us. *This is because we will then discuss together about prices and rewards.*

# Installation

**Install the package with NPM:**  

```console
npm install sunrod-api@stable
```

**Install the package with YARN:**  

```console
yarn add sunrod-api@stable
```

> *Installing the `stable` version is more reccommended, as new versions may not work as you wish.*  

# Token

> A token is required for the **SunRod API** to work, and you can receive one just by [joining](#participate-to-sunrod) the SunRod Project.  

**SunRod Tokens** are used to login to the API. They are 50-characters long strings, and every bot which [participates to SunRod](#participate-to-sunrod) has its own token.  

Tokens are useful for us to follow how you interact with the API and to keep the system secure from people who may want to ruin our project.  

**ATTENTION:** We do **not** receive any private information about you and your bot from this API and we do **not** share how you interact with the API.  
Also, SunRod token **is different** from your discord bot token and should not be shared with us or anybody else.  

Look up our [Security Section](#security) for more info.

# Documentation

Welcome to our documentation! Here you can learn how the constructor and the methods work.

> If you need any help or explanation, ask for support in our [Discord Server](https://discord.gg/PBrPeuACnU/)!

## Constructor

To log into the API you must insert your token:  

```js
var SunRodBuilder =  require('sunrod-api'); // Requires the library

var SunRodAPI =  new  SunRodBuilder(token); // Logs into the API
```

**The `token` parameter must be your [SunRod Token](#token).**  

> For ease, in your discord bot you will probably set `SunRodAPI` inside the `client` variable:  
```js
client.sunrod  =  new  SunRodBuilder(token);
```

## Methods

> Every method parameter is expected to be an object, with inside of it the required values.
>
> You can also add `bypass: true` as a property inside the object to do not get any TypeError if an action would not execute. Otherwise, your bot would crash and your command would stop executing.
>
> *You can have more information in the [Status Codes](#status-codes) category.*  

### Index

- [SunRodAPI#*get*](#sunrodapiget)
- [SunRodAPI#*has*](#sunrodapihas)
- [SunRodAPI#*set*](#sunrodapiset)
- [SunRodAPI#*add*](#sunrodapiadd)
- [SunRodAPI#*remove*](#sunrodapiremove)
- [SunRodAPI#*transfer*](#sunrodapitransfer)
<!-- - [SunRodAPI#*top*](#sunrodapitop) -->

### SunRodAPI#*get*

The `get` method returns the amount of coins the user has.  

> Input:  
> `user: string`  

```js
await SunRodAPI.get({ user: id }); // Should return { data: number, result: 0 }
```

All methods return an object, and inside the `data` property there will be the result you need (in this case the user coins amount).  

> `result` is another property available in the returned object, which gives you the status code of that method. 0 usually means "success", but if the result code is different it means that an error has occurred and a TypeError will appear.  

### SunRodAPI#*has*

The `has` method returns a boolean: true if the user amount of coins is higher of the one you give, false if it is lower.  

> Input:  
> `user: string`  
> `coins: number`  

```js
await SunRodAPI.has({ user: 'id', coins: 0 }); // Should return { data: boolean, result: 0 }
```

Inside the `data` property you will find the returned boolean.  

### SunRodAPI#*set*

The `set` method sets to the user a specific amount of coins, and returns the user data.  

> Input:  
> `user: string`  
> `coins: number`  

```js
await SunRodAPI.set({ user: 'id', coins: 0 }); // Should return { data: { user: string, coins: number }, result: 0 }
```

Inside the `data` property you can find user data, with how many coins does he have in total and his id.  

### SunRodAPI#*add*

The `add` method adds a specific amount of coins to a user and returns user data.  

> Input:  
> `user: string`  
> `coins: number`  

```js
await SunRodAPI.add({ user: 'id', coins: 0 }); // Should return { data: { user: string, coins: number }, result: 0 };
```

Structure is similar to the `set` method, although this sums to the current user balance and adds the given amount.  

### SunRodAPI#*remove*

The `remove` method removes a specific amount of coins to a user and returns user data.  

> Input:  
> `user: string`  
> `coins: number`  

```js
await SunRodAPI.remove({ user: 'id', coins: 0 }); // Should return { data: { user: string, coins: number }, result: 0 };
```

This method has the same structure as the `set` and the `add` method, but this subtracts coins from the user.  

**ATTENTION:** The user may not have enough coins in some situations, and an error would appear. View [Status Codes](#status-codes) for more information.  

### SunRodAPI#*transfer*

The `transfer` method transfers an amount of coins from a user to another and returns users data.  

> Input:  
> `user1: string`  
> `user2: string`  
> `coins: number`  

```js
await SunRodAPI.transfer({ user1: 'id', user2: 'id', coins: 0 }); // Should return { data: [ { user: string, coins: number }, { user: string, coins: number } ], result: 0 }
```

Inside the `data` property you can find an array containing bot users data.  

**ATTENTION:** The user may not have enough coins in some situations, and an error would appear. View [Status Codes](#status-codes) for more information.  

### SunRodAPI#*top*

The `top` method returns a leaderboard of the users who have the higher amount of coins.  

> Input:  
> `amount: number`  

```js
await SunRodAPI.top({ amount: 0 }); // Should return { data: { user: string, coins: number }[], result: 0 }
```

Inside the `data` property you can find an array containing the users with most coins fethed in the database.  

**ATTENTION:** The amount of users may be higher than the fetched users in our database, and an error would appear. View [Status Codes](#status-codes) for more information.  

### SunRodAPI#*bottom*

The `bottom` method returns a leaderboard of the users with the lower amount of coins.  

> Input:  
> `amount: number`  

```js
await SunRodAPI.top({ amount: 0 }); // Should return { data: { user: string, coins: number }[], result: 0 }
```

Inside the `data` property you can find an array containing the users with most coins fethed in the database.  

**ATTENTION:** The amount of users may be higher than the fetched users in our database, and an error would appear. View [Status Codes](#status-codes) for more information.  

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
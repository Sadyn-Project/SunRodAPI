# SunRod API

__Join our discord server to have more information about updates, receive support at anytime and explore other of our projects!__

[![Discord](https://i.ibb.co/nstT7dj/ff41b628a47ef3141164bfedb04fb220.png)](https://discord.gg/PBrPeuACnU/)

> SunRod is a project based on a global discord-based credits system.  
> This can be seen as an economy system, that can be used from one or more discord bots (who obviously ask for access) that can be used to buy premium features of a bot, or used to pay other users for services.  
> The special feature of it is that the system will be global and credits will be shared from one bot to one other.

# Installation {#installation}

**Install the package with NPM:**

```console
npm install sunrod-api@latest
```

> *Always pay attention to new updates, as some functions may get deprecated and it may not work anymore for older versions.*  

# Token {#token}

> A token is required for **SunRod API** to work, and you can have it just by [joining](#participate) the SunRod Project  

**SunRod Tokens** are used to login to the sistem. They are 50-characters long strings, and every bot which [participates to SunRod](#participate) .  

# Documentation {#documentation}

> Documentation is still being prepared, and the API is not ready yet. Wait some days/weeks  (or follow our announcements on [Discord](https://discord.gg/PBrPeuACnU/)) for the stable version to come out.  

## Constructor {#construtctor}

To login with SunRod API you must before create a session:  

```js
var SunRodBuilder =  require('sunrod-api'); // Require the library

var SunRodAPI =  new  SunRodBuilder(token); // Start a session
```

> For ease, in your discord bot you will probably set `SunRodAPI` inside the `client` variable:  
> ```js
> client.sunrod  =  new  SunRodBuilder(token);
> ```
> **The `token` variable inside the parameters. If you're [partecipating](#participate) to the project, you will be given a unique [token](#token).**  

## Methods {#methods}

> Every method parameter is an object, and its content will be the required variables for that specific method. You can also add `bypass: true` to do not get any TypeError if an action would not execute. Instead, you would receive a status code which would be relevant to a specific error.  
> *[Status codes](#status-codes) are right after the Methods category in this documentation.*

### SunRodAPI#*get*

The `get` method is used to receive how many coins does a user have.  

> Input:  
> `user: string`    

```js
await SunRodAPI.get({ user: id }); // Should return { data: number, result: 0 }
```

This method (as all the other methods) should return an object, and inside the `data` variable of it there will be how many coins does the user have.  

> An additional variable is shown `result`, which gives you the status code of that action. 0 usually means "success", but if the result code is different an error has occurred and it should throw a TypeError.  

### SunRodAPI#*has*

The `has` method is used to receive a boolean, which tells you if the user has the coins you decide (or more), else it will return false.  
> Input:  
> `user: string`  
> `coins: number`  

```js
await SunRodAPI.has({ user: 'id', coins: 0 }); // Should return { data: boolean, result: 0 }
```

The boolean inside `data` will be true if the user coins will be equal or higher than the input, else it will return false.  

### SunRodAPI#*set*

The `set` method is used to set the coins of a user to a specific amount, not lower than 0.  

> Input:  
> `user: string`  
> `coins: number`  

```js
await SunRodAPI.set({ user: 'id', coins: 0 }); // Should return { data: { user: string, coins: number }, result: 0 }
```

The method should return in the `data` variable user's data. *It should be the same data given in the input.*  

### SunRodAPI#*add*

The `add` method can be used to add a specific amount of coins to a user.  

> Input:  
> `user: string`  
> `coins: number`  

```js
await SunRodAPI.add({ user: 'id', coins: 0 }); // Should return { data: { user: string, coins: number }, result: 0 };
```

It is really similar to the `set` method as it gives the same output and asks for the same input, but its functionality is different.  

### SunRodAPI#*remove*

The `remove` method will remove a specific amount of coins to a user.  

> Input:  
> `user: string`  
> `coins: number`  

```js
await SunRodAPI.remove({ user: 'id', coins: 0 }); // Should return { data: { user: string, coins: number }, result: 0 };
```

This method is structured as the same as other 2 methods: `set` and `add`. That's because its function is similar, but instead of adding or setting coins, it subtracts them. In fact, in the `data` variable you will find user's data.  

### SunRodAPI#*transfer*

The `transfer` method can be used to move some coins from a user to another.  

> Input:  
> `user1: string`  
> `user2: string`  
> `coins: number`  

```js
await SunRodAPI.transfer({ user1: 'id', user2: 'id', coins: 0 }); // Should return { data: [ { user: string, coins: number }, { user: string, coins: number } ], result: 0 }
```

This method returns in `data` both of the users in an array (user1 and user2), with how many coins they have.  

## Status Codes {#status-codes}

> Each status code means something, and is given in the object returned from any method, as the `result` variable.

| Code | Meaning |
| :-----: | ----- |
| `0` | The method was succesful. |
| `1` | The given token is invalid. |
| `2` |  An invalid method was given. *This usually returns when somebody changes the API or creates one by his own.* |
| `3` | An invalid input was given. *It may be a wrong user id, or you passed a string in the coins variable instead of an integer.* |
| `4` | Given user has not enough coins. *It may appear when you try to remove or transfer coins from a user, but he doesn't have enough.* |

# Participate to __SunRod__! {#participate}

Participate just by asking in our official Discord Server: [Join us!](https://discord.gg/PBrPeuACnU/)

> Else just ask in DMs to **GabrieleAGenius#0001**
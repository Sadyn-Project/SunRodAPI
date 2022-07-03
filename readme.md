# SunRod API

> SunRod is a project based on a global discord-based credits system.

> This can be seen as an economy system, that can be used from one or more discord bots (who obviously ask for access) that can be used to buy premium features of a bot, or used to pay other users for services.

> The special feature of it is that the system will be global and credits will be shared from one bot to one other.


## Installation

**Install the package with NPM:**

```console
npm install sunrod-api@latest
```

## Documentation

> *Documentation is still being prepared, and the API is not fully functinal yet. Wait some days or weeks (or follow our announcements on [Discord](https://discord.gg/PBrPeuACnU/)) to let the stable version to come out.*

### Constructor

To log in to SunRod API you must before create a session:

```js
var SunRodBuilder = require('sunrod-api'); // Require the library

var SunRodAPI = new SunRodBuilder(token); // Start a session
```

> Calling the variables this way is optional, and if you are going to use them in your discord bot you will probably set `SunRodAPI` inside the `client` variable:
>
> ```js
> client.sunrod = new SunRodBuilder(token);
> ```
>
> **Also, the `token` variable in the constructor parameters must be your session token. If you're partecipating to the progect, you will be given a unique token to you.

### Methods

*Methods are not ready yet, probably the next version will have a more specific documentation about them.*


## Participate to SunRod!

> Participate just by asking in our official Discord Server: [Join us!](https://discord.gg/PBrPeuACnU/)

> *Else just ask in DMs to __GabrieleAGenius#0001__*
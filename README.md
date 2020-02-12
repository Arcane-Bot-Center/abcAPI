---
__abcAPI__

- __The official module for the arcane-botcenter.xyz's API__

---

##### Example:
    Discord.js 11 and 12
```js
const abcAPI = require('abcapi');

const { Client } = require('discord.js'),
    client = new Client();

client.login('Bot TOKEN');

client.on('ready',() => {
    abcAPI.login("API Token", client.user.id); // => require to use this module, log in to abcAPI
    abcAPI.update(client); // => updates every 10 minutes
    abcAPI.post(client); // => made simple post to this abcAPI
});
```

Eris Sharder

```js
//On your ready event 

const abcAPI = require('../../modules/abcAPI/src/index');
        abcAPI.login('token', this.bot.user.id);
        abcAPI.post(this.bot);
```

___


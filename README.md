---
__abcAPI__

- __The official module for the arcane-botcenter.xyz's API__

---

##### Example:
    
```js
const abcAPI = require('abcAPI');

const { Client } = require('discord.js'),
    client = new Client();

client.login('Bot TOKEN');

client.on('ready',() => {
     abcAPI.login('API Key', client.user.id);
     abcAPI.post(client.guilds.size, client.users.size, "Number of shards");
});
```

___


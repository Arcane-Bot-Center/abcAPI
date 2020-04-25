---
__abcAPI__

- __The official module for the arcane-center.xyz's API__

---
#### Feature

##### getInfo(id)
Get bot information from arcane-center.xyz api 

Return
```json5
{
  status: '...',
  content: {
    verified: '...',
    certified: '...',
    owner: '...',
    co_owner: '...',
    addedAt: '...',
    premium: '...',
    votes: '...',
    bot: {
      botid: '...',
      name: '...'
    },
    infos: {....}
}
```

##### update()

Post bot stats (guilds number, shards number) to arcane-center.xyz api 

```js
arcane.update()
```

Return: emitted event **post**

#### Events

##### Ready
Emitted when the is ready 

````js
arcane.on("ready",() =>{
        console.log('ABC API ready');
});

````

##### Post
Emitted when the post is finished and returns the information about your bot (Your guild number, Your shard number) that was posted on the api.
```js
arcane.on('post',(data)=>{
        console.log(data)
        // return { server_count: Your guild number, shard_count:  Your shard number }
    });
```

##### Error
Emitted when error was appear

```js
arcane.on('error',(error)=>{
           console.log(error)
           //return the error
       });
```

##### RateLimited
Emitted when you have been rate limited

```Js
arcane.on('rateLimited',(response)=>{
        console.log(response)
        //return You have been ratelimited please contact the support
});
```
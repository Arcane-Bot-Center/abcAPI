const { EventEmitter } = require("events");
const https = require("https")

class Client extends EventEmitter
{
    constructor(id, token, options)
    {
        super();
        this._bot = { _id: id, _token: token, _serverCount: (options.server_count ? options.server_count : null), _shardCount: (options.shard_count ? options.shard_count : null), _memberCount: (options.member_count ? options.member_count : null) };
        this._interval = null;
        this._timer = ((options.interval && options.interval >= 60000) ? options.interval : 60000);
        this._isRunning = false;
        this._logger = Boolean(options.logger);
        this._logs = [];
        setTimeout(() => { this._start(); }, 1000);
    }

    _start()
    {
        if (!this._isRunning)
        {
            this.emit("ready");
            this._postStats();
            this._isRunning = true;
            this._interval = setInterval(() => { this._postStats(); }, this._timer);
        }
        else
        {
            if (this._logger)
                console.log("[\x1b[31mError\x1b[0m]] The Client is already started please use Client#update() to update your stats.");
            this.emit("error", { status: null, data: null, error: "The Client is already started please use Client#update() to update your stats.", timestamp: Date.now() });
        }
    }

    update(serverCount, shardCount, memberCount)
    {
        this._bot._serverCount = (serverCount ? serverCount : null);
        this._bot._shardCount = (shardCount ? shardCount : null);
        this._bot._memberCount = (memberCount ? memberCount : null);
        this.emit("update");
    }

    _postStats()
    {
        const data = JSON.stringify({ server_count: this._bot._serverCount, shard_count: this._bot._shardCount, member_count: this._bot._memberCount });
        const options = { hostname: "arcane-center.xyz", port: 443, path: "/api/" + this._bot._id + "/stats", method: "POST", headers: { 'Authorization': this._bot._token, "Content-Type": "application/json", "Content-Length": data.length } };

        let log = { status: null, data: data, error: null, timestamp: null };

        const req = https.request(options, (res) => {
            log.status = res.statusCode;
            if (res.statusCode !== 200)
                log.error = "An error with status " + res.statusCode + " has occurred.";
            res.on("data", (d) => { log.data += d; });
            res.on("end", () =>
            {
                log.timestamp = Date.now();
                this._logs.push(log);

                if (this._logger && !log.error)
                {
                    console.log("[\x1b[32mSuccess\x1b[0m] Stats posted to \x1b[36mhttps://arcane-center.xyz/api/" + this._bot._id + "/stats\x1b[0m !");
                    this.emit("post");
                }
                else if (this._logger && log.error)
                {
                    console.log("[\x1b[31mError\x1b[0m] An error has occurred while updating stats on \x1b[36mhttps://arcane-center.xyz/api/" + this._bot._id + "/stats\x1b[0m !");
                    this.emit("error", log);
                }
                else if (log.error)
                    this.emit("error", log);
                else
                    this.emit("post");
            });
        });
        req.write(data);
        req.on("error", (error) => { log.error = error; });
        req.end();
    }
}

module.exports = Client;

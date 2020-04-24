const { EventEmitter } = require("events");

class ABCapi extends EventEmitter {
    constructor(id,token,data) {
        super();
        this._id = id;
        this._token = token;
        this._data = data;
        this.run = false;
        this._cooldown = 60000;
        thi._baseURL = ''
    }
    _ready() {
        if(!this.run){
            this.emit('ready');
            this.run = true;
        }

    }
    update(){
        console.log(this.run)
    }



}

module.exports = ABCapi;
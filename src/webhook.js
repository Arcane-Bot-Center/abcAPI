const { EventEmitter } = require('events');
const express = require('express');
const bodyParser = require('body-parser');
const app = express().use(bodyParser.json());


class Webhook extends EventEmitter{
    constructor(port, password){
        super();
        this.port = port;
        this.password = password;
        this.path = '/acanewebhooks'
    }
    _startServer(){
        this.server = app.get('/', (req,res) =>{
            if (req.query.token !== token) {
                return res.sendStatus(401);
            }
            return res.end(req.query.challenge);
        })
    }
}

module.exports = Webhook;
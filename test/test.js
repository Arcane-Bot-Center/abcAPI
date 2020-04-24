
const test2 = require('../src/index')

const slt = new test2('test','test')

slt.on("ready",() =>{
    console.log('pret')
    console.log(slt.update())
})


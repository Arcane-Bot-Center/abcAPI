module.exports.request = (data,token,id) =>{
    const axios = require('axios');
    let baseURL = 'https://arcane-center.xyz/api/';
    let content = JSON.stringify(data,null);
    return new Promise(async (resolve, reject) => {
        await axios.post(baseURL + id + '/stats', content, {
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': content.length,
                'Authorization': token
            }
        }).then((res) => {
            res.data = data;
            resolve(res)
        }).catch((err) => {
            reject(err)
        });
    })
}
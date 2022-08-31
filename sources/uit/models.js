const request = require('request-promise')
require('dotenv').config();

async function LayTKB() {
    var options = {
        url: 'https://apiservice.uit.edu.vn/v2/data?task=all&v=1',
        headers: {
            authorization: process.env.UIT_AUTHORIZATION
        },
        json: true
    };
    let result = await request(options);
    return result;
};
//}, 60000*10)

exports.LayTKB = LayTKB;



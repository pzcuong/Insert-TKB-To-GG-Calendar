async function LogIn(username, password) {
    var options = {
      url: "https://app.mysms.com/json/user/login",
      json: {
        "msisdn":username,
        "password":password,"apiKey":"pcervE-HEopWcVhQiXaNZQ"
      },
      method: "POST"
    }
    return request(options);
  }
  
  function SendMessage(token, message) {
    var options = {
      url: 'https://app.mysms.com/json/remote/sms/send',
      json:{
        "recipients":["+84387152838"],
        "message":message,
        "dateSendOn":null,
        "encoding":0,
        "smsConnectorId":0,
        "store":true,
        "authToken":token,"apiKey":"pcervE-HEopWcVhQiXaNZQ"},
      method: 'POST'
    }
    request(options).then(function (body) {
      console.log(body);
    })
  }
  
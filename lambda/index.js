var request = require('request');
var AWS = require('aws-sdk');


AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://dynamodb.us-east-1.amazonaws.com',
  accessKeyId: `${process.env.accessKeyId}`,
  secretAccessKey: `${process.env.secretAccessKey}`
});

exports.handler = (event, context, callback) => {
  var url = `https://www.omdbapi.com/?t=${event.queryStringParameters.title}&plot=short&apikey=trilogy`
  request(url, (err,apiResponse,body)=>{
    if(err){
      throw err
    }
 
    const lambdaResponse = {
      statusCode: 200,
      body: body,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials" : true, // 
    "content-type": "application/json"
      }
    };
    callback(null,lambdaResponse)
  });
};



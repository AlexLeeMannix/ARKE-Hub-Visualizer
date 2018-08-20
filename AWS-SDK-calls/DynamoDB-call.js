const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html
const AWS = require('aws-sdk');
AWS.config.update({ accessKeyId: 'AKIAIKM4UHFNSPJ7FNDQ', secretAccessKey: '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', region: 'us-east-2' });

const ddb = new AWS.DynamoDB();

ddb.listTables({}, function(err, data) {
  console.log('SOMETHING IS HAPPENING HERE')
  if (err) console.log(err, err.stack);
  // an error occurred
  else {
    console.log('This is the DynamoDB object: ', ddb);
    var tableName = data.TableNames[0];
    var params = {
      TableName: tableName
    };
    console.log('This is the table name: ', tableName);
    ddb.describeTable(params, function(err, data) {
      if (err) console.log(err, err.stack);
      // an error occurred
      else {
        // console.log(data); // successful response
        console.log('This is the schema: ', data.Table.AttributeDefinitions);
        console.log(
          'This is the schema attributes: ',
          data.Table.AttributeDefinitions[0].AttributeName
        );
        console.log('This is the keySchema: ', data.Table.KeySchema);
        var attribute = data.Table.AttributeDefinitions[0].AttributeName;
      }
    });
    var params = {
      Key: {
        email: {
          S: 'Chris@gmail.com' // req.body.emailSearch
        }
      },
      TableName: tableName
    };
    ddb.getItem(params, function(err, data) {
      if (err) console.log(err, err.stack);
      // an error occurred
      else console.log(data); // successful response
    });
  }
});


console.log('new ddb :', ddb)
module.exports = ddb

import { createClient, commandOptions } from 'redis';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import http from 'http';
// eslint-disable-next-line @typescript-eslint/no-var-requires

import express from 'express';
const app = express();
//the web module is only able to show last or first message from the subscribed redis queue. 
//this can be chaned by a template engine or api with flutter.

app.listen(4000, () => {
  console.log('server running');
});
// eslint-disable-next-line @typescript-eslint/no-var-requires
//eslint-disable-next-line @typescript-eslint/no-var-requires
const client = createClient();

await client.connect();
//client.on('message', (channel, message) => {
//console.log('Received data :' + message);
//})
//client.subscribe('jarless-1');

let currentId = '0-0'; // Start at lowest possible stream ID

while (true) {
  try {
    let response = await client.xRead(
      commandOptions({
        isolated: true,
      }),
      [
        // XREAD can read from multiple streams, starting at a
        // different ID for each...
        {
          key: 'ANPR', //jarless-1 same topic or publisher stream name refer
          id: currentId
        }
      ], {
        // Read 1 entry at a time, block for 5 seconds if there are none.
        COUNT: 1,
        BLOCK: 5000
      }
    );
    // console.log(JSON.stringify(response));
    if (response) {
      // Response is an array of streams, each containing an array of
      // entries:
      // [
      //   {
      //     "name": "mystream",
      //     "messages": [
      //       {
      //         "id": "1642088708425-0",
      //         "message": {
      //           "num": "999"
      //         }
      //       }
      //     ]
      //   }
      // ]
      console.log(JSON.stringify(response));

      // Get the ID of the first (only) entry returned.
     
      currentId = response[0].messages[0].id;
      // console.log(currentId);
      app.get('/', (req, res) => {
        // This will send the JSON data to the client.
        console.log('Response : ' + JSON.stringify(response));
        res.send(JSON.stringify(response));
      });
      //http
      //.createServer(function (req, res) {
      //res.writeHead(200, { 'Content-Type': 'text/json' });
      //res.json(response);
      //res.end();
      //});

      //console.log(currentId);
    } else {
      // Response is null, we have read everything that is
      // in the stream right now...
      //console.log('No new stream entries.');
    }
  } catch (err) {
    console.error(err);
  }
}

//http.listen(8081, 'localhost', function () {
 // console.log('Server is Listening at Port 3000!');
//});



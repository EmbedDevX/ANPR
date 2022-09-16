import { createClient, commandOptions } from 'redis';
// eslint-disable-next-line @typescript-eslint/no-var-requires
//const express = require('express');

const client = createClient();

await client.connect();

let currentId = '0-0'; // Start at lowest possible stream ID

while (true) {
  try {
    let response = await client.xRead(
      commandOptions({
        isolated: true
      }), [
        // XREAD can read from multiple streams, starting at a
        // different ID for each...
        {
          key: 'jarless-1', //jarless-1 new for python old mystream
          id: currentId
        }
      ], {
        // Read 1 entry at a time, block for 5 seconds if there are none.
        COUNT: 1,
        BLOCK: 5000
      }
    );
    console.log(response);
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
      //console.log(JSON.stringify(response));

      // Get the ID of the first (only) entry returned.
      currentId = response[0].messages[0].id;
      console.log(currentId);
    } else {
      // Response is null, we have read everything that is
      // in the stream right now...
      console.log('No new stream entries.');
    }
  } catch (err) {
    console.error(err);
  }
}

app.set('view engine', 'pug');
app.set('views', 'views'); //let express know where to find the views

//here add the data from the redis queue 
const users = {
  name: 'test',
  age: '25',
};

app.use("/", (req, res, next) => {
  res.render('users', { users: users, title: 'Users' }); // we don't need to use the extension express knows that we use pug templating engine
  //add the data after reading from stream
});
app.listen(3000, () => {
  console.log(`server is up and running`);
});
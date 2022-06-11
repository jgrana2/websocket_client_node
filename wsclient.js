const util = require('util');
var client = new (require('websocket').client)();
client.on('connectFailed', (err) => console.log('**connectFailed: ', util.inspect(err)));
client.on('connect', function (conn) {
   console.log('Connected');
   conn.on('error', (error) => console.log('**onError: ', util.inspect(err)));
   conn.on('close', () => console.log('**onClose'));
   conn.on('message', (msg) => {
      var buf = msg.binaryData;
      var channel1 = [];

      // Convert from 24 bit buffer to 32 bit signed integer
      for (let index = 0; index < buf.length / 3; index++) {
         channel1[index] = (buf[index * 3] << 24 | buf[index * 3 + 1] << 16 | buf[index * 3 + 2] << 8) >> 8;
      }
      console.log(channel1);
   });
});

client.connect('ws://192.168.20.24:8888');

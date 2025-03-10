
const {kafka} = require('./client');

async function init(){
    const admin= kafka.admin();
    console.log('Connecting....');
    admin.connect();
    console.log('Connected');
    console.log('Creating Topic rider updates');
    await admin.createTopics({
        topics: [{
            topic: 'rider-updates',
            numPartitions: 2
        }]
    });
    console.log('Created Topic rider updates');

    console.log('Disconnecting....');
    await admin.disconnect();
    console.log('Disconnected');

}

init();
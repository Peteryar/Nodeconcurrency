const { promisify } = require('util');
const fs = require('fs');

//async await method of concurrently
let txtSample= Array(25).fill("").map((m, idx) => String(idx) + "fills");

const timer = promisify(setTimeout);
const database = [];

function addToDatabase(items){
    database.push(...items)
    return timer(5000, {code:200, des:'successfully added to database'})
}

async function uploadItems(items){
    let pendingPromises = []
    let fiveItems = [];
    for(let i=0; i<items.length; i++){
        fiveItems.push(items[i]);
        if(fiveItems.length === 5){
            pendingPromises.push(addToDatabase(fiveItems));
            fiveItems = []
        }
    }
   const result = await Promise.all(pendingPromises);
  return result
}


async function sendItems(items){
  let result = await  uploadItems(items);
  console.log('result', result);
  console.log('db', database)
}
 
sendItems(txtSample)



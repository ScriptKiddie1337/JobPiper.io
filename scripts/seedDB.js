let exec = require('child_process').exec
const waitFor = (ms) => new Promise(r => setTimeout(r, ms))



const start = async () => {
  asyncForEach(['cities','countries','states'], async (a) => {
    await exec(dropCollection(a), (err, stdout, stderr) => {
      // check for errors or if it was succesfuly
    })
    setTimeout(async () => {
      await exec(seedCollection(a), (err, stdout, stderr) => {
        // check for errors or if it was succesfuly
      })
    }, 1000);
  })
}

start();

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

function dropCollection(x) {
  console.log(`mongo joblisting_db --eval 'db.${x}.drop()'`)
  return `mongo joblisting_db --eval 'db.${x}.drop()'`
} 
function seedCollection(y) {
  console.log(`db.${y} imported and seeded`)
  return `mongoimport --db joblisting_db --collection ${y} --type json --file ./scripts/${y}.json --jsonArray`
} 
// 👇️ if using ES6 Imports uncomment line below
// import {readFileSync, promises as fsPromises} from 'fs';
const {readFileSync, promises: fsPromises} = require('fs');

// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

//   console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']

  return arr;
}

const inventory = syncReadFile('./d1.1_calories_input.txt');


function findMaxCalories(inventory) {
    let currentSum = 0;
    let maxSum = 0;
    for(let item of inventory) {
        if (item !== '') {
            currentSum += parseInt(item);
        } else if (item ==='') {
            // console.log(`in return elsif, current sum is ${currentSum}`);
            if (currentSum >= maxSum) {
                maxSum = currentSum;
                
                // console.log(`Current Sum is greater than current max. Current Max Sum is: ${maxSum}`)

            }
            currentSum = 0;
        } else {
            // console.log("FindMaxCalories final else. Hopefully this worked");
            if (CurrentSum >= maxSum) {
                maxSum = currentSum;
            }
        }
    }
    return maxSum;
}

// findMaxCalories(inventory);
console.log(findMaxCalories(inventory));
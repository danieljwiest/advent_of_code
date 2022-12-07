const fs = require("fs");
const readline = require("readline");

async function ruckErrorCounter() {
    const errorQtys = [];
    errorQtyInitter(errorQtys);


    const rl = readline.createInterface({
        input: fs.createReadStream("./d3.1_input_test.txt", {encoding: 'utf-8'}),
        crlfDelay: Infinity,
    });

    rl.once("line", (line) => {
        const inventory = mapInventory(line);
        console.log(inventory);
        const currentError = ruckSackErrorFinder(inventory);
        console.log(currentError);
        // const currentErrorPriority = errorPrioritizer(currentError);
        // logInventoryError(currentErrorPriority);
        // console.log(currentErrorPriority);
        // console.log(errorQtys);

    });

    // rl.once("end", (errorQtys) => {
    //     console.log(sumErrorPriorities(errorQtys));
    // });

    await new Promise((res) => {
        rl.once("close", res)
    });


    console.log(sumErrorPriorities(errorQtys));

    //function to initialize the errorQty array with 56 items and initial errorQty's of '0'
    function errorQtyInitter(array) {
        for (let i = 0; i < 52; i++) {
            array[i] = 0;
        }
    }

    //map inventory to an object. Items are logged as properities. Items in first half of string are incremented. Items in second half of string are decremented. As a result, the only item that is included in both halves will have a value of '0' at the end. 
    function mapInventory(string) {
        
        const obj = {};
        for (let i = 0; i < string.length; i++) {
            if (i < string.length/2) {
                if (obj[string[i]]) {
                    obj[string[i]]++;
                } else {
                    obj[string[i]] = 1;
                }
            } else if (i >= string.length/2) {
                if (obj[string[i]]) {
                    obj[string[i]]--;
                } else {
                    //initiziaze with a negative number to avoid false positives when second half has two identical items
                    obj[string[i]] = -1;
                }
            }
        }   
        return obj;
    }

    //search inventory Map for the duplicate item and return the item name. Item with QTY = 0 is the duplicated item.
    function ruckSackErrorFinder(obj) {
        for (const property in obj) {
            if(obj[property] === 0) {
                return property;
            }
        }
    }

    //Assign priority to an Error. Utilizes parseInt to convert letter based errors to a number.
    function errorPrioritizer (string) {
        const regexLower = /[a-z]/;
        const regexUpper = /[A-Z]/;
        
        if(string.match(regexLower)) {
            return parseInt(string,36) - 9;
        } else if (string.match(regexUpper)) {
            return parseInt(string,36);
        }
    }

    //increase QTY of specified error by 1
    function logInventoryError(errorPriority) {
        //log error. ErroryPriority adjusted by -1 to convert to zero base for array
        errorQtys[errorPriority-1]++;
    }

    function sumErrorPriorities(array) {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i]*(i+1);
        }
        return sum;
    }


}
ruckErrorCounter();
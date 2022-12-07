const fs = require("fs");
const readline = require("readline");

async function elfBadgeFinder() {
    const itemQtys = [];
    //variable to track the elfs within a group. Used to creat a loop within the rl.on function
    let elfNumber = 1;
    let elfOneInventory ={};
    let elfTwoInventory ={};
    let elfThreeInventory = {};

    itemQtyInitter(itemQtys);


    const rl = readline.createInterface({
        input: fs.createReadStream("./d3.1_input.txt", {encoding: 'utf-8'}),
        crlfDelay: Infinity,
    });

    rl.on("line", (line) => {
        const inventory = mapInventory(line);
        let currentBadge = '';
        let currentPriority;
        
        switch (elfNumber) {
            case 1:
                elfOneInventory = inventory;
                elfNumber++;
                break;
            case 2:
                elfTwoInventory = inventory;
                elfNumber++;
                break;
            case 3:
                elfThreeInventory = inventory;
                elfNumber = 1;
                currentBadge = badgeFinder(elfOneInventory, elfTwoInventory, elfThreeInventory);
                currentPriority = itemPrioritizer(currentBadge);
                logItem(currentPriority);
                // console.log(currentBadge);
                break;
        }
    });


    await new Promise((res) => {
        rl.once("close", res)
    });

    //Calculate function result and log to console.
    console.log(sumItemPriorities(itemQtys));

    //function to initialize the errorQty array with 56 items and initial errorQty's of '0'
    function itemQtyInitter(array) {
        for (let i = 0; i < 52; i++) {
            array[i] = 0;
        }
    }

    //add comment here
    function mapInventory(string) {
        
        const obj = {};
        for (let i = 0; i < string.length; i++) {
            if (obj[string[i]]) {
                obj[string[i]]++;
            } else {
                obj[string[i]] = 1;
            }
        }
        return obj;
    }   


    //Assign priority to an Error. Utilizes parseInt to convert letter based errors to a number.
    function itemPrioritizer (string) {
        const regexLower = /[a-z]/;
        const regexUpper = /[A-Z]/;
        
        if(string.match(regexLower)) {
            return parseInt(string,36) - 9;
        } else if (string.match(regexUpper)) {
            return parseInt(string,36) - 9 + 26;
        }
    }

    function badgeFinder(obj1, obj2, obj3) {
        for (let item in obj1) {
            if (obj2.hasOwnProperty(item) && obj3.hasOwnProperty(item)) {
                return item;
            }
        }
    }

    //increase QTY of specified error by 1
    function logItem(errorPriority) {
        //log error. ErroryPriority adjusted by -1 to convert to zero base for array
        itemQtys[errorPriority-1]++;
    }

    function sumItemPriorities(array) {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i]*(i+1);
        }
        return sum;
    }


}
elfBadgeFinder();
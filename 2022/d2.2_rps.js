
const fs = require("fs");
const readline = require("readline");

async function rpsScoreEstimator() {

  let estimatedScore = 0;
  
  const rl = readline.createInterface({
    input: fs.createReadStream("./d2.1_rps_input.txt", {encoding: 'utf-8'}),
    crlfDelay: Infinity,
  });



  rl.on("line", (line) => {

    switch (line){
        //Handle Ties
        case 'A Y':
            estimatedScore += 4;
            break;
        case 'B Y':
            estimatedScore += 5;
            break;
        case 'C Y':
            estimatedScore += 6;
            break;
        //Handle Wins
        case 'A Z':    
        estimatedScore += 8;
            break;
        case 'B Z':
            estimatedScore += 9;
            break;
        case 'C Z':
            estimatedScore += 7;
            break;
        //Handle Loses
        case 'A X':
            estimatedScore += 3;
            break;
        case 'B X':
            estimatedScore += 1;
            break;
        case 'C X':
            estimatedScore += 2;
            break;
    }
   
  });
  await new Promise((res) => rl.once("close", res));
    console.log(estimatedScore);

}
rpsScoreEstimator();
// npm install request
// to make a request to any server
let request = require("request");
let fs= require("fs");
let path = require("path");
let leaderboard =[];
let cheerio = require("cheerio");
console.log("request send");
let count=0;
function eachMatchHandler(url){
    count++;
    request(url, dataReciever);
}
function dataReciever(err,res,html) {
    if(err==null && res.statusCode==200){
       //console.log(html);
       count--;
       parsehtml(html);
       if(count==0){
           console.log(leaderboard.sort(compare_runs));
           console.table(leaderboard);
       }
    } 
     else if (res.statusCode == 404){
        console.log("Page Not found");
    }
    else{
        console.log(err);
    }
}

function compare_runs( a, b){
    if(a.runs>b.runs){
        return 1;
    }
    else if( b.runs>a.runs){
        return -1;
    }
    else{
        return 0;
    }
}


function parsehtml(html){
    let $= cheerio.load(html);
    let wts = $(".summary span").text();
    let wTeam= wts.split("won").shift().trim();
    console.log(wTeam);
    let bothinnings= $(".card.content-block.match-scorecard-table .Collapsible");
    console.log(bothinnings.length);

    for( let inn=0;inn<bothinnings.length;inn++){
        
        let teamName = $(bothinnings[inn]).find("h5").text();
         teamName =teamName.split("Innings")[0].trim();
         if( teamName == wTeam){
            let rows= $(bothinnings[inn]).find("table.table.batsman tbody tr");
      for(let i=0; i < rows.length;i++){
        let colsInEveryRow =$(rows[i]).find("td");
        let isPlayer = $(colsInEveryRow[0]).hasClass("batsman-cell");
        if( isPlayer == true){
            let pName= $(colsInEveryRow[0]).text().trim();
            let runs= $(colsInEveryRow[2]).text();
           // let balls= $(colsInEveryRow[3]).text();
           // console.log( "${pName}  of ${teamName} scored $(runs)" );
            addtoleaderB(pName,teamName,runs);
        }
        console.log("'''''''''''''''''''''''''");
      }
      console.log("...............");
    }
}


}

function addtoleaderB(pName,teamName,runs){
    runs= Number(runs);
    for( let i=0;i<leaderboard.length;i++){
        let entry = leaderboard[i];
        if( entry.name== pName && entry.team==teamName){
            entry.runs +=runs;
            return;
        }
    }
    let newEntry ={};
    newEntry.name=pName;
    newEntry.team =teamName;
    newEntry.runs=runs;
    leaderboard.push(newEntry);
}
    

module.exports = eachMatchHandler;
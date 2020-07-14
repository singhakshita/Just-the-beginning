let pp = require("puppeteer");
let fs =require("fs");
let request = require("request");
let cheerio = require("cheerio");

let FlightPricesPages;
async function fn(){
    let browser = await pp.launch({
      headless : false,
       slowMo:100,
      defaultViewport : null,
      args :["--start-fullscreen","--disable-notifications"]
    });
try{
 let TabCT =   await browser.newPage();
await TabCT.goto("https://www.cleartrip.com/flights", {"waitUntil":["load", "networkidle0"]});
//from
await TabCT.evaluate(function(val){ document.querySelector('#FromTag').value = val}, "Pat");
await TabCT.keyboard.press('Enter');
//to
//await TabCT.type("#ToTag","Del");
await TabCT.evaluate(function(val){ document.querySelector('#ToTag').value = val}, "Del");
await TabCT.keyboard.press('Enter');
//date
await TabCT.type("#DepartDate","Sun, 7 Jul, 2020");
await TabCT.keyboard.press('Enter');
//serch
await TabCT.waitForSelector("#SearchBtn");
await TabCT.focus("#SearchBtn");
await Promise.all([TabCT.keyboard.press('Enter'),TabCT.waitForNavigation({ waitUntil : "networkidle0"}) ]);
FlightPricesPages = await TabCT.url();
console.log(FlightPricesPages);

 request('FlightPricesPages' , dataReciever);
function dataReciever( err ,res ,html){
  if( err == null && res.statusCode ==200){
    parsefile(html);
  }
  else{
    console.log("page not found");
  }
}
function parsefile(html){
  let $ =cheerio.load(html);
  console.log($);
  
}


//  let TabYatra =  await browser.newPage();
//  await TabYatra.goto("https://www.yatra.com/flights" ,{"waitUntil":["load","networkidle0"]});
//  TabYatra.on('dialog' , async dialog => {
//   await dialog.dismiss();
// });
//  await TabYatra.waitForSelector("#BE_flight_origin_city");
//  //await TabYatra.evaluate(function(val){ document.querySelector('#BE_flight_origin_city').value = val}, "Pat");
//  await TabYatra.type("#BE_flight_origin_city","Pat");
//  await TabYatra.keyboard.press('Enter');
//  await TabYatra.waitForSelector("#BE_flight_arrival_city");
// // await TabYatra.evaluate(function(val){ document.querySelector('#BE_flight_arrival_city').value = val}, "Del");
//  await TabYatra.type("#BE_flight_arrival_city" , "Del"); 
//  await TabYatra.keyboard.press('Enter');
//  await TabYatra.waitForSelector("#BE_flight_origin_date");
//  await TabYatra.click("#BE_flight_flsearch_btn");
  }catch(err){
    console.log(err);
  }
}
fn();



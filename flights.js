let pp = require("puppeteer");


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
await TabCT.type("#ToTag","Del");
await TabCT.evaluate(function(val){ document.querySelector('#ToTag').value = val}, "Del");
await TabCT.keyboard.press('Enter');
//date
await TabCT.type("#DepartDate","Sun, 7 Jul, 2020");
await TabCT.keyboard.press('Enter');
//serch
await TabCT.waitForSelector("#SearchBtn");
await TabCT.focus("#SearchBtn");
await TabCT.keyboard.press('Enter');

  

 

let TabYatra =  await browser.newPage();
 await TabYatra.goto("https://www.yatra.com/flights" ,{"waitUntil":["load","networkidle0"]});
 await TabYatra.waitForSelector("#BE_flight_origin_city");
 await TabYatra.evaluate(function(val){ document.querySelector('#BE_flight_origin_city').value = val}, "Pat");
 await TabYatra.keyboard.press('Enter');
 await TabYatra.waitForSelector("#BE_flight_arrival_city");
 await TabYatra.evaluate(function(val){ document.querySelector('#BE_flight_arrival_city').value = val}, "Del");
 await TabYatra.keyboard.press('Enter');
 await TabYatra.waitForSelector("#BE_flight_origin_date");
 await TabYatra.click("#BE_flight_flsearch_btn");
//  await TabYatra.type("#BE_flight_origin_date","7 Jul'20");
//  await TabYatra.keyboard.press('Enter');
//  await TabYatra.keyboard.press('Enter');


}catch(err){
    console.log(err);
}

}
fn();
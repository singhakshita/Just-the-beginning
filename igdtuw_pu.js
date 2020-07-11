let pp = require("puppeteer");
const { table } = require("console");
const { promises } = require("fs");

async function fn(){
    let browser =await pp.launch({
        headless :false,
        defaultViewport: null,
        args:["--start-maximized"];
    });
}
let AllTabs = await browser.pages();
let Tab =AllTabs[0];

await Tab.goto("https://www.igdtuw.ac.in/");
await promises.all([
    Tab.waitForNavigation({ waitUntil : "networkidle0" }),
    Tab.click(""),
]);


let TabMMT =  await browser.newPage();
 await TabMMT.goto("https://www.makemytrip.com/flights/");
 let point = await TabMMT.$(".fsw_inputBox.searchCity.inactiveWidget");
 let linkPos = await TabMMT.evaluate((link) => {
  const {top, left} = link.getBoundingClientRect();
  return {top, left};
}, point);
await TabMMT.mouse.click(linkPos.left, linkPos.top, { button: 'left' })
await TabMMT.mouse.click(linkPos.left, linkPos.top, { button: 'left' })
await TabMMT.mouse.click(linkPos.left, linkPos.top, { button: 'left' })
 await TabMMT.keyboard.press('Enter');
 await TabMMT.waitForSelector(".react-autosuggest__input.react-autosuggest__input--open");
 await TabMMT.type(".react-autosuggest__input.react-autosuggest__input--open","Pat");
 await TabMMT.keyboard.press('Enter');
// await TabMMT.type("react-autosuggest__input react-autosuggest__input--open")


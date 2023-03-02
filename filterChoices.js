// ==UserScript==
// @name         INFO 2604 - Filter Time Slots
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://myelearning.sta.uwi.edu/mod/choice/view.php?id=1093067
// @icon         https://icons.duckduckgo.com/ip2/uwi.edu.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let choicesObj = [];
    console.log("Will filter choices in 3 secs ...");

    setTimeout(function() {
        let numFull = 0;
        choicesObj = document.querySelector("ul.choices").childNodes;
        choicesObj.forEach((item) => {
            if (item.textContent.includes("(Full)")){
                // console.log(`Hiding '${item.textContent}'`);
                item.style.display = "none";
                numFull++;
            }
        });
        console.log(`Modified ${numFull} objects`)
    }, 3000);
})();
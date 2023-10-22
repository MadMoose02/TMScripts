// ==UserScript==
// @name         Microsoft-AutoLogin
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automatically log-in with School Account when logging on to myeLearning
// @author       MadMoose02
// @match        https://login.microsoftonline.com/*
// @icon         https://icons.duckduckgo.com/ip2/uwi.edu.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let myEmail = "keshan.moosai@my.uwi.edu"; // Enter my.uwi.edu email here

    // Check if need to navigate the Microsoft user login page
    function handleMicrosoft() {
        let userAccounts = Array.from(document.querySelectorAll(".tile-container"));
        for (let one in userAccounts) {
            let currUserObj = userAccounts[one].children[0].children[0]
            let displayName = String(currUserObj.outerText).substring(2).trim();
            if (displayName !== myEmail) {
                console.log(`No match found for ${myEmail}!`);
                return;
            }

            // Click on the tile that contains 'myEmail' in it
            currUserObj.click();
            console.log("Fired a click on school email element");

            // After timeout, click the sign-in button by id and click it
            for (let i = 0; i < 2; i++) {
                setTimeout(function() {
                    let signinBtn = document.getElementById("idSIButton9");
                    signinBtn.click();
                    console.log(`Fired a click on "${signinBtn.outerText}"`);
                }, 500)
            }
            
            // Reload webpage. Fail safe in the event prompted to remember login
            location.reload();
        }
    }

    setTimeout(handleMicrosoft, 2000);

})();
// ==UserScript==
// @name         Torn-AutoLogin
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.torn.com/
// @icon         https://www.torn.com/images/v2/torn_logo/regular/desktop/logo@1x.webp
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    // Look for the buttin with class 'login' in it
    function login() {
        let x = document.querySelectorAll('button');
        for (let curr in x) {
            let y = (x[curr].attributes ? x[curr].attributes[0].textContent : "");
            if (String(y).includes('login')) {
                console.log('Detected login button on page!');

                // Click the button after locating it and sign in to the website
                x[curr].click();
                x = document.querySelector("input[name='btnLogin']")
                console.log('Logging-in to Torn ... ');
                x.click();
            }
        }
    }

    // Function calls here
    login();
})();
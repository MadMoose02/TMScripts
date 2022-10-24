// ==UserScript==
// @name         MyEL-AutoLogin
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automatically log-in to myeLearning when session expires
// @author       MadMoose02
// @match        https://myelearning.sta.uwi.edu/login/*
// @icon         https://icons.duckduckgo.com/ip2/uwi.edu.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log("Executing myELAuto.js to auto sign-in to myeLearning");
    setTimeout(document.querySelector("a.btn[title='Student Login']").click(), 500);
})();
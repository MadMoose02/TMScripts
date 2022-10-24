// ==UserScript==
// @name         Burn The Attendance
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Burns all the damn annyoing stupid ridiculous attendance notices on myeLearning!
// @author       MadMoose02
// @match        https://myelearning.sta.uwi.edu/*
// @icon         https://icons.duckduckgo.com/ip2/uwi.edu.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let calendarObjects = [];
    let attendanceIconURL = `https://myelearning.sta.uwi.edu/theme/image.php/boost/attendance/`

    async function getResults() {
        console.log("Fetching all calendar objects that contain events");
        calendarObjects = Array.from(document.querySelectorAll(`td.hasevent`));
        console.log("Done");
    }

    async function burnTheShits() {
        for (let one in calendarObjects) {
            let currDay = calendarObjects[one];
            let numEvents = String(currDay.outerText).split(",")[0].trim();
            let currDayTitle = String(currDay.outerText).split("\n")[0].substring(numEvents.length + 2);

            // This is probably the one with the attendance bullshit
            let numOccurences = String(currDay.outerHTML).split(attendanceIconURL).length - 1;

            // If matches equivalent to number of event for that day, BURN IT
            if (Number(numEvents.split(" ")[0]) == Number(numOccurences)) {
                let origVal = String(currDay.attributes[0].nodeValue);
                currDay.attributes[0].nodeValue = origVal.split("calendar_event_course").join(" ");
                console.log(`BURNT -> ${currDayTitle}`);
            }
        }
    }

    setTimeout(getResults, 2499);
    setTimeout(burnTheShits, 2600);

})();
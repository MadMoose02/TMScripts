// ==UserScript==
// @name         Burn The Attendance
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Burns all the damn annyoing stupid ridiculous attendance notices on myeLearning!
// @author       MadMoose02
// @match        https://myelearning.sta.uwi.edu/*
// @icon         https://icons.duckduckgo.com/ip2/uwi.edu.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let calendarObjects = [];
    let listItemObjects = [];
    let attendanceIconURL = `https://myelearning.sta.uwi.edu/theme/image.php/boost/attendance/`
    let findString = "td.day";
    let rmClass = "calendar_event_course"; // Class to remove from the calendar objects

    function getResults() {
        console.log("Fetching all calendar objects that contain events");
        try { 
            calendarObjects = Array.from(document.querySelectorAll(findString)); 
            return true
        } catch (e) { 
            console.log("Could not fetch calendar objects. Error details below.\n", e);
            return false
        }
    }

    function burnTheShits() {
        let numSidePanel = 0, numCalendarView = 0;
        if (!getResults()) {
            console.error("COULD NOT BURN THE SHITS (attendance)");
            return;
        };
        for (let one in calendarObjects) {
            let currDayObj = calendarObjects[one];
            let numEvents = String(currDayObj.outerText).split(",")[0].trim();
            let currDayObjTitle = String(currDayObj.outerText).split("\n")[0].substring(numEvents.length + 2);

            // Count the number of occurence of the 'Attendance' event (denoted by the icon URL above)
            let numOccurences = String(currDayObj.outerHTML).split(attendanceIconURL).length - 1;

            // If occurences match the number of events for that day, remove class from its calendar object
            if (Number(numEvents.split(" ")[0]) == Number(numOccurences)) {
                let origVal = String(currDayObj.attributes[0].nodeValue);

                // Re-assign class values without 'rmClass' value
                currDayObj.attributes[0].nodeValue = origVal.split(rmClass).join(" ");
                // console.log(`BURNT -> ${currDayObjTitle}`);
                numSidePanel++;
            }
        }
        console.log(`Burnt ${numSidePanel} in side-panel`);
        
        // In calendar view, remove all the attendance data regions
        if (document.URL.includes("calendar")) {
            listItemObjects = document.querySelectorAll("li");
            listItemObjects.forEach((listItem) => {
                if (listItem.outerText.includes("Attendance")) {
                    listItem.style.display = "none";
                    numCalendarView++;
                } 
            })
            let title = document.querySelector("h2.current").outerText;
            console.log(`Burnt ${numCalendarView} in calendar-view for ${title}`);
        }
        console.log(`TOTAL BURNT => ${numCalendarView + numSidePanel}`)
    }

    // Handle pagination controls
    function paginationHandler() {
        let paginationObjects = document.querySelectorAll("a.arrow_link");
        if (paginationObjects.length < 1) return;
        paginationObjects.forEach((navButton) => {
            navButton.addEventListener("click", function() {
                setTimeout(function() {
                    console.log("Navigation detected. BURN THE SHITS AGAIN");
                    burnTheShits();
                    paginationHandler();
                }, 2499);
            });
        });
    }

    document.addEventListener("click", function(e) {
        console.log("There was an attempt!");
        let itemClicked = e.target;
        let classes = itemClicked.className.split(' ');
        for (let one in classes) {
            if (classes[one] == "arrow") {
                setTimeout(burnTheShits(), 2500);
                return;
            }
        }
    });

    // On enter page match
    setTimeout(function() {
        burnTheShits();
        paginationHandler();
    }, 2499);


})();
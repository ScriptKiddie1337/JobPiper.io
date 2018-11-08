/* global gapi */

import { firebase, auth } from '../firebase'
import moment from "moment";

// Init google calendar to get the ID the calendar containing our events
// This ID is used to display an iframe of their google calendar with only our events
// If the user does not already have our calendar, we will make one for them
export const initGoogleCalendar = () => {

    return new Promise((resolve, reject) => {

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://apis.google.com/js/api.js';
        // Once the Google API Client is loaded, you can run your code
        script.onload = function (e) {
            // Initialize the Google API Client with the config object
            // Syntax below informs eslint that gapi was defined by the script loaded
            function initClient() {
                gapi.client.init({
                    apiKey: firebase.config.apiKey,
                    clientId: firebase.config.clientId,
                    discoveryDocs: firebase.config.discoveryDocs,
                    scope: firebase.config.scopes.join(' ')
                })
                    // Loading is finished, so start the app
                    .then(function () {
                        // Make sure the Google API Client is properly signed in
                        if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
                            auth.refreshToken()
                                .then(function (token) {
                                    return gapi.client.calendar.calendarList.list({ maxResults: 250 })
                                })
                                .then(function (response) {
                                    const ourCalendar = response.result.items.find(item => item.summary === "Job Piper")

                                    if (ourCalendar === undefined) {
                                        return gapi.client.calendar.calendars.insert({
                                            summary: "Job Piper"
                                        })
                                            .then(function (response) {

                                                resolve(response.result.id)
                                            })
                                    } else {
                                        resolve(ourCalendar.id)
                                    }
                                })
                        } else {
                            auth.signOut(); // Something went wrong, sign out
                            return reject("Signed out user, as google api client returned not signed in")
                        }
                    })
            }
            gapi.load('client:auth2', initClient)
        }
        // Add to the document
        document.getElementsByTagName('head')[0].appendChild(script);
    })
}

// Adds an event to the user's job calendar
// Will check that the user's job calendar still exists, and create one if needed
export const createCalendarEvent = (calendarId, title, description, startTime, endTime) => {

    const createCalendarEvent = () => {

        var event = {
            'summary': title,
            'description': description,
            'start': {
                'dateTime': moment(startTime).toISOString(),
                'timeZone': 'America/Los_Angeles'
            },
            'end': {
                'dateTime': moment(endTime).toISOString(),
                'timeZone': 'America/Los_Angeles'
            },
        }

        return gapi.client.calendar.events.insert({
            'calendarId': calendarId,
            'resource': event
        })
    }

    return new Promise((resolve, reject) => {
        // Make sure the Google API Client is properly signed in
        if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
            auth.refreshToken()
                .then(function (token) {
                    return createCalendarEvent()
                })
                .then(res => resolve(res))
        } else {
            auth.signOut(); // Something went wrong, sign out
            reject("Signed out user, as google api client returned not signed in")
        }
    })
}

// Retrieves the user's calendar events for the specified calendar
// within the specified timeframe.
export const getCalendarEvents = (calendarId, startDate, endDate) => {

    const getCalendarEvents = () => {

        var event = {
            'calendarId': calendarId,
            'timeMin': moment(startDate).toISOString(),
            'timeMax': moment(endDate).toISOString()
        }

        return gapi.client.calendar.events.list(event)
    }

    return new Promise((resolve, reject) => {
        // Make sure the Google API Client is properly signed in
        if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
            auth.refreshToken()
                .then(function (token) {
                    return getCalendarEvents()
                })
                .then(function (response) {
                    resolve(response)
                })
        } else {
            auth.signOut(); // Something went wrong, sign out
            reject("Signed out user, as google api client returned not signed in")
        }
    })
}

export const deleteCalendarEvent = (calendarId, eventId) => {

    const deleteCalendarEvent = () => {

        var event = {
            calendarId,
            eventId
        }

        return gapi.client.calendar.events.delete(event)
    }

    return new Promise((resolve, reject) => {
        // Make sure the Google API Client is properly signed in
        if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
            auth.refreshToken()
                .then(function (token) {
                    return deleteCalendarEvent()
                })
                .then(function (response) {
                    resolve(response)
                })
        } else {
            auth.signOut(); // Something went wrong, sign out
            reject("Signed out user, as google api client returned not signed in")
        }
    })
}

export const updateCalendarEvent = (calendarId, eventId, title, description, startTime, endTime) => {

    const getCalendarEvents = () => {

        var event = {
            'summary': title,
            'description': description,
            'start': {
                'dateTime': moment(startTime).toISOString(),
                'timeZone': 'America/Los_Angeles'
            },
            'end': {
                'dateTime': moment(endTime).toISOString(),
                'timeZone': 'America/Los_Angeles'
            },
        }

        return gapi.client.calendar.events.update({
            calendarId,
            eventId,
            'resource': event
        })
    }

    return new Promise((resolve, reject) => {
        // Make sure the Google API Client is properly signed in
        if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
            auth.refreshToken()
                .then(function (token) {
                    return getCalendarEvents()
                })
                .then(function (response) {
                    resolve(response)
                })
        } else {
            auth.signOut(); // Something went wrong, sign out
            reject("Signed out user, as google api client returned not signed in")
        }
    })
}
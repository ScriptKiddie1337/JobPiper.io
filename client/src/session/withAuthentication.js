/* global gapi */

import React from 'react'
import PropTypes from 'prop-types'

import { firebase, auth } from '../firebase'
import { config } from '../firebase/config'

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        authUser: null,
      }
    }

    getChildContext() {
      return {
        authUser: this.state.authUser,
      }
    }

    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {

        authUser
          ? this.setState(() => ({ authUser }))
          : this.setState(() => ({ authUser: null }))

        // Make sure there is a valid user object
        if (authUser) {
          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = 'https://apis.google.com/js/api.js';
          // Once the Google API Client is loaded, you can run your code
          script.onload = function (e) {
            // Initialize the Google API Client with the config object
            // Syntax below informs eslint that gapi was defined by the script loaded
            function initClient() {
              gapi.client.init({
                apiKey: config.apiKey,
                clientId: config.clientId,
                discoveryDocs: config.discoveryDocs,
                scope: config.scopes.join(' ')
              })
                // Loading is finished, so start the app
                .then(function () {
                  // Make sure the Google API Client is properly signed in
                  if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
                    auth.currentUser.getToken()
                      .then(function (token) {
                        console.log("user token " + token)
                        return gapi.client.calendar.events.list({
                          calendarId: "primary",
                          timeMin: new Date().toISOString(),
                          showDeleted: false,
                          singleEvents: true,
                          maxResults: 10,
                          orderBy: "startTime"
                        })
                      })
                      .then(function (response) {
                        console.log(response);
                      })
                  } else {
                    console.log("Signed out user")
                    auth.signOut(); // Something went wrong, sign out
                  }
                })
            }
            gapi.load('client:auth2', initClient)
          }
          // Add to the document
          document.getElementsByTagName('head')[0].appendChild(script);
        }
      })
    }
    render() {
      return (
        <Component {...this.props} />
      )
    }
  }

  WithAuthentication.childContextTypes = {
    authUser: PropTypes.object,
  }

  return WithAuthentication
}

export default withAuthentication

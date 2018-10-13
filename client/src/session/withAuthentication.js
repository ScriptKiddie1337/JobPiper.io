/* global gapi */

import React from 'react'
import PropTypes from 'prop-types'

import { firebase, auth } from '../firebase'

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

      if (process.env.REACT_APP_LOCAL_AUTHENTICATION !== "true") {

        firebase.auth.onAuthStateChanged(authUser => {

          authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null })
        })
      } else {
        this.setState({ authUser: true })
      }
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

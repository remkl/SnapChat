import React, { Component, PropTypes } from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import Login from './Login'
import { AsyncStorage } from 'react-native'
import { login } from './loginUtils'
import * as firebase from 'firebase'

class LoginContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      loading: false,
      isInputValid: false,
      errorState: false
    }

    this.backButtonPressed = this.backButtonPressed.bind(this)
    this.loginButtonPressed = this.loginButtonPressed.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
    this.updateUsername = this.updateUsername.bind(this)
    this.toggleSpinner = this.toggleSpinner.bind(this)
    this.saveUserId = this.saveUserId.bind(this)
    this.saveUserObject = this.saveUserObject.bind(this)
  }

  backButtonPressed () {
    this.props.navigator.pop()
  }

  updatePassword (updatedPassword) {
    if (updatedPassword && this.state.username) {
      this.setState({ password: updatedPassword, isInputValid: true })
    } else {
      this.setState({ password: updatedPassword, isInputValid: false })
    }
  }

  updateUsername (updatedUsername) {
    if (updatedUsername && this.state.password) {
      this.setState({ username: updatedUsername, isInputValid: true })
    } else {
      this.setState({ username: updatedUsername, isInputValid: false })
    }
  }

  toggleSpinner () {
    this.setState({
      loading: !this.state.loading
    })
  }

  loginButtonPressed () {
    const { username, password } = this.state
    this.toggleSpinner()

    login(username.toLowerCase(), password)
      .then((success) => {
        this.saveUserId(success)
        this.props.loginSuccess(success)
      })
      .catch((error) => {
        console.log(error)
        this.setState({
          errorState: true
        }, () => {
          this.toggleSpinner()
          setTimeout(() => {
            this.setState({
              errorState: false
            })
          }, 4000)
        })
      })
  }

  async saveUserId (user) {
    try {
      await AsyncStorage.setItem('userId', JSON.stringify(user.uid))
      this.saveUserObject(user.uid)
    } catch (error) {
      console.log('Error saving user to local storage: ', error)
    }
  }

  async saveUserObject (userId) {
    try {
      let currentUser
      const ref = await firebase.database()
                          .ref('users/' + userId)
                          .once('value')
                          .then((snapshot) => {
                            currentUser = snapshot.val()
                          })
      await AsyncStorage.setItem('user', JSON.stringify(currentUser))
    } catch (error) {
      console.log('Error saving user to local storage: ', error)
    }
  }

  render () {
    const spinner = this.state.loading
      ? <Spinner visible overlayColor={'rgba(0,0,0,0.70)'} />
      : null
    return (
      <Login errorMessage={this.state.errorMessage}
             backButtonPressed={this.backButtonPressed}
             loginButtonPressed={this.loginButtonPressed}
             updateUsername={this.updateUsername}
             updatePassword={this.updatePassword}
             hasValidInput={this.state.isInputValid}
             errorState={this.state.errorState} >

        {spinner}

      </Login>
    )
  }
}

LoginContainer.propTypes = {
  navigator: PropTypes.object,
  loginSuccess: PropTypes.func.isRequired
}

export default LoginContainer

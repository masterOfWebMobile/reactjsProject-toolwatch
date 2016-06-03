import React, {Component, PropTypes} from 'react';
import request from 'superagent';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import {loginWithUsernamePassword} from '../redux/actions/authActions';

@connect(
  state => ({user: state.auth.user}),
  {loginWithUsernamePassword, push}
)
export default class Login extends Component {

	constructor(props) {
    super(props);
    this.state = {
      username: '',
      usernameError: '',
      password: '',
      passwordError: '',
      keepLoggedin: false
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if(!this.props.user && newProps.user) {
      this.props.push('/');
    }
  }

  handleLogin(e) {
    e.preventDefault();
    let errors = {};
    const {username, password} = this.state;
    if (username == '') 
    {
      Object.assign(errors, {usernameError: '*Username is required'});
    }
    if (password == '') 
    {
      Object.assign(errors, {passwordError: '*Password is required'});
    }
    if (Object.keys(errors).length > 0) {
      this.setState(errors);
    }else {
      this.props.loginWithUsernamePassword(username, password);
    }
  }

  render() {

    return (
      <div className="login-page">
      	<div className="login-form">
          <h2 className="form-title">Tool Watch</h2>
          <div className="input-group">
            <input type="text" placeholder="Username" value={this.state.username} onChange={(e) => this.setState({username: e.target.value, usernameError: ''})} />
          </div>
          {this.state.usernameError && 
            <p className="error-text">{this.state.usernameError}</p>
          }
          <div className="input-group">
            <input type="password" placeholder="Password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value, passwordError: ''})} />
          </div>
          {this.state.passwordError && 
            <p className="error-text">{this.state.passwordError}</p>
          }
          <div className="input-group">
            <input type="checkbox" checked={this.state.keepLoggedin} onChange={(e) => this.setState({keepLoggedin: e.target.checked})} /> Keep me logged in
          </div>
          <div className="submit-button display-flex">
            <button className="btn fill" onClick={this.handleLogin}>LOGIN</button>
          </div>
        </div>
      </div>
    );
  }
}
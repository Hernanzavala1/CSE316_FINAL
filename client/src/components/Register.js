import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
    };
  }
  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { username, email, password } = this.state;
    console.log(username + ' is the name');

    axios
      .post('/auth/register', { username, email, password })
      .then((result) => {
        console.log('THIS SHIT WORKED B');
        console.log('registering user ' + username);
        this.props.history.push('/');
      })
      .catch((err) => {
        console.log(
          'this shit aint workin muthafucka gun tucka lil brotha imma out and touch ya'
        );
        console.log('the error is ' + err);
      });
  };

  render() {
    const { username, email, password } = this.state;
    return (
      <div class="container">
        <form class="form-signin" onSubmit={this.onSubmit}>
          <h2 class="form-signin-heading">Register</h2>
          <label for="inputUsername" class="sr-only">
            User Name
          </label>
          <input
            type="text"
            class="form-control"
            placeholder="user name"
            name="username"
            value={username}
            onChange={this.onChange}
            required
          />
          <label for="inputEmail" class="sr-only">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            placeholder="Email address"
            name="email"
            value={email}
            onChange={this.onChange}
            required
          />
          <label for="inputPassword" class="sr-only">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            name="password"
            value={password}
            onChange={this.onChange}
            required
          />
          <button class="btn btn-lg btn-primary btn-block" type="submit">
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default Register;

import React, { Component } from "react";
//import { Col, Row, Container } from "../../components/Grid";
import './Login.scss'


class Login extends Component {
  state = {
    jobs: [],
    title: "",
    link: "",
    image: "",
    note: [],
    contact: []
  };

  componentDidMount() {
    // this.loadJobListing();
  }
;

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    
  };

  render() {
    return (
      <div>
       <img src="https://images.pexels.com/photos/277593/pexels-photo-277593.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt='Doors' />
      </div>
    );
  }
}

export default Login;

import React, { Component } from "react"
import logo from './logo.svg';
import './App.css';

export default class App extends Component {
  state = {
    people: [],
    search: ""
  };

  componentDidMount() {
    console.log("mounted!");
    const data = fetch("https://randomuser.me/api/?results=50");
    data
      .then((response) => response.json())
      .then((response) => {
        this.setState({ people: response.results });
      });
  }

  componentWillUnmount() {
    console.log("I will unmount");
  }

  handleInputChange = (event) => {
    this.setState({ search: event.target.value });
  };

  handleSearchClick = () => {
    const search = this.state.search;
    console.log(search)
    const data = fetch(`https://randomuser.me/api/?gender=${search}`);
    data
      .then((response) => response.json())
      .then((response) => {
        this.setState({ people: response.results });
      });
  }

  render() {
    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <input
          type="text"
          value={this.state.search}
          onChange={this.handleInputChange}
        />
        <button type="button" onClick={this.handleSearchClick}>Search</button>
        {this.state.people.map((person) => (
           <tr>
           <td>{person.name.first + " " + person.name.last}</td>
           <td>{person.email}</td>
           <td>{person.cell}</td>
           <td>{person.location.street + ", " +  person.location.city + ", " + person.location.state}</td>
         </tr>
        ))}
        <h2>Start editing to see some magic happen!</h2>
      </div>
    );
  }
}




import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

export default class App extends Component {
  state = {
    people: [],
    keys: ["", "First Name", "Last Name", "Relevant Info"],
    search: "",
    
  
  };

  componentDidMount() {
    console.log("mounted!");
    const data = fetch("https://randomuser.me/api/?results=20");
    data
      .then((response) => response.json())
      .then((response) => {
        this.setState({ people: response.results});
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
    console.log(search);
    const data = fetch(`https://randomuser.me/api/?gender=${search}`);
    data
      .then((response) => response.json())
      .then((response) => {
        this.setState({ people: response.results });
      });
  };

  
  
  

  render() {
    return (
      <div className="App">
        <h1>User Directory</h1>
        <input
          type="text"
          value={this.state.search}
          onChange={this.handleInputChange}
        />
        <button type="button" onClick={this.handleSearchClick}>
          Search
        </button>

        <table className = "table">
          <thead style={{ color: "black" }}>
            {this.state.keys.map((key, index) => {
              return (
                <th key={index} onClick={() => this.handleSort(key)}>
                  {key}
                </th>
              );
            })}
          </thead>
          <tbody>
            {this.state.people.map((person) => (
              <tr key={person.email}>
                <td><img src ={person.picture.medium}></img></td>
                <td>{person.name.first}</td>
                <td>{person.name.last}</td>
                <tbody className = "table">
                  <tr>
                  <td >{person.email}</td>
                  </tr>
                  <td >{person.cell}</td>
                  <tr>
                    <td >{
                    person.location.city +
                    ", " +
                    person.location.state}</td>
                  </tr>
                </tbody>
                
              
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Start editing to see some magic happen!</h2>
      </div>
    );
  }
}


  

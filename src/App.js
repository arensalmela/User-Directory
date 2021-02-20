//collaborated with https://github.com/ReindeerCode

import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

export default class App extends Component {
  state = {
    people: [],
    keys: ["", "First", "Last", "Relevant Info"],
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

  //Refresh page on click

  handleRefresh = () => {
    window.location.reload(true);
  };

  //Filter to random female

  handleFirstClick = () => {
   
    const data = fetch(`https://randomuser.me/api/?gender=female`);
    data
      .then((response) => response.json())
      .then((response) => {
        this.setState({ people: response.results });
      });
  };

  //Filter to random male

  handleSecondClick = () => {
    
    
    const data = fetch(`https://randomuser.me/api/?gender=male`);
    data
      .then((response) => response.json())
      .then((response) => {
        this.setState({ people: response.results });
      });
  };

  //Sort users alphabetically by first / last name

  handleSort = (term) => {
    let search_Term = term.toLowerCase()
    let names = ["first", "last"]
    if (names.includes(search_Term)){
      this.setState({
        sorted: true,
        people: this.state.people.sort((a,b) => a["name"][search_Term].localeCompare(b["name"]
        [search_Term])),
        ...this.state
      })
    }
  }
  
  
  render() {
    return (
      <div className="App">
        <h1>User Directory</h1>
        {/* <input
          type="text"
          value={this.state.search}
          onChange={this.handleInputChange}
        /> */}
        
        
        <br></br>
        <button type="button" onClick={this.handleFirstClick}>
          Filter Female
        </button>
        <button type="button" onClick={this.handleSecondClick}>
          Filter Male
        </button>
        <br></br>
        <br></br>
        <h2>Click on First or Last Name Heading to Sort Alphabetically</h2>
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
                  <td >Cell # {person.cell}</td>
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
        <br></br>
        <button type="button" onClick={this.handleRefresh}>
          Refresh Page
        </button>

      
      </div>
    );
  }
}


  

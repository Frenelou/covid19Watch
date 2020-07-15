import React, { Component } from "react";

import "./styles.css";
import API from "../utils/API";

export default function App() {
  return (
    <div className="App">
      <h1>Covid19 Watch</h1>
      <WorldData />
      <br />
      <CountryList />
    </div>
  );
}
// Data for countries

class WorldData extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {
    try {
      const worldData = await API.get("/timeline");
      this.setState({
        ...this.state,
        ...worldData.data[0]
      });
    } catch (e) {
      console.log("Error", e);
    }
  }

  render() {
    const { total_deaths, total_recovered, total_cases } = this.state;
    return (
      <section>
        <h2>World Data</h2>
        <p>Total Cases: {total_cases}</p>
        <p>total Recovered: {total_recovered}</p>
        <p>total Deaths: {total_deaths}</p>
      </section>
    );
  }
}

class CountryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: []
    };
  }
  async componentDidMount() {
    try {
      const countryList = await API.get("/status/");
      this.setState({
        ...this.state,
        countries: countryList.data
      });
    } catch (e) {
      console.log("Error", e);
    }
  }
  render() {
    const { countries } = this.state;
    return (
      <section>
        <h2>Countries List</h2>
        {countries.map(country => {
          return <CountryData Details={{ ...country }} />;
        })}
      </section>
    );
  }
}

const CountryData = props => {
  return (
    <div key={`country_${props.Details.country}`}>
      <h3>country code : {props.Details.country}</h3>
      <p>cases : {props.Details.cases}</p>
      <p>deaths : {props.Details.deaths}</p>
      <p>recovered : {props.Details.recovered}</p>
    </div>
  );
};

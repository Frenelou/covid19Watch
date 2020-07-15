import React, { Component } from "react";

import "./styles.css";
import API from "./utils/API";

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
        {countries.map(country => <CountryData key={`country_${country.country}`} countryDetails={country} />)}
      </section>
    );
  }
}

const CountryData = props => {
  const { country, cases, deaths, recovered } = props.countryDetails;
  return <div>
    <h3>country code : {country}</h3>
    <p><b>cases</b> : {cases}</p>
    <p><b>deaths</b> : {deaths}</p>
    <p><b>recovered</b> : {recovered}</p>
    <br />
  </div>;
};

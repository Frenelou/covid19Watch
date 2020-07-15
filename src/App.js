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
        {countries.map(country => {
          return <CountryData countryDetails={{ country }} />;
        })}
      </section>
    );
  }
}

const CountryData = props => {
  const { country: country_code, cases, deaths, recovered} = this.props.countryDetails;
  return (
    <div key={`country_${country_code}`}>
      <h3>country code : {country_code}</h3>
      <p>cases : {cases}</p>
      <p>deaths : {deaths}</p>
      <p>recovered : {recovered}</p>
    </div>
  );
};

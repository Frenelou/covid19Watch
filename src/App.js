import React, { Component } from "react";

import "./styles.css";
import API from "./utils/API";
import { getName } from "country-list";

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
    <h3>{getName(country)}</h3>
    <p><b>cases</b> : {cases}</p>
    <p><b>deaths</b> : {deaths}</p>
    <p><b>recovered</b> : {recovered}</p>
    <br />
  </div>;
};
//We need country wise total affected cases, recovered and Deaths
//We will global map on clicking on each country in the map we get the details
//We will have a combobox tp select the country
//show the details accordingly

/* The APi returns json data of all countries in this format
{
  "country" : "NA",
  "last_update" : "2020-07-15T12:34:59",
  "cases" : 864,
  "deaths" : 2,
  "recovered" : 29
}*/
// TODO
/*
- Create a function to retrieve the data
- Display world data (total cases, deaths, recovered)
- Display a list of data for countries
- Add a filter to see data for only specific country
*/
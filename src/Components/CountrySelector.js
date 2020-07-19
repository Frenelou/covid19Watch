import React, { Component } from "react";
import { FormControl,InputLabel,Select,MenuItem,Input } from "@material-ui/core";
import axios from 'axios';
import styles from "../styles.css";
import API from "../utils/API";
import CountryData from "./CountryData";

class CountrySelector extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      fetchedCountries:[],
      hasError: false,
      currentCountry:{}
    };
    this.handleChange = this.handleChange.bind(this);
  }
 
  
  handleChange(event) {
    const code = event.target.value;
    axios.get(`https://covid19-api.org/api/status/${code}`)
      .then(res => {
        this.setState({ ...this.state,selected: code,currentCountry:res.data });
      })
      // console.log(this.state);
  }

  async componentDidMount() {
    try {
    const currentCountryCode =  await axios.get('https://ipapi.co/json/').then((response) => {
        return response.data.country
        })
    const currentCountryDetails = await axios.get(`https://covid19-api.org/api/status/${currentCountryCode}`)
      .then(res => {
        return res.data
      })   
        console.log(currentCountryDetails);
      const countryList = await API.get("/countries/");
      // console.log(countryList.data.slice(0,2));
      const fetchedCountries = countryList.data; // use subset of countries for performance on codesandbox
      
      this.setState({
        fetchedCountries,
        selected:currentCountryCode,
        currentCountry:currentCountryDetails
        // initialized Selected value
        
      });    
    } catch (e) {
      console.log("Error", e);
    }
  }

  render() {
    const { selected, hasError, fetchedCountries, currentCountry } = this.state;
    // console.log(currentCountry);
    return (
      <form  autoComplete="off">
        <FormControl className= {styles.ComboBoxformControl} error={hasError}>
          <InputLabel htmlFor="name"></InputLabel>
          <Select
            name="name"
            value={selected}
            onChange={this.handleChange}
            input={<Input id="name" />}
          >
        {fetchedCountries.map(country => 
          {
            const { name, alpha2} = country;

            return <MenuItem key={alpha2}  value={alpha2}>{name}</MenuItem>
          
          })}

          </Select>
        </FormControl>
        {currentCountry.cases !== undefined && <CountryData countryDetails={currentCountry}/> }
        
      </form>
    );
  }
}


export default CountrySelector;

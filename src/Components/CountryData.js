import React from "react";
import { getName } from "country-list";

const CountryData = props => {
  const { country, cases, deaths, recovered } = props.countryDetails;
  return (
    <div>
      <h3>{getName(country)}</h3>
      <p>
        <b>cases</b> : {cases}
      </p>
      <p>
        <b>deaths</b> : {deaths}
      </p>
      <p>
        <b>recovered</b> : {recovered}
      </p>
      <br />
    </div>
  );
};
export default CountryData;
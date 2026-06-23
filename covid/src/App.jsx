import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setLoading(false);
      });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>🌍 COVID-19 Stats Tracker</h1>

      <input
        type="text"
        placeholder="Search Country..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="grid">
          {filteredCountries.map((country) => (
            <div className="card" key={country.country}>
              <img src={country.countryInfo.flag} alt={country.country} />
              <h2>{country.country}</h2>

              <p>Total Cases</p>
              <h3>{country.cases.toLocaleString()}</h3>

              <p>Recovered</p>
              <h3 className="green">
                {country.recovered.toLocaleString()}
              </h3>

              <p>Deaths</p>
              <h3 className="red">
                {country.deaths.toLocaleString()}
              </h3>

              <p>Active Cases</p>
              <h3 className="blue">
                {country.active.toLocaleString()}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
import React, { Component } from "react";
import { render } from "react-dom";
import Select from "react-select";
import styled from "@emotion/styled";
import { FaSearch } from "react-icons/fa";
import Card from "./Card";
import Grid from "./Grid";
import "./style.css";

const Search = styled.div`
  text-align: center;
  margin: 2rem;
  display: flex;
  .search {
    background-color: #fff;
    margin: 0 auto;
    border: 1px solid #416dff;
    border-radius: 5px;
    input {
      padding: 22px;
      color: #416dff;
      font-weight: 800;
      border: none;
    }
    button {
      padding: 24px;
      color: #fff;
      background-color: #416dff;
      border: none;
      font-weight: 900;
    }
  }
`;

const Results = styled.div`
  .results {
    text-align: center;
    padding: 10px;
    color: #416dff;
    font-weight: 800;
    font-family: arial;
  }
`;
const CSelect = styled.div`
  .select {
    margin: 0 auto;
    max-width: 300px;
    font-family: arial;
  }
  .mad__control {
    border: 1px solid #416dff;
    color: #416dff;
  }
  .mad__placeholder {
    color: #416dff;
    font-weight: 800;
  }
  .mad__single-value {
    color: #416dff;
    font-weight: 800;
  }
  .mad__indicator {
    color: #416dff;
    font-weight: 800;
  }
`;
class App extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      filtered: [],
      selectedOption: null,
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "", label: "All" }
      ]
    };
  }

  componentDidMount() {
    this.getUsers();
  }
  async getUsers() {
    let response = await fetch("https://randomuser.me/api/?results=100");
    let data = await response.json();
    this.setState({ users: data.results });
  }

  search = evt => {
    this.setState({ search: evt.target.value });
    const filtered = this.state.users.filter(e => {
      return (
        e.location.city.includes(evt.target.value) ||
        e.location.state.includes(evt.target.value)
      );
    });
    if (filtered.length > 0) this.setState({ filtered });
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    let filtered = [];
    if (this.state.filtered && this.state.filtered.length > 0) {
      filtered = this.state.filtered.filter(e => {
        return e.gender === selectedOption.value;
      });
    } else {
      filtered = this.state.users.filter(e => {
        return e.gender === selectedOption.value;
      });
    }

    if (filtered.length > 0) {
      this.setState({ filtered });
    } else {
      this.setState({ filtered: [] });
    }
  };

  render() {
    return (
      <div>
        <Search>
          <div className="search">
            <input
              type="text"
              value={this.state.search || ""}
              placeholder="Search by city or state..."
              onChange={e => this.search(e)}
            />
            <button>
              <FaSearch />
            </button>
          </div>
        </Search>
        <Results>
          <div className="results">
            {this.state.filtered.length === 0 &&
            this.state.users &&
            this.state.users.length > 0 ? (
              <span>
                {this.state.users.length} {"results found"}
              </span>
            ) : (
              <span>
                {this.state.filtered.length} {"results found"}
              </span>
            )}
          </div>
        </Results>
        <CSelect>
          <Select
            classNamePrefix="mad"
            placeholder="Sort by"
            className="select"
            value={this.state.selectedOption}
            onChange={this.handleChange}
            options={this.state.options}
          />
        </CSelect>
        <Grid>
          {this.state.filtered.length === 0 &&
          this.state.users &&
          this.state.users.length > 0
            ? this.state.users.map((e, i) => (
                <div key={i} className="grid-item">
                  <Card
                    firstName={e.name.first}
                    lastName={e.name.last}
                    avatar={e.picture.medium}
                    email={e.email}
                    phone={e.phone}
                    city={e.location.city}
                    state={e.location.state}
                  />
                </div>
              ))
            : this.state.filtered.map((e, i) => (
                <div key={i} className="grid-item">
                  <Card
                    firstName={e.name.first}
                    lastName={e.name.last}
                    avatar={e.picture.medium}
                    email={e.email}
                    phone={e.phone}
                    city={e.location.city}
                    state={e.location.state}
                  />
                </div>
              ))}
        </Grid>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));

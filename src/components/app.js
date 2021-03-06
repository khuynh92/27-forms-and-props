import React, { Component, Fragment } from 'react';

import '../style/app.scss';

import SearchForm from './reddit/SearchForm.js';
import SearchResultList from './reddit/SearchResultList.js';

import superagent from 'superagent';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      number: '',
      subreddit: '',
      loading: false,
      error: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  isLoading(loading) {
    this.setState(Object.assign(...this.state, { loading }));
  }

  async handleSubmit(e) {

    e.preventDefault();
    this.isLoading(true);

    try {
      const results = await superagent.get(`https://www.reddit.com/r/${this.state.subreddit}.json?limit=${this.state.number}`)
      this.setState({
        error: false,
        results: results.body.data.children,
      }, () => console.log(this.state));
      this.isLoading(false);
    } catch (err) {
      console.log(err);
      this.isLoading(false);
      this.setState({ error: true });
    }

  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  render() {
    return (
      <Fragment>
        <h1>Reddit Finder</h1>
        <SearchForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} error={this.state.error} />
        <SearchResultList results={this.state.results} />
      </Fragment>
    );

  }
}
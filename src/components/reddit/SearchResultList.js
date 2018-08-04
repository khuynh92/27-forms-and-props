import React, { Component } from 'react';

class SearchResultList extends Component {

  render() {
    return (
      <ul>
        {
          this.props.results.map((link, i) => {
            if (i !== 0) return (
              <li key={i}>
                <a href={'https://reddit.com' + link.data.permalink}><h3>{link.data.title}</h3></a>
                <img src={link.data.thumbnail} />
              </li>
            );
          })
        }
      </ul>
    );
  }
}

export default SearchResultList;
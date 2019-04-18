import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seriesId: '',
      seriesData: {}
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch(`/series-videos/${this.state.seriesId}`);  
    const body = await response.json();
    if (response.status !== 200) throw Error(body);
    this.setState({ seriesData: body });
  };

  render() {
    return (
      <div className="app">
        <header className="app__header">
          <h1 className="app__main-heading">{`Hello!  This is the <App /> component!  Please render your UI in .app__body below`}</h1>
        </header>
        <div className="app__body">
          <form onSubmit={this.handleSubmit}>
          <label>
            Series Id:
            <input type="text" value={this.state.seriesId} onChange={e => this.setState({ seriesId: e.target.value })} />
          </label>
          <input type="submit" value="GET SERIES DATA" />
        </form>
        </div>
      </div>
    );
  }
}

export default App;

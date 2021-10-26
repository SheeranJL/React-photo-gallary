//Main container component//
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import React, {Component} from 'react';
import NavBar from './components/nav.js';
import SearchBar from './components/search-bar';
import ImageContainer from './components/Image-container';
import NoRoute from './components/no-route';
import Header from './components/header';
import apiKey from './config.js'
import axios from 'axios';

//**Main App component**//
class App extends Component {

  //Holding Application state//
  state = {
    images : [],    //<---- Array of images obtained from Flickr
    keyword: '',    //<---- Holds keywords used to search Flickr database
    loading: true   //<---- Holds loading state of application (Have we finished loading information?)
  }

  //Function to update the keyword state - Passed as prop to SearchBar & NavBar & ImageContainer components//
  updateKeywordState = (query) => {
    this.setState({
      keyword: query
    })
  }


  //React Lifecycle phase - Invoked immediately after DOM renders
  componentDidMount() {
    this.updateKeywordState('pineapples'); //<---- invoking the performSearch function one app starts
  }

  //This function will detect changes to either the components state, or props, then re-render the page with new info
  componentDidUpdate(prevProps, prevState) {
    if (this.state.keyword !== prevState.keyword) { //<---- Comparing current state values with previous state values
      this.setState({                               //<---- Altering state values
        loading: true                               //<---- Setting loading to true; rendering the 'loading' text
      })
      axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&media=photo&tags=${this.state.keyword}&safe_search=1&per_page=24&format=json&nojsoncallback=1`)
        .then(response => { //<---- fetch data using axios, then change state accordingly
          this.setState({
            images: response.data.photos.photo,
            loading: false
          })
        })
        .catch(error => console.log('There was an error updating component @componentDidUpdate', error))
    }
  }


  render() {
  return (
    <BrowserRouter>
      <Header />
      <div className='container'>
        <SearchBar onSearch={this.performSearch} querySearch={this.updateKeywordState}/>
        <NavBar onSearch={this.performSearch} querySearch={this.updateKeywordState}/>
        <div className='photo-container'>
        {
          (this.state.loading)                 //<---- conditiionally render 'loading' text if state.loading = true; else ren
          ? <p> Loading, please wait... </p>
          : (
            <Switch> {/*implementing switch to render/redirect specific routes and fall back on NoRoute component if route doesn't exist.*/}
              <Route exact path='/' render={ () => <Redirect to={`/search/${this.state.keyword}`} /> } />
              <Route path='/search/:topic' render={ () => <ImageContainer images={this.state.images} keyword={this.state.keyword} loading={this.state.loading} gatherImages={this.updateKeywordState}/>} />
              <Route component={NoRoute} />
            </Switch>
          )
        }
        </div>
      </div>
    </BrowserRouter>
  );
}

}

export default App;

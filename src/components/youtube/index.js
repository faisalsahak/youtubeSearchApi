import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import _ from 'lodash';
import YTSearch from 'youtube-api-search';
import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import Nav from '../Nav';

const API_KEY = 'AIzaSyC14nU_wOQGIF6uAibzh3zguF4PCnD0DeE';

// Create a new component. This component should produce some HTML
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.videoSearch('funny videos');// does an initial search
  }

  videoSearch = (term) => {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,// {videos} Synthactic sugar for this.setState({ videos: videos });
        selectedVideo: videos[0]
      });
    });
  }

  render(){
    const videoSearch = _.debounce(term => { this.videoSearch(term) }, 300);
    return (
      <div>
        <Nav />
        <SearchBar onSearchTermChange={videoSearch} />
        <br/>
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
      </div>
    );
  }
}

export default App;

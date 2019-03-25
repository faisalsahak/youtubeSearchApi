import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';

const API_KEY = 'AIzaSyC14nU_wOQGIF6uAibzh3zguF4PCnD0DeE';

// Create a new component. This component should produce some HTML
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.videoSearch('computer science');
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
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
      </div>
    );
  }
}

//Take this component's generated HTML and put it on the page (DOM).
ReactDOM.render(<App />, document.getElementById('app'));

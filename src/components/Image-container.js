import React, {Component} from 'react';
import Image from './image';
import NotFound from './not-found';
import {withRouter} from 'react-router';

class ImageContainer extends Component {

  render() {
    const results = this.props.images;
    const topic = this.props.match.params.topic;

    let images;
    let queryString;

    if (topic !== this.props.keyword) {
      this.props.gatherImages(topic);
    } else {
      if (results.length > 0) {
        images = results.map((image, index) => <Image key={index} sourceData={image}/>)
        queryString = <h1>Images of: {this.props.keyword}</h1>
    } else {
        images = <NotFound />
        queryString = null
    }
  }

    return (
      <div className='photo-container'>
          {queryString}
        <ul>
          {images}
        </ul>
      </div>
    )

  }

}

export default withRouter(ImageContainer);

import React from 'react';
import Image from './image';
import NotFound from './not-found';
import {withRouter} from 'react-router';

const ImageContainer = (props) => {


    const results = props.images;
    const topic = props.match.params.topic;

    let images;
    let queryString;

    if (topic !== props.keyword) {
      props.gatherImages(topic);
    } else {
      if (results.length > 0) {
        images = results.map((image, index) => <Image key={index} sourceData={image}/>)
        queryString = <h1>Images of: {props.keyword}</h1>
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

export default withRouter(ImageContainer);

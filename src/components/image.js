import React from 'react';

const Image = (props) => {
  let srcData = props.sourceData;
    return (
      <li>
        <img alt="" src={`https://farm${srcData.farm}.staticflickr.com/${srcData.server}/${srcData.id}_${srcData.secret}_m.jpg`} />
      </li>
    )
  }

export default Image;

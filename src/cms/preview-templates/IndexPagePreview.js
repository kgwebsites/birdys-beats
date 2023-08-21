import React from 'react';
import PropTypes from 'prop-types';

const IndexPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS();

  if (data) {
    return (
      <div>
        <div>image={getAsset(data.image)}</div>
        <div>title={data.title}</div>
        <div>heading={data.heading}</div>
        <div>subheading={data.subheading}</div>
        <div>description={data.description}</div>
        <div>intro={data.intro || { blurbs: [] }}</div>
        <div>mainpitch={data.mainpitch || {}}</div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
};

export default IndexPagePreview;

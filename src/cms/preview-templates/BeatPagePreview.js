import React from 'react';
import PropTypes from 'prop-types';
import Beat from '../../components/Beat';

const BeatPagePreview = ({ entry, widgetFor }) => {
  return (
    <div>
      <Beat
        beat={{
          id: 1,
          fields: {
            slug: 'preview-slug',
          },
          frontmatter: {
            featuredbeat: entry.getIn(['data', 'featuredbeat']),
            image: entry.getIn(['data', 'image']),
            preview_beat: {
              publicURL: entry.getIn(['data', 'preview-beat']),
            },
            title: entry.getIn(['data', 'title']),
            price: entry.getIn(['data', 'price']),
            description: entry.getIn(['data', 'description']),
          },
        }}
      />
    </div>
  );
};

BeatPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default BeatPagePreview;

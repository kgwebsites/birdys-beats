import React from 'react';
import PropTypes from 'prop-types';

const RecipePagePreview = ({ entry, widgetFor }) => {
  let ingredients = [];
  let steps = [];
  try {
    ingredients =
      JSON.parse(JSON.stringify(entry.getIn(['data', 'ingredients']))) || [];
    steps = JSON.parse(JSON.stringify(entry.getIn(['data', 'steps']))) || [];
  } catch (e) {
    //
  }
  return (
    <div>
      <div>description={entry.getIn(['data', 'description'])}</div>
      <div>tags={entry.getIn(['data', 'tags'])}</div>
      <div>title={entry.getIn(['data', 'title'])}</div>
      <div>ingredients={ingredients}</div>
      <div>steps={steps}</div>
    </div>
  );
};

RecipePagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default RecipePagePreview;

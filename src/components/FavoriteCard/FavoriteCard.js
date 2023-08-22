import React from 'react';

import * as styles from './FavoriteCard.module.css';

const FavoriteCard = (props) => {
  const { color, size, img, alt, showConfirmDialog } = props;
  return (
    <div className={styles.root}>
      <div>
        <div className={styles.imageContainer}>
          <img src={img} alt={alt} />
        </div>
        <div className={styles.metaContainer}>
          <span>Color: {color}</span>
          <span>Size: {size}</span>
        </div>
      </div>
      <div className={styles.actionContainer}>
        <span role={'presentation'} onClick={showConfirmDialog}>
          Remove
        </span>
      </div>
    </div>
  );
};

export default FavoriteCard;

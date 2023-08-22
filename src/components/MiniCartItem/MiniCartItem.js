import React from 'react';

import { navigate } from 'gatsby';
import CurrencyFormatter from '../CurrencyFormatter';
import RemoveItem from '../RemoveItem';
import PreviewCompatibleImage from '../PreviewCompatibleImage/PreviewCompatibleImage';

import * as styles from './MiniCartItem.module.css';

const MiniCartItem = (props) => {
  const { id, image, name, price, description } = props;

  return (
    <div className={styles.root}>
      <div className={styles.imageContainer}>
        <PreviewCompatibleImage
          imageInfo={{
            image: image,
            alt: `featured image thumbnail for post ${name}`,
            width: image.childImageSharp.gatsbyImageData.width,
            height: image.childImageSharp.gatsbyImageData.height,
          }}
        />
      </div>
      <div className={styles.detailsContainer}>
        <div className={styles.metaContainer}>
          <span className={styles.name}>{name}</span>
          <div className={styles.priceContainer}>
            <CurrencyFormatter amount={price} />
          </div>
          <span className={styles.meta}>{description}</span>
        </div>
      </div>
      <div className={styles.closeContainer}>
        <RemoveItem id={id} />
      </div>
    </div>
  );
};

export default MiniCartItem;

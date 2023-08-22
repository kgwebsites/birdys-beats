import React, { useState } from 'react';
import { navigate } from 'gatsby';
import * as styles from './ProductCard.module.css';

import Icon from '../Icons/Icon';
import CurrencyFormatter from '../CurrencyFormatter';

const ProductCard = (props) => {
  const [isWishlist, setIsWishlist] = useState(false);
  const {
    image,
    imageAlt,
    name,
    price,
    originalPrice,
    meta,
    height = 580,
  } = props;

  const handleRouteToProduct = () => {
    navigate('/beat/sample');
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    setIsWishlist(!isWishlist);
  };

  return (
    <div className={styles.root}>
      <div
        className={styles.imageContainer}
        onClick={() => handleRouteToProduct()}
        role={'presentation'}
      >
        <img style={{ height: `${height}px` }} src={image} alt={imageAlt}></img>
        <div
          className={styles.heartContainer}
          role={'presentation'}
          onClick={(e) => handleFavorite(e)}
        >
          <Icon symbol={'heart'} />
          <div
            className={`${styles.heartFillContainer} ${
              isWishlist === true ? styles.show : styles.hide
            }`}
          >
            <Icon symbol={'heartFill'}></Icon>
          </div>
        </div>
      </div>
      <div className={styles.detailsContainer}>
        <span className={styles.productName}>{name}</span>
        <div className={styles.prices}>
          <span
            className={`${originalPrice !== undefined ? styles.salePrice : ''}`}
          >
            <CurrencyFormatter amount={price}></CurrencyFormatter>
          </span>
          {originalPrice && (
            <span className={styles.originalPrice}>
              <CurrencyFormatter amount={originalPrice}></CurrencyFormatter>
            </span>
          )}
        </div>
        <span className={styles.meta}>{meta}</span>
      </div>
    </div>
  );
};

export default ProductCard;

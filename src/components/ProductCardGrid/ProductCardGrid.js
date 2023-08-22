import React, { useState } from 'react';
import * as styles from './ProductCardGrid.module.css';

import ProductCard from '../ProductCard';
import Slider from '../Slider';

const ProductCardGrid = (props) => {
  const { height, columns = 3, data, spacing, showSlider = false } = props;
  const columnCount = {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
  };

  const renderCards = () => {
    return data.map((product, index) => {
      return (
        <ProductCard
          key={index}
          height={height}
          price={product.price}
          imageAlt={product.alt}
          name={product.name}
          image={product.image}
          meta={product.meta}
          originalPrice={product.originalPrice}
          link={product.link}
        />
      );
    });
  };

  return (
    <div className={styles.root} style={columnCount}>
      <div
        className={`${styles.cardGrid} ${
          showSlider === false ? styles.show : ''
        }`}
        style={columnCount}
      >
        {data && renderCards()}
      </div>

      {showSlider === true && (
        <div className={styles.mobileSlider}>
          <Slider spacing={spacing}>{data && renderCards()}</Slider>
        </div>
      )}
    </div>
  );
};

export default ProductCardGrid;

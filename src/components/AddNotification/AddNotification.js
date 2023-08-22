import React, { useContext } from 'react';

import AddItemNotificationContext from '../../context/AddItemNotificationProvider';

import Button from '../Button';
import Icon from '../Icons/Icon';

import * as styles from './AddNotification.module.css';
import CartContext from '../../context/CartProvider';
import PreviewCompatibleImage from '../PreviewCompatibleImage/PreviewCompatibleImage';
import CurrencyFormatter from '../CurrencyFormatter/CurrencyFormatter';

const AddNotification = (props) => {
  const ctxAddItemNotification = useContext(AddItemNotificationContext);
  const cartLength = useContext(CartContext).state?.size || 0;
  const { open: showNotif, beat } = ctxAddItemNotification?.state ?? {};

  return (
    <div
      className={`${styles.root} ${
        showNotif === true ? styles.show : styles.hide
      }`}
    >
      {!beat ? null : (
        <>
          <div className={styles.header}>
            <div className={styles.iconContainer}>
              <Icon symbol={'check'}></Icon>
            </div>
            <span>🔥 added to bag</span>
          </div>

          <div className={styles.newItemContainer}>
            <div className={styles.imageContainer}>
              <PreviewCompatibleImage
                imageInfo={{
                  image: beat.frontmatter.image,
                  alt: `featured image thumbnail for post ${beat.frontmatter.title}`,
                  width:
                    beat.frontmatter.image.childImageSharp.gatsbyImageData
                      .width,
                  height:
                    beat.frontmatter.image.childImageSharp.gatsbyImageData
                      .height,
                }}
              />
            </div>
            <div className={styles.detailContainer}>
              <span className={styles.name}>{beat.frontmatter.title}</span>
              <span className={styles.meta}>
                <CurrencyFormatter amount={beat.frontmatter.price} />
              </span>
              <span className={styles.meta}>
                {beat.frontmatter.description}
              </span>
            </div>
          </div>

          <div className={styles.actionContainer}>
            <Button onClick={props.openCart} level={'secondary'}>
              view my 🔥 ({cartLength})
            </Button>
            <Button level="primary" href="/cart">
              checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddNotification;

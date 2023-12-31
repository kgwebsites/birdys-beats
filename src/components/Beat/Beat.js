import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import AddItemNotificationContext from '../../context/AddItemNotificationProvider';
import PreviewCompatibleImage from '../PreviewCompatibleImage/PreviewCompatibleImage';
import * as styles from './Beat.module.css';
import Button from '../Button/Button';
import CartContext from '../../context/CartProvider';
import CurrencyFormatter from '../CurrencyFormatter/CurrencyFormatter';

export default function Beat({ beat }) {
  const ctxAddItemNotification = useContext(AddItemNotificationContext);
  const cartContext = useContext(CartContext);
  const showNotification = ctxAddItemNotification.showNotification;
  return (
    <div className={styles.beatContainer} key={beat.id}>
      <article
        className={`blog-list-item tile is-child box notification ${
          beat.frontmatter.featuredbeat ? 'is-featured' : ''
        }`}
      >
        <header>
          {beat.frontmatter.image ? (
            <div className={styles.thumbnailContainer}>
              <PreviewCompatibleImage
                imageInfo={{
                  image: beat.frontmatter.image,
                  alt: `featured image thumbnail for post ${beat.frontmatter.title}`,
                  width:
                    beat.frontmatter.image?.childImageSharp?.gatsbyImageData
                      ?.width,
                  height:
                    beat.frontmatter.image?.childImageSharp?.gatsbyImageData
                      ?.height,
                }}
              />
              <p className={styles.previewText}>PREVIEW</p>
              {/* eslint-disable jsx-a11y/media-has-caption */}
              <audio className={styles.audio} controls>
                <source
                  src={beat.frontmatter.preview_beat.publicURL}
                  type="audio/mpeg"
                />
                Your browser does not support the audio element.
              </audio>
            </div>
          ) : null}
          <p className="post-meta">
            <Link
              className="title has-text-primary is-size-4"
              to={beat.fields.slug}
            >
              <strong>{beat.frontmatter.title} →</strong>
            </Link>
          </p>
          <small className={styles.description}>
            <CurrencyFormatter amount={beat.frontmatter.price} />
          </small>
          <p className={styles.description}>{beat.frontmatter.description}</p>
          <Button
            onClick={() => {
              showNotification(beat);
              cartContext.add(beat);
            }}
            fullWidth
            level={'primary'}
          >
            Add to Cart
          </Button>
        </header>
      </article>
    </div>
  );
}

Beat.propTypes = {
  beat: PropTypes.shape({
    id: PropTypes.string,
    fields: PropTypes.shape({
      slug: PropTypes.string,
    }),
    frontmatter: PropTypes.shape({
      featuredbeat: PropTypes.bool,
      image: PropTypes.object,
      preview_beat: PropTypes.shape({
        publicURL: PropTypes.string,
      }),
      title: PropTypes.string,
      price: PropTypes.number,
      description: PropTypes.string,
    }),
  }).isRequired,
};

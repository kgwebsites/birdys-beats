import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, graphql, StaticQuery } from 'gatsby';
import PreviewCompatibleImage from '../PreviewCompatibleImage/PreviewCompatibleImage';
import AddItemNotificationContext from '../../context/AddItemNotificationProvider';
import * as styles from './BeatRoll.module.css';
import Button from '../Button/Button';

export const BeatRollTemplate = ({ data }) => {
  const { edges: beats } = data.allMarkdownRemark;

  const ctxAddItemNotification = useContext(AddItemNotificationContext);
  const showNotification = ctxAddItemNotification.showNotification;

  return (
    <div className={styles.beatroll}>
      {beats &&
        beats.map(({ node: beat }) => (
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
                          beat.frontmatter.image.childImageSharp.gatsbyImageData
                            .width,
                        height:
                          beat.frontmatter.image.childImageSharp.gatsbyImageData
                            .height,
                      }}
                    />
                    <p className={styles.previewText}>PREVIEW</p>
                    <audio className={styles.audio} controls>
                      <source
                        src={beat.frontmatter.preview_beat}
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
                <p className={styles.description}>
                  {beat.frontmatter.description}
                </p>
                <Button onClick={showNotification} fullWidth level={'primary'}>
                  Add to Cart
                </Button>
              </header>
            </article>
          </div>
        ))}
    </div>
  );
};

BeatRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default function BeatRoll() {
  return (
    <StaticQuery
      query={graphql`
        query BeatRollQuery {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { templateKey: { eq: "beat" } } }
          ) {
            edges {
              node {
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  description
                  templateKey
                  featuredbeat
                  preview_beat
                  image {
                    childImageSharp {
                      gatsbyImageData(quality: 100, layout: FULL_WIDTH)
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={(data, count) => <BeatRollTemplate data={data} count={count} />}
    />
  );
}

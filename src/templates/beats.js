import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Beat from '../components/Beat/Beat';
import Layout from '../components/Layout/Layout';

const BeatsPage = ({ data }) => {
  const {
    allMarkdownRemark: { edges: beats },
  } = data;
  return (
    <Layout>
      <section className="section">
        <div className="container">
          <div className="content">
            {beats &&
              beats.map(({ node: beat }) => <Beat key={beat.id} beat={beat} />)}
          </div>
        </div>
      </section>
    </Layout>
  );
};

BeatsPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default BeatsPage;

export const pageQuery = graphql`
  query BeatPageQuery {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
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
`;

import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Beat from '../components/Beat/Beat';

const BeatPage = ({ data }) => {
  const { markdownRemark: beat } = data;

  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Beat beat={beat} />
      </div>
    </Layout>
  );
};

BeatPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default BeatPage;

export const pageQuery = graphql`
  query BeatByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
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
`;

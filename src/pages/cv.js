import React from 'react';
import { Link, graphql } from 'gatsby';
import 'prismjs/themes/prism-okaidia.css';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm, scale } from '../utils/typography';

class CV extends React.Component {
	render() {
		const post = this.props.data.markdownRemark;
		const siteTitle = this.props.data.site.siteMetadata.title;
		const { previous, next } = this.props.pageContext;

		return (
			<Layout location={this.props.location} title={siteTitle}>
				<SEO title={post.frontmatter.title} description={post.excerpt} />
				<h1 style={{ color: `rgba(107,187,233,1)` }}>{post.frontmatter.title}</h1>
				{!post.frontmatter.sticky && (
					<p
						style={{
							...scale(-1 / 5),
							display: `block`,
							marginBottom: rhythm(1)
						}}
					>
						{post.frontmatter.date}
					</p>
				)}
				<div dangerouslySetInnerHTML={{ __html: post.html }} />
				<hr
					style={{
						marginBottom: rhythm(1)
					}}
				/>
				<Bio />
			</Layout>
		);
	}
}

export default CV;

export const pageQuery = graphql`
	query CV {
		site {
			siteMetadata {
				title
				author
			}
		}
		markdownRemark(frontmatter: { category: { eq: "cv" } }) {
			id
			excerpt(pruneLength: 160)
			html
			frontmatter {
				title
				date(formatString: "MMMM DD, YYYY")
				sticky
			}
		}
	}
`;

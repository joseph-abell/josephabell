import React, { Fragment } from 'react';
import { Link, graphql } from 'gatsby';
import './index.css';
import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

const Tag = ({ tag, index }) => (
	<Fragment>
		{index !== 0 && <Fragment>, </Fragment>}
		<Fragment>{tag} </Fragment>
	</Fragment>
);

const Post = ({ node }) => {
	const title = node.frontmatter.title || node.fields.slug;
	const tags = (node.frontmatter.tags || '').split(', ');

	return (
		<div key={node.fields.slug}>
			<h3
				style={{
					marginBottom: rhythm(1 / 4),
					marginTop: 0
				}}
			>
				<Link style={{ boxShadow: `none`, color: `rgba(107,187,233,1)` }} to={node.fields.slug}>
					{title}
				</Link>
			</h3>
			<small>
				{node.frontmatter.sticky === false && node.frontmatter.date}
				{tags[0].length > 0 &&
				!node.frontmatter.sticky && (
					<Fragment>
						{' - '}
						{tags.map((tag, index) => <Tag tag={tag} key={tag} index={index} />)}
					</Fragment>
				)}
			</small>
			<p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
		</div>
	);
};

class BlogIndex extends React.Component {
	render() {
		const { data } = this.props;
		const siteTitle = data.site.siteMetadata.title;
		const blogPosts = data.allMarkdownRemark && data.allMarkdownRemark.edges;

		return (
			<Layout location={this.props.location} title={siteTitle}>
				<SEO title='Music' />
				{blogPosts &&
				blogPosts.length > 0 && (
					<Fragment>
						<h2>Music</h2>
						{blogPosts.filter(({ node }) => node.frontmatter.sticky).map(({ node }) => {
							return <Post node={node} key={node.fields.slug} sticky={true} />;
						})}
						{blogPosts.filter(({ node }) => !node.frontmatter.sticky).map(({ node }) => {
							return <Post node={node} key={node.fields.slug} />;
						})}
					</Fragment>
				)}
				<Bio />
			</Layout>
		);
	}
}

export default BlogIndex;

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}
		allMarkdownRemark(
			filter: { frontmatter: { category: { eq: "music" } } }
			sort: { fields: [frontmatter___date], order: DESC }
		) {
			edges {
				node {
					excerpt
					fields {
						slug
					}
					frontmatter {
						date(formatString: "MMMM DD, YYYY")
						title
						tags
						sticky
						category
					}
				}
			}
		}
	}
`;

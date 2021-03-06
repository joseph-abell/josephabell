import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

import { rhythm } from '../utils/typography';

function Bio() {
	return (
		<StaticQuery
			query={bioQuery}
			render={(data) => {
				const { author } = data.site.siteMetadata;
				return (
					<div
						style={{
							display: `flex`,
							marginBottom: rhythm(0.5)
						}}
					>
						<Image
							fixed={data.avatar.childImageSharp.fixed}
							alt={author}
							style={{
								marginRight: rhythm(1 / 2),
								marginBottom: 0,
								minWidth: 64,
								minHeight: 64,
								borderRadius: `100%`
							}}
							imgStyle={{
								borderRadius: `50%`
							}}
						/>
						<p>
							<strong>{author}</strong> is a Ukulele playing Web Dev from York, UK. He blogs to help
							remind him about things he has learned.
						</p>
					</div>
				);
			}}
		/>
	);
}

const bioQuery = graphql`
	query BioQuery {
		avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
			childImageSharp {
				fixed(width: 63, height: 63) {
					...GatsbyImageSharpFixed
				}
			}
		}
		site {
			siteMetadata {
				author
			}
		}
	}
`;

export default Bio;

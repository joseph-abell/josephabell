import React, { Fragment } from 'react';
import { Link } from 'gatsby';

import { rhythm, scale } from '../utils/typography';

class Layout extends React.Component {
	render() {
		const { location, title, children } = this.props;
		const rootPath = `${__PATH_PREFIX__}/`;
		let header;

		if (location.pathname === rootPath) {
			header = (
				<Fragment>
					<h1
						style={{
							...scale(1.5),
							marginBottom: rhythm(1),
							marginTop: 0,
							width: `255px`,
							float: `left`
						}}
					>
						<Link
							style={{
								boxShadow: `none`,
								textDecoration: `none`,
								color: `rgba(107,187,233,1)`
							}}
							to={`/`}
						>
							{title}
						</Link>
					</h1>
					<nav>
						<ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
							<li
								style={{
									display: 'inline-block',
									marginTop: '38px',
									fontFamily: `'Rosario',sans-serif`,
									marginRight: '20px'
								}}
							>
								<Link to='/cv'>CV</Link>
							</li>
							<li
								style={{
									display: 'inline-block',
									marginTop: '38px',
									fontFamily: `'Rosario',sans-serif`,
									marginRight: '20px'
								}}
							>
								<Link to='/web-dev'>Web Dev</Link>
							</li>
							<li
								style={{
									display: 'inline-block',
									marginTop: '38px',
									fontFamily: `'Rosario',sans-serif`,
									marginRight: '20px'
								}}
							>
								<Link to='/music'>Music</Link>
							</li>
						</ul>
					</nav>
					<div style={{ clear: 'both' }} />
				</Fragment>
			);
		} else {
			header = (
				<Fragment>
					<Link
						style={{
							boxShadow: `none`,
							textDecoration: `none`,
							color: `rgb(107,187,233)`,
							...scale(0.7),
							fontFamily: `'Rosario', sans-serif`,
							float: 'left',
							width: '150px'
						}}
						to={`/`}
					>
						{title}
					</Link>
					<nav>
						<ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
							<li
								style={{
									display: 'inline-block',
									marginTop: '13px',
									fontFamily: `'Rosario',sans-serif`,
									marginRight: '20px'
								}}
							>
								<Link to='/cv'>CV</Link>
							</li>
							<li
								style={{
									display: 'inline-block',
									marginTop: '13px',
									fontFamily: `'Rosario',sans-serif`,
									marginRight: '20px'
								}}
							>
								<Link to='/web-dev'>Web Dev</Link>
							</li>
							<li
								style={{
									display: 'inline-block',
									marginTop: '13px',
									fontFamily: `'Rosario',sans-serif`,
									marginRight: '20px'
								}}
							>
								<Link to='/music'>Music</Link>
							</li>
						</ul>
					</nav>
				</Fragment>
			);
		}
		return (
			<div
				style={{
					marginLeft: `auto`,
					marginRight: `auto`,
					maxWidth: rhythm(24),
					padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`
				}}
			>
				<header>{header}</header>
				<main>{children}</main>
			</div>
		);
	}
}

export default Layout;

import React from 'react';
import {Link} from 'gatsby';

import {rhythm, scale} from '../utils/typography';

class Layout extends React.Component {
  render() {
    const {location, title, children} = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;
    let header;

    if (location.pathname === rootPath) {
      header = (
        <>
          <h1
            style={{
              ...scale(1.5),
              marginBottom: rhythm(1),
              marginTop: 0,
              width: `330px`,
            }}>
            <Link
              style={{
                boxShadow: `none`,
                textDecoration: `none`,
                color: `rgba(107,187,233,1)`,
              }}
              to={`/`}>
              {title}
            </Link>
          </h1>
        </>
      );
    } else {
      header = (
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `rgb(107,187,233)`,
            ...scale(0.7),
            fontFamily: `'Rosario', sans-serif`,
          }}
          to={`/`}>
          {title}
        </Link>
      );
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}>
        <header>{header}</header>
        <main>{children}</main>
      </div>
    );
  }
}

export default Layout;

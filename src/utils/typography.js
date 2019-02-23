import Typography from 'typography';
import Theme from 'typography-theme-twin-peaks';

Theme.overrideThemeStyles = () => {
  return {
    h1: {
      color: `rgba(107,187,233,1)`,
    },
    h2: {
      color: `rgba(107,187,233,1)`,
    },
    h3: {
      color: `rgba(107,187,233,1)`,
    },
    a: {
      color: `rgba(107,187,233,0.8)`,
      backgroundImage: `none`,
      textShadow: `#333`,
    },
    blockquote: {
      borderLeft: `0.28rem solid rgba(107,187,233,0.8)`,
    },
    html: {
      background: `#000`,
      height: `100%`,
    },
    body: {
      background: `rgba(178, 102, 0, 0.15)`,
      color: `rgba(255, 255, 255, 0.7)`,
      minHeight: `100%`,
    },
  };
};

const typography = new Typography(Theme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;

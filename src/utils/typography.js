import Typography from 'typography';
import Theme from 'typography-theme-twin-peaks';

Theme.overrideThemeStyles = () => {
  return {
    a: {
      color: `rgb(107,187,233)`,
      backgroundImage: `none`,
    },
    blockquote: {
      borderLeft: `0.28rem solid rgb(107,187,233)`,
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

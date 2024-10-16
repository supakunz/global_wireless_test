import scrollbar from '../styles/scrollbar';
import echart from '../styles/echart';

const CssBaseline = {
  styleOverrides: (theme) => ({
    body: {
      fontVariantLigatures: 'none',
      ...scrollbar(theme),
    },
    ...echart(),
  }),
};

export default CssBaseline;

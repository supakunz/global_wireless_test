const Paper = {
  defaultProps: {
    elevation: 0,
  },
  styleOverrides: {
    elevation0: ({ theme }) => ({
      borderRadius: theme.shape.borderRadius * 3.5,
    }),
  },
};

export default Paper;

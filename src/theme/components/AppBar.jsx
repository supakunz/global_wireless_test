const AppBar = {
  styleOverrides: {
    colorPrimary: ({ theme }) => ({
      color: theme.palette.neutral.main,
      backgroundColor: theme.palette.background.default,
      borderRadius: 0,
    }),
  },
};

export default AppBar;

const Toolbar = {
  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(0, 3),
    }),

    gutters: ({ theme }) => ({
      padding: theme.spacing(0, 2),
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(0, 2),
      },
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(0, 3.875),
      },
    }),
  },
};

export default Toolbar;

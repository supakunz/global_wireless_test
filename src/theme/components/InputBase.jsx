const InputBase = {
  styleOverrides: {
    inputAdornedStart: ({ theme }) => ({
      paddingTop: `${theme.spacing(0.5)} !important`,
    }),

    inputHiddenLabel: ({ theme }) => ({
      paddingTop: `${theme.spacing(1.5)} !important`,
      paddingBottom: `${theme.spacing(1.5)} !important`,
    }),
  },
};

export default InputBase;

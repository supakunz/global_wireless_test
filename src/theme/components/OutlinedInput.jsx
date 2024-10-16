const OutlinedInput = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: theme.shape.borderRadius * 2.5,
    }),
    input: ({ theme }) => ({
      fontWeight: theme.typography.fontWeightRegular,
      lineHeight: 1.301,
      color: theme.palette.grey[400],
    }),
  },
};

export default OutlinedInput;

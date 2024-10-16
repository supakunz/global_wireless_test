const ListItemText = {
  defaultProps: { disableTypography: true },
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.palette.grey[700],
      margin: 0,
      fontSize: theme.typography.fontSize,
      fontWeight: theme.typography.fontWeightMedium,
    }),
  },
};

export default ListItemText;

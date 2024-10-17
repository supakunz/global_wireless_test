import { TextField } from '@mui/material';
import Search from '../icons/common/Search';

const SearchFilter = ({ apiRef }) => {
  const handleFilter = (event) => {
    const value = event.target.value;
    const searchText = value.toLowerCase();
    apiRef.current.setQuickFilterValues([searchText]);
  };

  return (
    <TextField
      InputProps={{
        startAdornment: <Search fontSize="small" sx={{ mr: 1, color: 'neutral.main' }} />,
      }}
      type="search"
      variant="filled"
      placeholder="Search..."
      onChange={handleFilter}
      size="small"
    />
  );
};

export default SearchFilter;

import React, { useState } from 'react';
import styles from './searchSortWidget.module.css';
import TextField from '@mui/material/TextField';
import { Select, Box, FormControl, InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';

const SearchSortWidget = ({ setInput }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);

  const handleInputChange = (e) => {
    e.preventDefault();
    const newValue = e.target.value;

    clearTimeout(timeoutId);

    const newTimeoutId = setTimeout(() => {
      setInput(newValue);
    }, 1000);

    setTimeoutId(newTimeoutId);
    setSearchText(newValue);
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    setSearchText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <div className={styles.root}>
      <form
        style={{ width: '70%', display: 'flex', alignItems: 'center' }}
        noValidate
        autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Введите название цену или бренд"
          variant="outlined"
          fullWidth
          value={searchText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {/* <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedOption}
          onChange={handleSelectChange}>
          <MenuItem value={'Ten'}>Ten</MenuItem>
          <MenuItem value={'Twenty'}>Twenty</MenuItem>
          <MenuItem value={'Thirty'}>Thirty</MenuItem>
        </Select> */}
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Бренды</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedOption}
              onChange={handleSelectChange}>
              <MenuItem value={'Ten'}>Ten</MenuItem>
              <MenuItem value={'Twenty'}>Twenty</MenuItem>
              <MenuItem value={'Thirty'}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </form>
    </div>
  );
};

SearchSortWidget.propTypes = {
  setInput: PropTypes.func.isRequired
};

export default SearchSortWidget;

import React, { useEffect, useState } from 'react';
import styles from './searchSortWidget.module.css';
import TextField from '@mui/material/TextField';
import { Select, Box, FormControl, InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';
import postAPIValantis from '../../api/postAPIValantis';

const SearchSortWidget = ({ setInput }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);
  const [brands, setBrands] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const params = { field: 'brand' };
      const ids = await postAPIValantis('get_fields', params);
      // const filtredIds = ids.result.filter((item) => item !== null);
      const filtredIds = ids.result.reduce((acc, item) => {
        return item !== null && !acc.includes(item) ? [...acc, item] : acc;
      }, []);
      setBrands(filtredIds);
    };
    fetchData();
  }, []);

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
    console.log('e.target.value!!!', e.target.value);
    setSearchText(e.target.value);
    setInput(e.target.value);
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
          style={{ marginRight: 5 }}
          id="outlined-basic"
          label="Введите название цену или бренд"
          variant="outlined"
          fullWidth
          value={searchText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Бренды</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedOption}
              label="Бренды"
              onChange={handleSelectChange}>
              {brands &&
                brands.map((brand, index) => (
                  <MenuItem key={index} value={brand}>
                    {brand}
                  </MenuItem>
                ))}
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

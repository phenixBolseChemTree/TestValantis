import React, { useState } from 'react';
import styles from './searchSortWidget.module.css';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

const SearchSortWidget = ({ setInput }) => {
  const [searchText, setSearchText] = useState('');
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <div className={styles.root}>
      <form style={{ width: '85%' }} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Введите название цену или бренд"
          variant="outlined"
          fullWidth
          value={searchText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </form>
    </div>
  );
};

SearchSortWidget.propTypes = {
  setInput: PropTypes.func.isRequired
};

export default SearchSortWidget;

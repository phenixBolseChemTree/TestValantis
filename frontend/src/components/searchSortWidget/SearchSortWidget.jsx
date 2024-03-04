import React, { useState } from 'react';
import styles from './searchSortWidget.module.css';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

const SearchSortWidget = ({ setInput }) => {
  const [searchText, setSearchText] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);

  const handleInputChange = (e) => {
    const newValue = e.target.value;

    clearTimeout(timeoutId);

    // Установка задержки в 1000 миллисекунд (1 секунда)
    const newTimeoutId = setTimeout(() => {
      setInput(newValue);
    }, 1000);

    setTimeoutId(newTimeoutId);
    setSearchText(newValue);
  };

  return (
    <div className={styles.root}>
      <form style={{ width: '85%' }} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Введите название товара"
          variant="outlined"
          fullWidth
          value={searchText}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};

SearchSortWidget.propTypes = {
  setInput: PropTypes.func.isRequired
};

export default SearchSortWidget;

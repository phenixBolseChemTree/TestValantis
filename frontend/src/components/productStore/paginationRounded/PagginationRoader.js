import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import styles from './paginationRounded.module.css';

const PaginationRounded = ({ setActivePage, activePage }) => {
  const handleChange = (event, value) => {
    console.log('activePage! ', activePage);
    // console.log('setActivePage! ', setActivePage);
    // нужно делать проверку что текущее нажатие не совпадает с текущей страницей
    setActivePage(value);
    // console.log('event!: ', event);
    // console.log('value!: ', value);
  };

  return (
    <div className={styles.root123}>
      <Stack spacing={2}>
        <Pagination onChange={handleChange} count={220} variant="outlined" shape="rounded" />
      </Stack>
    </div>
  );
};

PaginationRounded.propTypes = {
  setActivePage: PropTypes.func.isRequired,
  activePage: PropTypes.any
};

export default PaginationRounded;

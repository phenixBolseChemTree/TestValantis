import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import styles from './paginationRounded.module.css';

const PaginationRounded = ({ setActivePage, activePage, loading }) => {
  // const count = loading === 'items' ? 161 : 10;
  const count = 161;
  // console.log('loading!!!', loading);
  const handleChange = (event, value) => {
    if (activePage !== value || !loading) {
      window.scrollTo({ top: 0 });
      setActivePage(value);
    }
  };

  return (
    <div className={styles.root123}>
      <Stack spacing={2}>
        <Pagination
          disabled={loading}
          onChange={handleChange}
          count={count}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </div>
  );
};

PaginationRounded.propTypes = {
  setActivePage: PropTypes.func.isRequired,
  activePage: PropTypes.any,
  loading: PropTypes.any
};

export default PaginationRounded;

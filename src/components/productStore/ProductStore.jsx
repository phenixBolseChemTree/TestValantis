import styles from './productStore.module.css';
import Box from '@mui/material/Box';
import { PropTypes } from 'prop-types';
import Grid from '@mui/material/Grid';
import ProductCard from '../productCard';
import PaginationRounded from './paginationRounded';

const ProductStore = ({
  items,
  setItems,
  setActivePage,
  activePage,
  loading,
  input,
  countPages
}) => {
  return (
    <div className={styles.root}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {items.map((item, index) => (
            <Grid item xs={2} sm={4} md={3} key={index}>
              <ProductCard loading={loading} item={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
      {items.length > 0 && (
        <PaginationRounded
          countPages={countPages}
          input={input}
          setItems={setItems}
          setActivePage={setActivePage}
          activePage={activePage}
          loading={loading}
        />
      )}
    </div>
  );
};

const ItemPropTypes = PropTypes.shape({
  brand: PropTypes.string,
  id: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  product: PropTypes.string.isRequired
});

ProductStore.propTypes = {
  items: PropTypes.arrayOf(ItemPropTypes.isRequired).isRequired,
  input: PropTypes.string,
  activePage: PropTypes.number,
  setItems: PropTypes.func.isRequired,
  setActivePage: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  setLoading: PropTypes.func.isRequired,
  countPages: PropTypes.number
};

export default ProductStore;

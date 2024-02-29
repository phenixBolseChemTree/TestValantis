import styles from './productStore.module.css';
import Box from '@mui/material/Box';
import { PropTypes } from 'prop-types';
import Grid from '@mui/material/Grid';
import ProductCard from '../productCard/ProductCard';
import PaginationRounded from './paginationRounded';
import loadingImg from '../../img/loading.gif';

const ProductStore = ({ items, setItems, setActivePage, activePage }) => {
  return (
    <div className={styles.root}>
      {items.length === 0 && <img style={{ width: '70px' }} src={loadingImg} alt="loading" />}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {items.map((item, index) => (
            <Grid item xs={2} sm={4} md={3} key={index}>
              <ProductCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
      {items.length > 0 && (
        <PaginationRounded
          setItems={setItems}
          setActivePage={setActivePage}
          activePage={activePage}
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
  activePage: PropTypes.any,
  setItems: PropTypes.func.isRequired,
  setActivePage: PropTypes.func.isRequired
};

export default ProductStore;

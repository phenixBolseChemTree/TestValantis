import styles from './productStore.module.css';
// import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { PropTypes } from 'prop-types';
// import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ProductCard from '../productCard/ProductCard';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(2),
//   textAlign: 'center',
//   color: theme.palette.text.secondary
// }));

const ProductStore = ({ items }) => {
  return (
    <div className={styles.root}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {items.map((item, index) => (
            <Grid item xs={2} sm={4} md={3} key={index}>
              {/* <Item>{item.product}</Item> */}
              <ProductCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

const ItemPropTypes = PropTypes.shape({
  brand: PropTypes.string, // Предполагается, что brand может быть строкой или null
  id: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  product: PropTypes.string.isRequired
});

ProductStore.propTypes = {
  items: PropTypes.arrayOf(ItemPropTypes.isRequired).isRequired
};

export default ProductStore;

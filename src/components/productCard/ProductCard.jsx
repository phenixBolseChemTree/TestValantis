import PropTypes from 'prop-types';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const ProductCard = ({ item, loading }) => {
  return (
    <Card sx={{ minWidth: 150, height: '200px' }}>
      {!loading && (
        <CardContent>
          <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
            {item.id}
          </Typography>
          <Typography sx={{ fontSize: 14 }} component="div">
            {item.product}
          </Typography>
          <Typography sx={{ fontSize: 14, color: 'brown' }} component="div">
            {item.brand}
          </Typography>
          <Typography variant="subtitle1">{item.price}</Typography>
        </CardContent>
      )}
    </Card>
  );
};

ProductCard.propTypes = {
  item: PropTypes.shape({
    brand: PropTypes.string,
    id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    product: PropTypes.string.isRequired
  }).isRequired,
  loading: PropTypes.bool
};

export default ProductCard;

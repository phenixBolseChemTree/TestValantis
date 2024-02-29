import PropTypes from 'prop-types';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const ProductCard = ({ item }) => {
  return (
    <Card sx={{ minWidth: 150, height: '200px' }}>
      <CardContent>
        <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
          {item.id}
        </Typography>
        <Typography sx={{ fontSize: 20 }} component="div">
          {item.product}
        </Typography>
        <Typography variant="subtitle1">{item.price}</Typography>
      </CardContent>
    </Card>
  );
};

ProductCard.propTypes = {
  item: PropTypes.shape({
    brand: PropTypes.string,
    id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    product: PropTypes.string.isRequired
  }).isRequired
};

export default ProductCard;

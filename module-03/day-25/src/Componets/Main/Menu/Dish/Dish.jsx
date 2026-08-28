import React from 'react';
import PropTypes from 'prop-types';

function Dish({ name, price, currency = "Birr", spicy }) {
  return (
    <div>
      <h3>
        {name} {Boolean(spicy) && <span>🌶️ Spicy</span>}
      </h3>
      <p>Price: {price} {currency}</p>
    </div>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string,
  spicy: PropTypes.bool
};

export default Dish;
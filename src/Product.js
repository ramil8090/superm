import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Button from "./Button.js";
import { addProduct, removeProduct } from "./store.js";

export default function Product(props) {
  const { details } = props;
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  const productFromCart = cart.find(
    (product) => product.id === details.id
  );
  const quantity = productFromCart ? productFromCart.quantity : 0;

  const onAddProduct = (product) => {
    dispatch(addProduct(product));
  };

  const onRemoveProduct = (product) => {
    dispatch(removeProduct(product));
  };

  return (
    <div className="product">
      <div className="product-image-container">
        <Link to={`/products/${details.id}`}>
          <img
            src={details.image}
            width="100"
            height="100"
            className="product-image"
            alt={details.name}
          />
        </Link>
        {quantity > 0 && (
          <div className="product-quantity-container">
            <div className="product-quantity">{quantity}</div>
          </div>
        )}
      </div>
      <div className="product-info">
        <h3>{details.name}</h3>
        <p>{details.description}</p>
      </div>
      <div className="product-checkout">
        <div>
          {quantity > 0 && (
            <Button
              outline
              onClick={() => { onRemoveProduct(details) }}
              className="product-delete"
            >
              x
            </Button>
          )}
        </div>
        <Button outline onClick={() => onAddProduct(details)}>
          ${details.price}
        </Button>
      </div>
    </div>
  );
}

import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import "../../styles/product-card.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(
      cartActions.addItem({ id: item.id, productName: item.productName, price: item.price, image: item.imgUrl })
    );
    toast.success("product added successfully");
  };
  return (
    <div className="product__item">
      <div className="product__img">
        <motion.img whileHover={{ scale: 0.9 }} src={item.imgUrl} alt={item.productName} />
      </div>
      <div className="p-2 product__info">
        <h3 className="product__name">
          <Link to={`/shop/${item.id}`}>{item.productName}</Link>
        </h3>
        <span>{item.category}</span>
      </div>
      <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
        <span className="price">${item.price}</span>
        <motion.span whileTap={{ scale: 1.2 }} onClick={addToCart}>
          <i className="ri-add-line"></i>
        </motion.span>
      </div>
    </div>
  );
};

export default ProductCard;

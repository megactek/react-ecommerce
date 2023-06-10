import React from "react";
import ProductCard from "./ProductCard";
import { Col } from "reactstrap";

const ProductList = ({ data }) => {
  return (
    <>
      {data?.map((product, index) => (
        <Col lg="3" md="4" key={index} className="mb-2">
          <ProductCard item={product} />
        </Col>
      ))}
    </>
  );
};

export default ProductList;

import React, { useState } from "react";
import { Form, FormGroup, Container, Row, Col } from "reactstrap";
import { toast } from "react-toastify";
import { db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const navigate = useNavigate();
  const [enterTitle, setEnterTitle] = useState("");
  const [enterShortDesc, setEnterShortDesc] = useState("");
  const [enterDescription, setEnterDescription] = useState("");
  const [enterCategory, setEnterCategory] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterProductImage, setEnterProductImage] = useState("");
  const [loading, setLoading] = useState(false);

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    //    ========= add product to firebase database =================

    try {
      const docRef = await collection(db, "products");
      const storageRef = ref(storage, `productImages/${Date.now() + enterProductImage.name}`);
      const uploadTask = uploadBytesResumable(storageRef, enterProductImage);
      uploadTask.on(
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(
            async (downloadURL) =>
              await addDoc(docRef, {
                title: enterTitle,
                shortDesc: enterShortDesc,
                description: enterDescription,
                category: enterCategory,
                price: enterPrice,
                imgUrl: downloadURL,
              })
          );
        }
      );

      setLoading(false);
      toast.success("Product added successfully!");
      navigate("/dashboard/all-products");
    } catch (error) {
      setLoading(false);
      toast.error("Product not added");
    }
  };
  return (
    <section>
      <Container>
        <Row>
          <Col md="12">
            <h4 className="mb-5">Add Products</h4>
            {loading ? (
              <h4 className="mt-10 text-center py-5">Loading...</h4>
            ) : (
              <Form onSubmit={addProduct}>
                <FormGroup className="form__group">
                  <span>Product title</span>
                  <input
                    type="text"
                    placeholder="Double sofa"
                    value={enterTitle}
                    onChange={(e) => setEnterTitle(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <span>Short description</span>
                  <input
                    type="text"
                    placeholder="lorem..."
                    value={enterShortDesc}
                    onChange={(e) => setEnterShortDesc(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <span>Description</span>
                  <input
                    type="text"
                    placeholder="description..."
                    value={enterDescription}
                    onChange={(e) => setEnterDescription(e.target.value)}
                    required
                  />
                </FormGroup>
                <div className="d-flex align-items-center justify-content-between gap-5">
                  <FormGroup className="form__group w-50">
                    <span>Price</span>
                    <input
                      type="number"
                      placeholder="$100"
                      value={enterPrice}
                      onChange={(e) => setEnterPrice(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group w-50">
                    <span>Category</span>
                    <select
                      className="w-100 p-2"
                      value={enterCategory}
                      onChange={(e) => setEnterCategory(e.target.value)}
                    >
                      <option value="chair">Chair</option>
                      <option value="sofa">Sofa</option>
                      <option value="mobile">Mobile</option>
                      <option value="watch">Watch</option>
                      <option value="wireless">Wireless</option>
                    </select>
                  </FormGroup>
                </div>
                <div>
                  <FormGroup className="form__group">
                    <span>Product Image</span>
                    <input type="file" onChange={(e) => setEnterProductImage(e.target.files[0])} required />
                  </FormGroup>
                </div>
                <button className="shop__btn" type="submit">
                  Add Product
                </button>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;

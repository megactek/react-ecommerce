import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      toast.success("Success login");
      navigate("/checkout");
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };
  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              {loading ? (
                <Col lg="12" className="text-center">
                  <h5 className="fw-bold">loading...</h5>
                </Col>
              ) : (
                <>
                  <h3 className="fw-bold fs-4 mb-4">Login</h3>
                  <Form className="auth__form" onSubmit={signIn}>
                    <FormGroup className="form__group">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup className="form__group">
                      <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </FormGroup>
                    <button type="submit" className="shop__btn auth__btn w-100">
                      Login
                    </button>
                    <p>
                      Don't have an account?{"  "}
                      <Link to="/signup">Create an account</Link>
                    </p>
                  </Form>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;

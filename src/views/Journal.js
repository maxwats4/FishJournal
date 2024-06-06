import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
//import FileUpload from "/project/FlyJournal/src/components/Functions/FileUpload.js";
import "assets/css/FileUpload.css";
import JournalView from "components/Features/JournalView.js";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  ListGroup,
  form,
} from "react-bootstrap";

function Journal() {
  /**
   * Functions for uploading & dropping documents
   *
   */
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleFileChange = (e) => {
    setFiles((prevFiles) => [...prevFiles, ...e.target.files]);
  };

  const handleRemoveFile = (fileToRemove) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    // Example: sending form data to the server using fetch
    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Journal</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="8">
                      <Form.Group>
                        <label>Location Name</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Location Name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-3" md="4">
                      <Form.Group>
                        <label>Date</label>
                        <Form.Control
                          defaultValue="michael23"
                          placeholder="Username"
                          type="date"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Flies Used</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Flies Used"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label># Of Fish Caught</label>
                        <Form.Control
                          defaultValue="0"
                          placeholder="0"
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Address</label>
                        <Form.Control
                          defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                          placeholder="Home Address"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>City</label>
                        <Form.Control
                          defaultValue="Mike"
                          placeholder="City"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Country</label>
                        <Form.Control
                          defaultValue="Andrew"
                          placeholder="Country"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Postal Code</label>
                        <Form.Control
                          placeholder="ZIP Code"
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row> */}
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Notes</label>
                        <Form.Control
                          cols="80"
                          placeholder="Enter Fishing Notes Here."
                          rows="4"
                          as="textarea"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* File Drop Section*/}
                  <Container>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload Profile Pictures</Form.Label>
                        <div
                          {...getRootProps({ className: "dropzone" })}
                          style={dropzoneStyle}
                        >
                          <input {...getInputProps()} />
                          {isDragActive ? (
                            <p>Drop the files here...</p>
                          ) : (
                            <p>
                              Drag 'n' drop some files here, or click to select
                              files
                            </p>
                          )}
                        </div>
                        <Form.Control
                          type="file"
                          onChange={handleFileChange}
                          multiple
                          className="mt-3"
                        />
                        {files.length > 0 && (
                          <ListGroup className="mt-3">
                            {files.map((file, index) => (
                              <ListGroup.Item key={index}>
                                {file.name}
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => handleRemoveFile(file)}
                                  className="float-end"
                                >
                                  Remove
                                </Button>
                              </ListGroup.Item>
                            ))}
                          </ListGroup>
                        )}
                      </Form.Group>
                      <Button
                        variant="primary"
                        type="submit"
                        className="remove-files-button"
                      >
                        Save
                      </Button>
                    </Form>
                  </Container>
                  {/* <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Submit
                  </Button> */}
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/faces/face-3.jpg")}
                    ></img>
                    <h5 className="title">Mike Andrew</h5>
                  </a>
                  <p className="description">michael24</p>
                </div>
                <p className="description text-center">
                  "Lamborghini Mercy <br></br>
                  Your chick she so thirsty <br></br>
                  I'm in that two seat Lambo"
                </p>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container>
        <JournalView />
      </Container>
    </>
  );
}

const dropzoneStyle = {
  border: "2px dashed #007bff",
  borderRadius: "5px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

export default Journal;

import React, { useState } from "react";
import {
  Container,
  Card,
  Button,
  Form,
  Toast,
  Row,
  Col,
} from "react-bootstrap";
import { FaTrash, FaDownload, FaPlus } from "react-icons/fa";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState("Type 1");
  const [showToast, setShowToast] = useState(false);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && uploadedFile.size <= 10 * 1024 * 1024) {
      setFile(uploadedFile);
    } else {
      alert("File size exceeds the 10MB limit.");
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const clearInputs = () => {
    setTitle("");
    setDescription("");
    setLink("");
    setType("Type 1");
  };

  const handleSubmit = () => {
    setShowToast(true);
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center min-vw-100"
    >
      <Row className="w-100">
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <Card className="p-4 shadow-lg">
            <div
              className="border border-dashed p-4 text-center rounded bg-light"
              style={{ cursor: "pointer" }}
            >
              <Form.Group>
                <Form.Label className="d-block">
                  <FaPlus size={28} className="text-secondary" />
                  <div className="mt-2 text-secondary">
                    Drag & drop or click to upload
                  </div>
                  <div className="text-muted small">Max file size: 10 MB</div>
                </Form.Label>
                <Form.Control
                  type="file"
                  className="d-none"
                  onChange={handleFileChange}
                />
              </Form.Group>
            </div>

            {file && (
              <div className="d-flex align-items-center justify-content-between border p-3 mt-3 rounded bg-white">
                <div>
                  <span className="fw-bold">{file.name}</span>
                  <span className="text-muted small">
                    {" "}
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <div>
                  <Button variant="link" className="text-primary me-2">
                    <FaDownload />
                  </Button>
                  <Button
                    variant="link"
                    className="text-danger"
                    onClick={removeFile}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </div>
            )}

            {file && (
              <Button
                variant="outline-danger"
                className="mt-3 w-100"
                onClick={removeFile}
              >
                Remove File
              </Button>
            )}

            <Form className="mt-4">
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Link</Form.Label>
                <Form.Control
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Section</Form.Label>
                <Form.Select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option>Home </option>
                  <option>Talks , Workshop & Conferences </option>
                  <option>Management Shots</option>
                  <option>Awards and Recognitions</option>
                  <option>Interviews </option>
                </Form.Select>
              </Form.Group>
            </Form>

            <div className="d-flex justify-content-between mt-3">
              <Button variant="secondary" onClick={clearInputs}>
                Clear
              </Button>
              <Button variant="success" onClick={handleSubmit}>
                Submit
              </Button>
              <Button variant="info">View</Button>
            </div>
          </Card>

          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={3000}
            autohide
            className="mt-3"
          >
            <Toast.Body>Submitted Successfully!</Toast.Body>
          </Toast>
        </Col>
      </Row>
    </Container>
  );
};

export default UploadForm;

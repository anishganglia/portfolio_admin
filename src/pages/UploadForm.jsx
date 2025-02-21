import React, { useState } from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const UploadForm = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [section, setSection] = useState("A");
  const [description, setDescription] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setImages([...images, ...imageUrls]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleClear = () => {
    setTitle("");
    setLink("");
    setSection("A");
    setDescription("");
    setImages([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleView = () => {
    navigate("/view");
  };

  return (
    <Container className="mt-4 p-4 border rounded text-dark mx-auto d-flex flex-column align-items-center" style={{ maxWidth: "800px", minWidth: "600px", backgroundColor: "#f8f9fa" }}>
      {showAlert && <Alert variant="success" className="text-center">Submission Successful!</Alert>}
      
      <Row className="justify-content-center w-100">
        <Col xs={12} md={10} className="d-flex flex-column align-items-center">
          {/* Upload Section */}
          <div className="mb-3 border p-4 text-center bg-light text-dark rounded" style={{ maxWidth: "700px", minWidth: "500px", borderStyle: "dashed" }}>
            <input type="file" onChange={handleImageUpload} accept="image/*" hidden id="upload" multiple />
            <label htmlFor="upload" className="d-block" style={{ cursor: "pointer" }}>
              <img src="https://cdn-icons-png.flaticon.com/512/126/126477.png" alt="upload-icon" width="40" height="40" />
              <p className="mb-1">Choose files or drag & drop them here [ max 2 images ]</p>
              <small className="text-muted">JPEG, PNG, PDG, and MP4 formats, up to 50MB</small>
            </label>
          </div>
          
          {/* Display Section */}
          <div className="d-flex flex-wrap justify-content-center">
            {images.map((image, index) => (
              <div key={index} className="m-2 border p-2 position-relative bg-light text-dark rounded" style={{ maxWidth: "150px", minWidth: "100px" }}>
                <img src={image} alt={`Uploaded ${index}`} className="img-fluid" />
                <button className="btn btn-danger btn-sm position-absolute top-0 end-0" onClick={() => handleRemoveImage(index)}>X</button>
              </div>
            ))}
          </div>
          
          {/* Form Section */}
          <Form className="border p-3 rounded bg-light text-dark d-flex flex-column align-items-center" onSubmit={handleSubmit} style={{ maxWidth: "700px", minWidth: "500px" }}>
            <Form.Group className="mb-3 w-100">
              <Form.Label><b>Title</b></Form.Label>
              <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
            
            <Form.Group className="mb-3 w-100">
              <Form.Label><b>Link</b></Form.Label>
              <Form.Control type="text" value={link} onChange={(e) => setLink(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3 w-100">
              <Form.Label><b>Section</b></Form.Label>
              <Form.Select value={section} onChange={(e) => setSection(e.target.value)}>
                  <option value="Home">Home</option>
                  <option>Talks, Workshop & Conferences</option>
                  <option>Management Shots</option>
                  <option>Awards and Recognitions</option>
                  <option>Interviews</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3 w-100">
              <Form.Label><b>Description</b></Form.Label>
              <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>

            {/* Buttons */}
            <div className="d-flex gap-2 justify-content-center">
              <Button variant="secondary" onClick={handleClear}>Clear</Button>
              <Button variant="success" type="submit">Submit</Button>
              <Button variant="info" onClick={handleView}>View</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UploadForm;

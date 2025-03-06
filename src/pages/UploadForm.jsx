import React, { useState } from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const UploadForm = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [section, setSection] = useState("Home");
  const [description, setDescription] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const fileObjs = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages([...images, ...fileObjs]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleClear = () => {
    setTitle("");
    setLink("");
    setSection("Home");
    setDescription("");
    setImages([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("link", link);
    formData.append("section", section);
    formData.append("description", description);
    images.forEach((imgObj) => {
      formData.append("images", imgObj.file);
    });

    try {
      const response = await fetch("https://drs-sir-server.onrender.com/api/portfolio", {
        method: "POST",
        headers: {
          "x-api-key": "mySuperSecretKey123",
        },
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Submission successful:", result);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
        handleClear();
      } else {
        console.error("Submission error:", result.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Container className="mt-4 p-4 border rounded text-dark mx-auto d-flex flex-column align-items-center" style={{ maxWidth: "800px", minWidth: "600px", backgroundColor: "#f8f9fa" }}>
      {showAlert && <Alert variant="success" className="text-center">Submission Successful!</Alert>}

      <Row className="justify-content-center w-100">
        <Col xs={12} md={10} className="d-flex flex-column align-items-center">
          <div className="mb-3 border p-4 text-center bg-light text-dark rounded" style={{ maxWidth: "700px", minWidth: "500px", borderStyle: "dashed" }}>
            <input type="file" onChange={handleImageUpload} accept="image/*" hidden id="upload" multiple />
            <label htmlFor="upload" className="d-block" style={{ cursor: "pointer" }}>
              <img src="https://cdn-icons-png.flaticon.com/512/126/126477.png" alt="upload-icon" width="40" height="40" />
              <p className="mb-1">Choose files or drag & drop them here</p>
              <small className="text-muted">JPEG, PNG, and MP4 formats, up to 50MB</small>
            </label>
          </div>

          <div className="d-flex flex-wrap justify-content-center">
            {images.map((imgObj, index) => (
              <div key={index} className="m-2 border p-2 position-relative bg-light text-dark rounded" style={{ maxWidth: "150px", minWidth: "100px" }}>
                <img src={imgObj.preview} alt={`Uploaded ${index}`} className="img-fluid" />
                <button className="btn btn-danger btn-sm position-absolute top-0 end-0" onClick={() => handleRemoveImage(index)}>X</button>
              </div>
            ))}
          </div>

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
                <option value="Talks, Workshop & Conferences">Talks, Workshop & Conferences</option>
                <option value="Management Shots">Management Shots</option>
                <option value="Awards and Recognitions">Awards and Recognitions</option>
                <option value="Interviews">Interviews</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3 w-100">
              <Form.Label><b>Description</b></Form.Label>
              <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>

            <div className="d-flex gap-2 justify-content-center">
              <Button variant="secondary" onClick={handleClear}>Clear</Button>
              <Button variant="success" type="submit">Submit</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UploadForm;

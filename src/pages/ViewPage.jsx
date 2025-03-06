import React, { useState, useEffect } from "react";
import { Container, Card, Button, Modal, Form, Spinner, Alert, Carousel } from "react-bootstrap";
import { FaEdit, FaTrash, FaChevronLeft, FaChevronRight, FaTimes, FaPlus } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const sections = [
  "Home",
  "Talks, Workshop & Conferences",
  "Management Shots",
  "Awards and Recognitions",
  "Interviews"
];

const SectionGrid = ({ title, data, onEdit, onDelete }) => {
  return (
    <Container className="mb-5 p-4 bg-white rounded shadow">
      <h2 className="text-center text-dark mb-4">{title}</h2>
      <div className="d-flex flex-wrap justify-content-center gap-4">
        {data.map((item) => (
          <Card key={item._id} className="shadow-lg border-0" style={{ width: "350px" }}>
            {item.images && item.images.length > 0 ? (
              <Carousel interval={3000} indicators={false} controls={item.images.length > 1}
                prevIcon={<FaChevronLeft size={25} color="#333" style={{ background: "rgba(255,255,255,0.8)", padding: "5px", borderRadius: "50%" }} />}
                nextIcon={<FaChevronRight size={25} color="#333" style={{ background: "rgba(255,255,255,0.8)", padding: "5px", borderRadius: "50%" }} />}
              >
                {item.images.map((img, index) => (
                  <Carousel.Item key={index}>
                    <img className="d-block w-100 rounded-top" src={img} alt={`Slide ${index}`} style={{ height: "220px", objectFit: "cover" }} />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <Card.Img variant="top" src="https://via.placeholder.com/350" className="rounded-top" style={{ height: "220px", objectFit: "cover" }} />
            )}
            <Card.Body className="text-center">
              <Card.Title className="text-dark font-weight-bold">{item.title}</Card.Title>
              <p className="text-muted small">{item.description || "No description available"}</p>
              <div className="d-flex justify-content-between mt-3">
                <Button variant="outline-primary" size="sm" onClick={() => onEdit(item)}>
                  <FaEdit /> Edit
                </Button>
                <Button variant="outline-danger" size="sm" onClick={() => onDelete(item._id)}>
                  <FaTrash /> Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

const ViewPage = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updatedData, setUpdatedData] = useState({ title: "", description: "", link: "", images: [], newImages: [] });

  useEffect(() => {
    fetch("https://drs-sir-server.onrender.com/api/portfolio", {
      headers: { "x-api-key": "mySuperSecretKey123" }
    })
      .then((res) => res.json())
      .then((data) => {
        setAllData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setUpdatedData({
      title: item.title,
      description: item.description,
      link: item.link,
      images: [...item.images], // Preserve existing images
      newImages: []
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    fetch(`https://drs-sir-server.onrender.com/api/portfolio/${id}`, {
      method: "DELETE",
      headers: { "x-api-key": "mySuperSecretKey123" }
    })
      .then(() => {
        setAllData(allData.filter(item => item._id !== id));
      })
      .catch((err) => console.error("Error deleting portfolio:", err));
  };

  const handleRemoveExistingImage = (index) => {
    setUpdatedData((prevState) => {
      const updatedImages = [...prevState.images];
      updatedImages.splice(index, 1);
      return { ...prevState, images: updatedImages };
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedItem) {
      console.error("No item selected for update.");
      return;
    }

    const formData = new FormData();

    // Add only modified fields
    if (updatedData.title !== selectedItem.title) {
      formData.append("title", updatedData.title);
    }
    if (updatedData.description !== selectedItem.description) {
      formData.append("description", updatedData.description);
    }
    if (updatedData.link !== selectedItem.link) {
      formData.append("link", updatedData.link);
    }

    // Remove any base URL and send only the file name
    let cleanedExistingImages = updatedData.images
      .filter((img) => typeof img === "string")
      .map((img) => img.replace(/^.*\/uploads\//, ""));
    console.log("cleanedExistingImages", cleanedExistingImages);
    formData.append("existingImages", JSON.stringify(cleanedExistingImages));

    // Append new images
    updatedData.newImages.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch(`https://drs-sir-server.onrender.com/api/portfolio/${selectedItem._id}`, {
        method: "PUT",
        headers: { "x-api-key": "mySuperSecretKey123" },
        body: formData,
      });

      const updatedItem = await response.json();
      if (response.ok) {
        setAllData((prevData) => prevData.map(item => item._id === updatedItem._id ? updatedItem : item));
        setShowModal(false);
      } else {
        console.error("Error updating portfolio:", updatedItem.error);
      }
    } catch (error) {
      console.error("Error updating portfolio:", error);
    }
  };




  return (
    <Container className="mt-5 p-4">
      {loading && <Spinner animation="border" className="d-block mx-auto" />}
      {error && <Alert variant="danger" className="text-center">Error loading portfolio data.</Alert>}

      {sections.map((section) => (
        <SectionGrid key={section} title={section} data={allData.filter(item => item.section === section)} onEdit={handleEdit} onDelete={handleDelete} />
      ))}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">Edit Portfolio Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <Form onSubmit={handleUpdate}>
              <Form.Group className="mb-3">
                <Form.Label><b>Title</b></Form.Label>
                <Form.Control type="text" value={updatedData.title} onChange={(e) => setUpdatedData({ ...updatedData, title: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label><b>Existing Images</b></Form.Label>
                <div className="d-flex flex-wrap">
                  {updatedData.images.map((img, index) => (
                    typeof img === "string" && (
                      <div key={index} className="position-relative m-2">
                        <img src={img} alt={`Existing ${index}`} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                        <Button variant="danger" size="sm" className="position-absolute top-0 end-0" onClick={() => handleRemoveExistingImage(index)}>
                          <FaTimes />
                        </Button>
                      </div>
                    )
                  ))}
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label><b>Upload New Images</b></Form.Label>
                <Form.Control type="file" multiple onChange={(e) => setUpdatedData({ ...updatedData, newImages: [...Array.from(e.target.files)] })} />
              </Form.Group>
              <Button variant="primary" type="submit">Save Changes</Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ViewPage;

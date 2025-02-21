import React, { useState } from "react";
import { Card, Button, Container, Modal, Form } from "react-bootstrap";
import { FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const sections = [
  "Home",
  "Talks, Workshop & Conferences",
  "Management Shots",
  "Awards and Recognitions",
  "Interviews"
];

const generateData = () =>
  new Array(5).fill(null).map((_, index) => ({
    id: index,
    title: `Item ${index + 1}`,
    image: "https://via.placeholder.com/150",
    description: "Description here",
    link: "https://example.com",
    section: sections[0],
  }));

const ScrollableSection = ({ title }) => {
  const [data, setData] = useState(generateData());
  const [editItem, setEditItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newData, setNewData] = useState({ title: "", image: "", description: "", link: "", section: "" });

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setNewData(item);
    setShowModal(true);
  };

  const handleSave = () => {
    setData(data.map(item => item.id === editItem.id ? { ...item, ...newData } : item));
    setShowModal(false);
  };

  const handleImageSelect = (image) => {
    setNewData({ ...newData, image });
  };

  const scrollContainer = React.createRef();
  const scrollLeft = () => {
    scrollContainer.current.scrollBy({ left: -220, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollContainer.current.scrollBy({ left: 220, behavior: "smooth" });
  };

  return (
    <Container fluid className="py-4 border-bottom bg-light">
      <h4 className="mb-3 text-center">{title}</h4>
      <div className="d-flex align-items-center">
        <Button variant="light" onClick={scrollLeft}><FaChevronLeft /></Button>
        <div className="d-flex gap-3 px-3 overflow-hidden" ref={scrollContainer} style={{ whiteSpace: "nowrap" }}>
          {data.map((item) => (
            <Card key={item.id} style={{ minWidth: "220px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
              <Card.Img variant="top" src={item.image} style={{ height: "150px", objectFit: "cover" }} />
              <Card.Body className="text-center">
                <Card.Title style={{ fontSize: "calc(16px - 0.2vw)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</Card.Title>
                <div className="d-flex justify-content-center gap-2 mt-2">
                  <Button variant="outline-primary" size="sm" onClick={() => handleEdit(item)}>
                    <FaEdit />
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(item.id)}>
                    <FaTrash />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
        <Button variant="light" onClick={scrollRight}><FaChevronRight /></Button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Select Image</Form.Label>
              <div className="d-flex justify-content-between">
                {["https://via.placeholder.com/150", "https://via.placeholder.com/150/0000FF"]
                  .map((imgSrc, idx) => (
                    <Card key={idx} style={{ width: "48%", cursor: "pointer" }} onClick={() => handleImageSelect(imgSrc)}>
                      <Card.Img variant="top" src={imgSrc} style={{ height: "100px", objectFit: "cover" }} />
                      <Card.Body className="text-center p-2">
                        <Button variant="outline-primary" size="sm"><FaEdit /></Button>
                      </Card.Body>
                    </Card>
                ))}
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" value={newData.title} onChange={(e) => setNewData({ ...newData, title: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={newData.description} onChange={(e) => setNewData({ ...newData, description: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Link</Form.Label>
              <Form.Control type="text" value={newData.link} onChange={(e) => setNewData({ ...newData, link: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Section</Form.Label>
              <Form.Control as="select" value={newData.section} onChange={(e) => setNewData({ ...newData, section: e.target.value })}>
                {sections.map((sec, idx) => <option key={idx}>{sec}</option>)}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

const ViewPage = () => {
  return (
    <Container className="mt-4">
      {sections.map((section, index) => (
        <ScrollableSection key={index} title={section} />
      ))}
    </Container>
  );
};

export default ViewPage;

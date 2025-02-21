import React, { useState } from "react";
import { Container, Card, Button, Row, Col, Form, Modal, Carousel } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

const initialSections = [
  {
    id: 1,
    title: "Section 1",
    cards: [
      {
        id: 1,
        image: "https://via.placeholder.com/300",
        title: "Sample Title 1",
        description: "This is a sample description for the first card.",
        link: "https://example.com",
      },
      {
        id: 2,
        image: "https://via.placeholder.com/300",
        title: "Sample Title 2",
        description: "This is a sample description for the second card.",
        link: "https://example.com",
      },
    ],
  },
  {
    id: 2,
    title: "Section 2",
    cards: [
      {
        id: 3,
        image: "https://via.placeholder.com/300",
        title: "Sample Title 3",
        description: "This is a sample description for the third card.",
        link: "https://example.com",
      },
      {
        id: 4,
        image: "https://via.placeholder.com/300",
        title: "Sample Title 4",
        description: "This is a sample description for the fourth card.",
        link: "https://example.com",
      },
    ],
  },
  {
    id: 3,
    title: "Section 3",
    cards: [
      {
        id: 3,
        image: "https://via.placeholder.com/300",
        title: "Sample Title 3",
        description: "This is a sample description for the third card.",
        link: "https://example.com",
      },
      {
        id: 4,
        image: "https://via.placeholder.com/300",
        title: "Sample Title 4",
        description: "This is a sample description for the fourth card.",
        link: "https://example.com",
      },
    ],
  },
];

const ViewPage = () => {
  const [sections, setSections] = useState(initialSections);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteData, setDeleteData] = useState(null);

  const handleDeleteConfirm = () => {
    setSections(sections.map(section => ({
      ...section,
      cards: section.cards.filter(card => card.id !== deleteData.cardId),
    })));
    setShowDeleteModal(false);
  };

  const handleDelete = (sectionId, cardId) => {
    setDeleteData({ sectionId, cardId });
    setShowDeleteModal(true);
  };

  const handleEdit = (card) => {
    setEditData(card);
    setShowModal(true);
  };

  const handleSave = () => {
    setSections(sections.map(section => ({
      ...section,
      cards: section.cards.map(card => (card.id === editData.id ? editData : card)),
    })));
    setShowModal(false);
  };

  return (
    <Container fluid className="bg-light py-4">
      {sections.map((section) => (
        <div key={section.id} className="mb-4">
          <h3 className="text-center mb-3">{section.title}</h3>
          <Carousel indicators={false} className="mx-auto" style={{ maxWidth: "90%" }}>
            {section.cards.map((card) => (
              <Carousel.Item key={card.id}>
                <Row className="justify-content-center">
                  <Col xs={12} md={8} lg={6}>
                    <Card className="shadow-sm">
                      <Row className="g-0">
                        <Col md={4} className="d-flex align-items-center">
                          <Card.Img src={card.image} className="img-fluid rounded-start" />
                        </Col>
                        <Col md={8}>
                          <Card.Body>
                            <Card.Title>{card.title}</Card.Title>
                            <Card.Text>{card.description}</Card.Text>
                            <Card.Link href={card.link} target="_blank">Visit</Card.Link>
                            <div className="mt-3 d-flex justify-content-end">
                              <Button variant="outline-primary me-2" onClick={() => handleEdit(card)}>
                                <FaEdit />
                              </Button>
                              <Button variant="outline-danger" onClick={() => handleDelete(section.id, card.id)}>
                                <FaTrash />
                              </Button>
                            </div>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      ))}

      {showDeleteModal && (
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this card?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleDeleteConfirm}>Delete</Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default ViewPage;

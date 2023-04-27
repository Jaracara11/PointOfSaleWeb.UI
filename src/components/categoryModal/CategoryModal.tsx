import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

export const CategoryModal = (props: any) => {
  return (
    <Modal
      className="category-modal"
      show={props.toggle}
      onHide={props.toggle}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add New Category</Modal.Title>
      </Modal.Header>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" autoFocus />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Example textarea</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
      </Form>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.toggle}>
          Close
        </Button>
        <Button variant="primary" onClick={props.toggle}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

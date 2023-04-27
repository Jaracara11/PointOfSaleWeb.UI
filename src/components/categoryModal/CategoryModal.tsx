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
      <Modal.Body>
        <Form>
          <Form.Control
            className="mt-4"
            type="text"
            placeholder="New Category Name"
          />
        </Form>
        <Button variant="dark ms-3" onClick={props.toggle}>
          Save
        </Button>
        <Button variant="outline-dark" onClick={props.toggle}>
          Cancel
        </Button>
      </Modal.Body>
    </Modal>
  );
};

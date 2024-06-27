import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalButton = () => {
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [validationError, setValidationError] = useState('');

    const handleClose = () => {
        setShow(false);
        resetForm();
    };

    const handleShow = () => setShow(true);

    const resetForm = () => {
        setUsername('');
        setEmail('');
        setPhone('');
        setDob('');
        setValidationError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!username || !email || !phone || !dob) {
            setValidationError('Please fill out all fields.');
            return;
        }

        // Email validation
        if (!email.includes('@')) {
            alert('Invalid email. Please check your email address.');
            return;
        }

        // Phone number validation
        if (!/^\d{10}$/.test(phone)) {
            alert('Invalid phone number. Please enter a 10-digit phone number.');
            return;
        }

        // Date of birth validation (simple check for future date)
        const currentDate = new Date();
        const selectedDate = new Date(dob);
        if (selectedDate > currentDate) {
            alert('Invalid date of birth. Please select a date in the past.');
            return;
        }

        // All validations passed, close modal and reset form
        handleClose();
    };


    return (
        <div>
            <h1>User Details Modal</h1>
            <Button variant="primary" onClick={handleShow}>
                Open Form
            </Button>

            <Modal show={show} onHide={handleClose} backdrop={true} keyboard={true}>
                <Modal.Header>
                    <Modal.Title>Fill Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="phone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="dob">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Enter date of birth"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                            />
                        </Form.Group>
                        {validationError && <p className="text-danger">{validationError}</p>}
                        <Button variant="primary" type="submit" className="submit-button">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ModalButton;
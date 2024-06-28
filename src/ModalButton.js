import React, { useState } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
import './ModalButton.css';

const ModalButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        dob: '',
    });
    const [errors, setErrors] = useState('');

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setFormData({ username: '', email: '', phone: '', dob: '' });
        setErrors({ username: false, email: false, phone: false, dob: false });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form fields
        let formValid = true;
        // const newErrors = { ...errors };

        if (formData.username === '' || formData.email === '' || formData.phone === '' || formData.dob === '') {
            setErrors('Please fill all fields!');
            formValid = false;
            return;
        }

        // if (!formData.email.includes('@')) {
        //     alert('');
        //     formValid = false;
        //     return;
        // }

        if (formData.phone.length !== 10 || isNaN(formData.phone)) {
            alert('Invalid phone number. Please enter a 10-digit phone number.');
            formValid = false;
            return;
        }

        const today = new Date();
        const dobDate = new Date(formData.dob);
        if (dobDate >= today) {
            alert('Invalid date of birth. Date of birth cannot be in future.');
            formValid = false;
            return;
        }

        if (formValid) {
            alert('Form submitted successfully!');
            closeModal();
        }
    };

    return (
        <div>
            <h1>User Details Modal</h1>
            <button onClick={openModal} className="OpenModalButton">Open Form</button>

            {isOpen && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Fill Details</h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                required
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            />

                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />

                            <label htmlFor="phone">Phone Number:</label>
                            <input
                                type="text"
                                id="phone"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />

                            <label htmlFor="dob">Date of Birth:</label>
                            <input
                                type="date"
                                id="dob"
                                required
                                value={formData.dob}
                                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                            />
                            {errors && <p>errors</p>}
                            <button type="submit" className="submit-button">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ModalButton;
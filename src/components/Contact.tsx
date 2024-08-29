import React, { useState } from 'react';
import './component-css/Contact.css'; // Optional: If you want to style using an external CSS file
import NavBar from './NavBar';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to an API)
        console.log('Form submitted:', formData);
        // Reset form
        setFormData({
            name: '',
            email: '',
            message: '',
        });
    };

    return (
        <div>
            {/* <NavBar/> */}
            <div className="contact-us">
          <div className="contact-container">
            <div className="contact-details">
                <h1>Contact Us</h1>
                <p>If you have any questions or concerns, feel free to reach out to us using the form below.</p>
                <div className="contact-info">
                    <h2>Contact Information</h2>
                    <p><strong>Email:</strong> support@example.com</p>
                    <p><strong>Phone:</strong> +123 456 7890</p>
                    <p><strong>Address:</strong> 1234 Main Street, City, Country</p>
                </div>
            </div>
            <div className="contact-form">
                <h2>Send Us a Message</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Send Message</button>
                </form>
            </div>
        </div>
        </div>
        </div>
 
    );
};

export default Contact;

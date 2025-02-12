import { useState, useEffect } from 'react';
import '../styles/ConferenceTicketForm.css';

export const ConferenceTicketForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    avatarUrl: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedData = localStorage.getItem('conferenceTicketForm');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('conferenceTicketForm', JSON.stringify(formData));
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.avatarUrl.trim()) {
      newErrors.avatarUrl = 'Avatar URL is required';
    } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(formData.avatarUrl)) {
      newErrors.avatarUrl = 'Please enter a valid image URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form" noValidate>
      <h1>Conference Ticket Generator</h1>
      
      <div className="form-group">
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          className={errors.fullName ? 'error' : ''}
        />
        {errors.fullName && (
          <span className="error-message" id="fullName-error" role="alert">
            {errors.fullName}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && (
          <span className="error-message" id="email-error" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="avatarUrl">Avatar URL</label>
        <input
          type="url"
          id="avatarUrl"
          name="avatarUrl"
          value={formData.avatarUrl}
          onChange={handleChange}
          aria-describedby={errors.avatarUrl ? "avatarUrl-error" : undefined}
          className={errors.avatarUrl ? 'error' : ''}
        />
        {errors.avatarUrl && (
          <span className="error-message" id="avatarUrl-error" role="alert">
            {errors.avatarUrl}
          </span>
        )}
      </div>

      <button type="submit">Generate Ticket</button>
    </form>
  );
};



import { useState } from 'react';
import emailjs from '@emailjs/browser';

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const [formData, setFormData] =
    useState<FormData>({
      name: '',
      email: '',
      message: '',
    });

  const [loading, setLoading] =
    useState(false);

  const [status, setStatus] =
    useState('');

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const validate = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.message
    ) {
      return 'Please fill in all fields.';
    }

    const emailPattern =
      /\S+@\S+\.\S+/;

    if (
      !emailPattern.test(
        formData.email
      )
    ) {
      return 'Invalid email format.';
    }

    return '';
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const error = validate();

    if (error) {
      setStatus(error);
      return;
    }

    setLoading(true);
    setStatus('');

    try {
      const response = await fetch(
        'http://localhost:5000/api/contact',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify(
            formData
          ),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            'MongoDB save failed'
        );
      }

      console.log(
        'MongoDB Saved:',
        data
      );

      await emailjs.send(
        import.meta.env
          .VITE_EMAIL_SERVICE_ID,
        import.meta.env
          .VITE_EMAIL_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message:
            formData.message,
        },
        import.meta.env
          .VITE_EMAIL_PUBLIC_KEY
      );

      setStatus(
        'Message sent successfully!'
      );

      setFormData({
        name: '',
        email: '',
        message: '',
      });

    } catch (error: any) {
      console.error(error);

      setStatus(
        error.message ||
          'Failed to send message.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>
          Get In Touch
        </h2>

        <form
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={
              handleChange
            }
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={
              handleChange
            }
            style={inputStyle}
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={
              formData.message
            }
            onChange={
              handleChange
            }
            style={{
              ...inputStyle,
              height: '120px',
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={buttonStyle}
          >
            {loading
              ? 'Sending...'
              : 'Send Message'}
          </button>
        </form>

        {status && (
          <p style={statusStyle}>
            {status}
          </p>
        )}
      </div>
    </div>
  );
}

/* =========================
   STYLES
========================= */

const pageStyle: React.CSSProperties =
  {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background:
      'linear-gradient(135deg, #0b1220, #0f1b2e)',
    padding: '40px',
  };

const cardStyle: React.CSSProperties =
  {
    width: '100%',
    maxWidth: '500px',
    backgroundColor:
      'rgba(20, 35, 55, 0.9)',
    padding: '30px',
    borderRadius: '14px',
    border:
      '1px solid rgba(120, 180, 255, 0.2)',
    color: '#eaf2ff',
  };

const titleStyle: React.CSSProperties =
  {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#ffd66b',
  };

const inputStyle: React.CSSProperties =
  {
    width: '100%',
    padding: '12px',
    marginBottom: '12px',
    borderRadius: '10px',
    border:
      '1px solid rgba(120, 180, 255, 0.25)',
    backgroundColor:
      '#0c1624',
    color: '#eaf2ff',
  };

const buttonStyle: React.CSSProperties =
  {
    width: '100%',
    padding: '12px',
    borderRadius: '10px',
    border: 'none',
    background:
      'linear-gradient(90deg, #ffd66b, #ffbf3f)',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

const statusStyle: React.CSSProperties =
  {
    marginTop: '15px',
    textAlign: 'center',
    color: '#a9c7e6',
  };
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../Portfolio.css';

import maraImg from '../assets/Mara.png';

import biodataImg from '../assets/Biodata.png';
import eventImg from '../assets/Event_Registration.png';
import feedbackImg from '../assets/feedBack.png';
import issueImg from '../assets/IssueSystem.png';

const Portfolio: React.FC = () => {
  const navigate = useNavigate();

  const [messageStatus, setMessageStatus] =
    useState('');

  const [isLoading, setIsLoading] =
    useState(false);

  // =========================
  // PROJECTS
  // =========================
  const projects = [
    {
      title: 'Resume',
      description:
        'Creating a resume that highlights the background',
      image: biodataImg,
      technologies: [
        'React',
        'Node.js',
        'TypeScript',
      ],
      liveDemo:
        'https://ubsitnierelfamara.github.io/unit1_lesson1_A_Niere/',
      code:
        'https://github.com/UBSITNiereLFamara/unit1_lesson1_A_Niere.git',
    },

    {
      title: 'Event Dashboard',
      description:
        'Real-time data insights on events and attendee engagement',
      image: eventImg,
      technologies: [
        'Node.js',
        'React',
        'TypeScript',
      ],
      liveDemo:
        'https://ubsitnierelfamara.github.io/MG_LAB4_Niere/',
      code:
        'https://github.com/UBSITNiereLFamara/MG_LAB4_Niere.git',
    },

    {
      title: 'Feedback System',
      description:
        'Analytics feedback with charts and real-time data',
      image: feedbackImg,
      technologies: [
        'React',
        'Node.js',
        'MongoDB',
      ],
      liveDemo:
        'https://ubsitnierelfamara.github.io/FG_LAB1/',
      code:
        'https://github.com/UBSITNiereLFamara/FG_LAB1.git',
    },

    {
      title: 'City Issue Report',
      description:
        'A civic reporting system for residents of Baguio City to report public issues.',
      image: issueImg,
      technologies: [
        'React',
        'Node.js',
        'MongoDB',
        'EmailJS',
      ],
      liveDemo:
        'https://ubsitnierelfamara.github.io/city-issue-platform/',
      code:
        'https://github.com/UBSITNiereLFamara/city-issue-platform.git',
    },
  ];

  // =========================
  // CONTACT SUBMIT
  // =========================
  const handleContactSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setIsLoading(true);
    setMessageStatus('');

    const form = e.currentTarget;

    const data = {
      name: (
        form.elements.namedItem(
          'name'
        ) as HTMLInputElement
      ).value,

      email: (
        form.elements.namedItem(
          'email'
        ) as HTMLInputElement
      ).value,

      message: (
        form.elements.namedItem(
          'message'
        ) as HTMLTextAreaElement
      ).value,
    };

    try {
      // =========================
      // EMAILJS SEND
      // =========================
      await emailjs.send(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        {
          name: data.name,
          email: data.email,
          message: data.message,
        },
        import.meta.env.VITE_EMAIL_PUBLIC_KEY
      );

      // =========================
      // OPTIONAL DATABASE SAVE
      // =========================
      try {
        await fetch(
          'http://localhost:5000/api/contact',
          {
            method: 'POST',
            headers: {
              'Content-Type':
                'application/json',
            },
            body: JSON.stringify(data),
          }
        );
      } catch (dbError) {
        console.log(
          'Database save failed'
        );
      }

      setMessageStatus(
        'Message sent successfully! 🎉'
      );

      form.reset();

      setTimeout(() => {
        setMessageStatus('');
      }, 5000);

    } catch (error) {
      console.error(error);

      setMessageStatus(
        'Failed to send message. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isSuccess =
    messageStatus
      .toLowerCase()
      .includes('success');

  return (
    <>
      {/* NAVBAR */}
      <nav className="custom-navbar">
        <div className="container navbar-inner">
          <div
            className="logo"
            onClick={() =>
              navigate('/admin-login')
            }
          >
            FAMARA NIERE
          </div>

          <div className="nav-links">
            {[
              'home',
              'about',
              'projects',
              'contact',
            ].map((item) => (
              <a
                key={item}
                href={`#${item}`}
              >
                {item.charAt(0).toUpperCase() +
                  item.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="hero-section"
      >
        <div className="container hero-grid">
          <div className="hero-text">
            <h1>
              Hi, I'm{' '}
              <span>FAMARA NIERE</span>
            </h1>

            <p>
              Full Stack Developer creating
              amazing digital experiences
            </p>

            <div className="hero-buttons">
              <a
                href="#projects"
                className="btn-primary-custom"
              >
                View My Work
              </a>

              <a
                href="#contact"
                className="btn-outline-custom"
              >
                Contact Me
              </a>
            </div>
          </div>

          <div className="hero-image">
            <img
              src={maraImg}
              alt="Famara Niere"
              className="profile-image"
              style={{
                cursor: 'pointer',
              }}
              onClick={() =>
                navigate('/admin-login')
              }
            />
          </div>

          <div className="hero-tech">
            <h5>Tech Stack</h5>

            <p>
              React • Node.js • MongoDB
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="section scroll-section"
      >
        <div className="container text-center">
          <h2>About Me</h2>

          <p>
            I am a passionate Full Stack Developer building scalable and
            efficient web applications. I enjoy creating modern digital
            solutions that combine clean design with strong functionality,
            focusing on delivering a smooth and user-friendly experience.
            I am still studying and continuously improving my skills in
            React, Node.js, MongoDB, and EmailJS, and I am committed to
            expanding my knowledge in full-stack development by applying
            what I learn to real-world projects as I grow and improve as a
            developer.
          </p>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        className="section projects-section scroll-section"
      >
        <div className="container">
          <h2 className="section-title">
            Featured Projects
          </h2>

          <div className="projects-grid">
            {projects.map(
              (project, idx) => (
                <div
                  key={idx}
                  className="project-card"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-img"
                  />

                  <h3>
                    {project.title}
                  </h3>

                  <p>
                    {
                      project.description
                    }
                  </p>

                  <div className="tags">
                    {project.technologies.map(
                      (tech, i) => (
                        <span key={i}>
                          {tech}
                        </span>
                      )
                    )}
                  </div>

                  <div className="project-buttons">
                    <a
                      href={
                        project.liveDemo
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live
                    </a>

                    <a
                      href={project.code}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Code
                    </a>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="section contact-section scroll-section"
      >
        <div className="container text-center">
          <h2>Get In Touch</h2>

          {messageStatus && (
            <div
              className={`alert-box ${
                isSuccess
                  ? 'success'
                  : 'error'
              }`}
            >
              {messageStatus}
            </div>
          )}

          <form
            onSubmit={
              handleContactSubmit
            }
            className="contact-form"
          >
            <input
              name="name"
              placeholder="Your Name"
              required
              disabled={isLoading}
            />

            <input
              name="email"
              type="email"
              placeholder="Your Email"
              required
              disabled={isLoading}
            />

            <textarea
              name="message"
              rows={5}
              placeholder="Message"
              required
              disabled={isLoading}
            />

            <button
              disabled={isLoading}
            >
              {isLoading
                ? 'Sending...'
                : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        © 2026 MyPortfolio. All rights
        reserved.
      </footer>
    </>
  );
};

export default Portfolio;
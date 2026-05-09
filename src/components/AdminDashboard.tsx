import React, {
  useEffect,
  useState,
} from 'react';

import {
  FiLogOut,
  FiRefreshCw,
  FiTrash2,
  FiEdit3,
  FiMail,
} from 'react-icons/fi';

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

const API_URL =
  'http://localhost:5000/api/contact';

const AdminDashboard: React.FC = () => {
  const [messages, setMessages] =
    useState<Message[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [
    selectedMessage,
    setSelectedMessage,
  ] = useState<Message | null>(
    null
  );


  useEffect(() => {
    checkAuth();
    loadMessages();
  }, []);

  const checkAuth = () => {
    const token =
      localStorage.getItem(
        'adminToken'
      );

    if (!token) {
      window.location.href =
        '/admin-login';
    }
  };

  // =========================
  // FETCH MESSAGES
  // =========================
  const loadMessages =
    async () => {
      try {
        setLoading(true);

        const response =
          await fetch(API_URL);

        if (!response.ok) {
          throw new Error(
            'Failed to fetch messages'
          );
        }

        const data =
          await response.json();

        setMessages(data);

      } catch (error) {
        console.error(error);

        alert(
          'Failed to load messages'
        );
      } finally {
        setLoading(false);
      }
    };

  // =========================
  // DELETE MESSAGE
  // =========================
  const deleteMessage =
    async (id: string) => {
      try {
        const response =
          await fetch(
            `${API_URL}/${id}`,
            {
              method: 'DELETE',
            }
          );

        if (!response.ok) {
          throw new Error(
            'Delete failed'
          );
        }

        setMessages(
          messages.filter(
            (msg) =>
              msg._id !== id
          )
        );

        if (
          selectedMessage?._id ===
          id
        ) {
          setSelectedMessage(null);
        }

      } catch (error) {
        console.error(error);

        alert(
          'Failed to delete message'
        );
      }
    };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    localStorage.removeItem(
      'adminToken'
    );

    window.location.href = '/';
  };

  // =========================
  // LOADING SCREEN
  // =========================
  if (loading) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{
          background:
            'linear-gradient(135deg, #08121f, #10243b)',
        }}
      >
        <div
          className="spinner-border"
          style={{
            width: '3rem',
            height: '3rem',
            color: '#ffd166',
          }}
        ></div>
      </div>
    );
  }

  return (
    <div
      className="min-vh-100 p-4"
      style={{
        background:
          'linear-gradient(135deg, #08121f 0%, #10243b 60%, #1a2f4c 100%)',
      }}
    >
      <div className="container-fluid">
        {/* HEADER */}
        <div
          className="p-4 mb-4 d-flex justify-content-between align-items-center"
          style={{
            background:
              'rgba(255,255,255,0.06)',
            border:
              '1px solid rgba(255, 209, 102, 0.15)',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            boxShadow:
              '0 0 20px rgba(0,0,0,0.25)',
          }}
        >
          <div>
            <h1
              className="fw-bold mb-1"
              style={{
                color: '#ffd166',
              }}
            >
              Admin Dashboard
            </h1>

            <small
              style={{
                color:
                  'rgba(220,235,255,0.75)',
              }}
            >
              Total Messages (
              {messages.length})
            </small>
          </div>

          <button
            className="btn"
            onClick={logout}
            style={{
              border:
                '1px solid rgba(255,209,102,0.4)',
              color: '#ffd166',
              borderRadius: '12px',
              padding:
                '10px 20px',
              background:
                'rgba(255,209,102,0.05)',
            }}
          >
            <FiLogOut className="me-2" />
            Logout
          </button>
        </div>

        <div className="row g-4">
          {/* LEFT SIDE */}
          <div className="col-lg-8">
            <div
              className="p-4"
              style={{
                background:
                  'rgba(255,255,255,0.06)',
                border:
                  '1px solid rgba(120,180,255,0.12)',
                borderRadius: '20px',
                backdropFilter:
                  'blur(10px)',
                minHeight: '650px',
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3
                  className="fw-bold mb-0"
                  style={{
                    color:
                      '#d9ecff',
                  }}
                >
                  📥 Contact Messages
                </h3>

                <button
                  className="btn btn-sm"
                  onClick={
                    loadMessages
                  }
                  style={{
                    border:
                      '1px solid rgba(255,209,102,0.4)',
                    color:
                      '#ffd166',
                    borderRadius:
                      '10px',
                    background:
                      'rgba(255,209,102,0.05)',
                  }}
                >
                  <FiRefreshCw className="me-1" />
                  Refresh
                </button>
              </div>

              {/* EMPTY */}
              {messages.length ===
              0 ? (
                <div
                  className="text-center py-5"
                  style={{
                    color:
                      'rgba(220,235,255,0.7)',
                  }}
                >
                  No messages yet
                </div>
              ) : (
                messages.map(
                  (message) => (
                    <div
                      key={
                        message._id
                      }
                      className="p-4 mb-3"
                      style={{
                        background:
                          selectedMessage?._id ===
                          message._id
                            ? 'rgba(255,209,102,0.08)'
                            : 'rgba(255,255,255,0.04)',

                        border:
                          selectedMessage?._id ===
                          message._id
                            ? '1px solid rgba(255,209,102,0.4)'
                            : '1px solid rgba(120,180,255,0.12)',

                        borderRadius:
                          '18px',

                        cursor:
                          'pointer',

                        transition:
                          '0.3s ease',
                      }}
                      onClick={() =>
                        setSelectedMessage(
                          message
                        )
                      }
                    >
                      <div className="d-flex justify-content-between mb-2">
                        <div>
                          <h6
                            className="fw-bold mb-1"
                            style={{
                              color:
                                '#ffd166',
                            }}
                          >
                            {
                              message.name
                            }
                          </h6>

                          <small
                            style={{
                              color:
                                '#9fd3ff',
                            }}
                          >
                            {
                              message.email
                            }
                          </small>
                        </div>

                        <small
                          style={{
                            color:
                              'rgba(220,235,255,0.6)',
                          }}
                        >
                          {new Date(
                            message.createdAt
                          ).toLocaleString()}
                        </small>
                      </div>

                      <p
                        style={{
                          color:
                            '#d9ecff',
                        }}
                      >
                        {
                          message.message
                        }
                      </p>

                      <div className="d-flex gap-2">
                        <a
                          href={`mailto:${message.email}`}
                          className="btn btn-sm"
                          style={{
                            border:
                              '1px solid rgba(120,180,255,0.3)',
                            color:
                              '#9fd3ff',
                            background:
                              'rgba(120,180,255,0.05)',
                          }}
                        >
                          <FiMail />
                        </a>

                        <button
                          className="btn btn-sm"
                          style={{
                            border:
                              '1px solid rgba(255,100,100,0.3)',
                            color:
                              '#ff8c8c',
                            background:
                              'rgba(255,100,100,0.05)',
                          }}
                          onClick={(
                            e
                          ) => {
                            e.stopPropagation();

                            if (
                              window.confirm(
                                'Delete this message?'
                              )
                            ) {
                              deleteMessage(
                                message._id
                              );
                            }
                          }}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  )
                )
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-4">
            <div
              className="p-4 h-100"
              style={{
                background:
                  'rgba(255,255,255,0.06)',
                border:
                  '1px solid rgba(120,180,255,0.12)',
                borderRadius: '20px',
                backdropFilter:
                  'blur(10px)',
              }}
            >
              <h5
                className="fw-bold mb-4"
                style={{
                  color: '#ffd166',
                }}
              >
                📄 Message Details
              </h5>

              {selectedMessage ? (
                <>
                  <div className="mb-3">
                    <label
                      style={{
                        color:
                          '#9fd3ff',
                        fontWeight:
                          'bold',
                      }}
                    >
                      Name
                    </label>

                    <div
                      style={{
                        color:
                          '#ffffff',
                      }}
                    >
                      {
                        selectedMessage.name
                      }
                    </div>
                  </div>

                  <div className="mb-3">
                    <label
                      style={{
                        color:
                          '#9fd3ff',
                        fontWeight:
                          'bold',
                      }}
                    >
                      Email
                    </label>

                    <div>
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        style={{
                          color:
                            '#ffd166',
                          textDecoration:
                            'none',
                        }}
                      >
                        {
                          selectedMessage.email
                        }
                      </a>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      style={{
                        color:
                          '#9fd3ff',
                        fontWeight:
                          'bold',
                      }}
                    >
                      Message
                    </label>

                    <div
                      className="p-3 mt-2"
                      style={{
                        background:
                          'rgba(255,255,255,0.04)',
                        borderRadius:
                          '14px',
                        color:
                          '#d9ecff',
                        border:
                          '1px solid rgba(120,180,255,0.1)',
                      }}
                    >
                      {
                        selectedMessage.message
                      }
                    </div>
                  </div>

                  <div className="d-grid gap-2">
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="btn"
                      style={{
                        background:
                          'linear-gradient(90deg, #ffd166, #ffb703)',
                        border:
                          'none',
                        color:
                          '#08121f',
                        fontWeight:
                          'bold',
                        borderRadius:
                          '12px',
                      }}
                    >
                      <FiEdit3 className="me-2" />
                      Quick Reply
                    </a>

                    <button
                      className="btn"
                      style={{
                        border:
                          '1px solid rgba(255,100,100,0.3)',
                        color:
                          '#ff8c8c',
                        borderRadius:
                          '12px',
                        background:
                          'rgba(255,100,100,0.05)',
                      }}
                      onClick={() =>
                        deleteMessage(
                          selectedMessage._id
                        )
                      }
                    >
                      <FiTrash2 className="me-2" />
                      Delete
                    </button>
                  </div>
                </>
              ) : (
                <div
                  className="text-center py-5"
                  style={{
                    color:
                      'rgba(220,235,255,0.7)',
                  }}
                >
                  Select a message
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
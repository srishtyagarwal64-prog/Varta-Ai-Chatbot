import React, { useEffect, useState } from "react";

const API_BASE =
  window.location.port === "5173"
    ? "http://localhost:5000/api"
    : "/api";

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [conversations, setConversations] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [error, setError] = useState("");

  const ADMIN_PASSWORD = "varta123";

  // =========================
  // ADMIN LOGIN
  // =========================
  const handleLogin = (e) => {
    e.preventDefault();

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid password");
    }
  };

  // =========================
  // FETCH DASHBOARD DATA
  // =========================
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [convRes, analyticsRes] = await Promise.all([
        fetch(`${API_BASE}/conversations`),

        fetch(`${API_BASE}/admin/analytics`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }),
      ]);

      if (!convRes.ok) {
        throw new Error("Failed to fetch conversations");
      }

      if (!analyticsRes.ok) {
        throw new Error("Failed to fetch analytics");
      }

      const conversationsData = await convRes.json();
      const analyticsData = await analyticsRes.json();

      setConversations(conversationsData);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error("Dashboard error:", error);
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOAD DATA AFTER LOGIN
  // =========================
  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  // =========================
  // SELECT CONVERSATION
  // =========================
  const selectConversation = async (conversation) => {
    try {
      setChatLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE}/conversations/${conversation.id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch conversation");
      }

      const data = await response.json();

      setSelectedChat(data);
    } catch (error) {
      console.error("Conversation error:", error);
      setError("Failed to load conversation.");
    } finally {
      setChatLoading(false);
    }
  };

  // =========================
  // LOGIN PAGE
  // =========================
  if (!isAuthenticated) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{
          background:
            "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        }}
      >
        <div
          className="card border-0 shadow-lg"
          style={{ width: "420px", borderRadius: "20px" }}
        >
          <div className="card-body p-5">

            <div className="text-center mb-4">
              <div
                className="d-inline-flex align-items-center justify-content-center bg-dark text-white rounded-circle mb-3"
                style={{ width: "65px", height: "65px" }}
              >
                <i className="bi bi-shield-lock fs-3"></i>
              </div>

              <h3 className="fw-bold mb-1">
                Admin Dashboard
              </h3>

              <p className="text-muted mb-0">
                Login to manage your chatbot
              </p>
            </div>

            <form onSubmit={handleLogin}>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Admin Password
                </label>

                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="bi bi-lock"></i>
                  </span>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                  />
                </div>
              </div>

              {error && (
                <div className="alert alert-danger py-2">
                  <i className="bi bi-exclamation-circle me-2"></i>
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-dark w-100 py-2 fw-semibold"
              >
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Login
              </button>

            </form>
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // DASHBOARD
  // =========================
  return (
    <div className="min-vh-100 bg-light">

      {/* ================= HEADER ================= */}
      <nav className="navbar bg-white shadow-sm border-bottom">
        <div className="container-fluid px-4">

          <div className="d-flex align-items-center gap-3">

            <div
              className="bg-dark text-white rounded-3 d-flex align-items-center justify-content-center"
              style={{ width: "42px", height: "42px" }}
            >
              <i className="bi bi-robot fs-5"></i>
            </div>

            <div>
              <h5 className="mb-0 fw-bold">
                Varta AI
              </h5>

              <small className="text-muted">
                Admin Dashboard
              </small>
            </div>

          </div>

          <div className="d-flex align-items-center gap-2">
            <span className="badge bg-success-subtle text-success px-3 py-2">
              <i className="bi bi-circle-fill me-1"></i>
              System Online
            </span>

            <button
              className="btn btn-outline-dark btn-sm"
              onClick={() => setIsAuthenticated(false)}
            >
              <i className="bi bi-box-arrow-right me-1"></i>
              Logout
            </button>
          </div>

        </div>
      </nav>

      <div className="container-fluid px-4 py-4">

        {/* ================= TITLE ================= */}

        <div className="mb-4">
          <h2 className="fw-bold mb-1">
            Dashboard Overview
          </h2>

          <p className="text-muted mb-0">
            Monitor visitors, conversations and chatbot activity.
          </p>
        </div>

        {error && (
          <div className="alert alert-danger d-flex align-items-center">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-5">
            <div
              className="spinner-border text-dark"
              role="status"
            ></div>

            <p className="text-muted mt-3">
              Loading dashboard...
            </p>
          </div>
        ) : (
          <>

            {/* ================= ANALYTICS ================= */}

            {analytics && (
              <div className="row g-4 mb-4">

                {/* Visitors */}
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body p-4">

                      <div className="d-flex justify-content-between align-items-start">

                        <div>
                          <p className="text-muted mb-2">
                            Total Visitors
                          </p>

                          <h2 className="fw-bold mb-0">
                            {analytics.totalVisitors || 0}
                          </h2>
                        </div>

                        <div
                          className="bg-primary-subtle text-primary rounded-3 d-flex align-items-center justify-content-center"
                          style={{
                            width: "50px",
                            height: "50px",
                          }}
                        >
                          <i className="bi bi-people fs-4"></i>
                        </div>

                      </div>

                    </div>
                  </div>
                </div>

                {/* Conversations */}
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body p-4">

                      <div className="d-flex justify-content-between align-items-start">

                        <div>
                          <p className="text-muted mb-2">
                            Total Conversations
                          </p>

                          <h2 className="fw-bold mb-0">
                            {analytics.totalConversations || 0}
                          </h2>
                        </div>

                        <div
                          className="bg-success-subtle text-success rounded-3 d-flex align-items-center justify-content-center"
                          style={{
                            width: "50px",
                            height: "50px",
                          }}
                        >
                          <i className="bi bi-chat-dots fs-4"></i>
                        </div>

                      </div>

                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body p-4">

                      <div className="d-flex justify-content-between align-items-start">

                        <div>
                          <p className="text-muted mb-2">
                            Total Messages
                          </p>

                          <h2 className="fw-bold mb-0">
                            {analytics.totalMessages || 0}
                          </h2>
                        </div>

                        <div
                          className="bg-warning-subtle text-warning rounded-3 d-flex align-items-center justify-content-center"
                          style={{
                            width: "50px",
                            height: "50px",
                          }}
                        >
                          <i className="bi bi-envelope fs-4"></i>
                        </div>

                      </div>

                    </div>
                  </div>
                </div>

              </div>
            )}

            <div className="row g-4">

              {/* ================= LEFT SIDE ================= */}

              <div className="col-lg-4">

                {/* Profession */}
                <div className="card border-0 shadow-sm mb-4">

                  <div className="card-header bg-white border-0 pt-4 px-4">
                    <h5 className="fw-bold mb-1">
                      <i className="bi bi-bar-chart me-2"></i>
                      Top Professions
                    </h5>

                    <small className="text-muted">
                      Visitor profession breakdown
                    </small>
                  </div>

                  <div className="card-body px-4">

                    {analytics?.professionBreakdown?.length === 0 ? (
                      <p className="text-muted text-center py-3 mb-0">
                        No profession data available.
                      </p>
                    ) : (
                      analytics?.professionBreakdown?.map(
                        (item, index) => (
                          <div
                            key={index}
                            className="d-flex justify-content-between align-items-center py-3 border-bottom"
                          >
                            <div className="d-flex align-items-center gap-2">
                              <div
                                className="bg-light rounded-circle d-flex align-items-center justify-content-center"
                                style={{
                                  width: "35px",
                                  height: "35px",
                                }}
                              >
                                <i className="bi bi-person-badge"></i>
                              </div>

                              <span className="fw-semibold">
                                {item._id}
                              </span>
                            </div>

                            <span className="badge bg-dark rounded-pill">
                              {item.count}
                            </span>
                          </div>
                        )
                      )
                    )}

                  </div>
                </div>

                {/* Conversations List */}
                <div className="card border-0 shadow-sm">

                  <div className="card-header bg-white border-0 pt-4 px-4">

                    <div className="d-flex justify-content-between align-items-center">

                      <div>
                        <h5 className="fw-bold mb-1">
                          <i className="bi bi-chat-left-text me-2"></i>
                          Conversations
                        </h5>

                        <small className="text-muted">
                          {conversations.length} conversations
                        </small>
                      </div>

                      <span className="badge bg-dark rounded-pill">
                        {conversations.length}
                      </span>

                    </div>

                  </div>

                  <div
                    className="card-body p-2"
                    style={{
                      maxHeight: "520px",
                      overflowY: "auto",
                    }}
                  >

                    {conversations.length === 0 ? (
                      <div className="text-center py-5">

                        <i className="bi bi-chat-square-text fs-1 text-muted"></i>

                        <p className="text-muted mt-3 mb-0">
                          No conversations found.
                        </p>

                      </div>
                    ) : (
                      conversations.map((conv) => {

                        const visitor = conv.visitor || {
                          name: "Anonymous",
                          profession: "Unknown",
                          goal: "Not specified",
                        };

                        const isActive =
                          selectedChat?.conversation?.id ===
                          conv.id;

                        return (
                          <div
                            key={conv.id}
                            onClick={() =>
                              selectConversation(conv)
                            }
                            className={`p-3 rounded-3 mb-2 ${
                              isActive
                                ? "bg-dark text-white"
                                : "bg-light"
                            }`}
                            style={{
                              cursor: "pointer",
                              transition: "0.2s",
                            }}
                          >

                            <div className="d-flex align-items-center gap-3">

                              <div
                                className={`rounded-circle d-flex align-items-center justify-content-center ${
                                  isActive
                                    ? "bg-white text-dark"
                                    : "bg-white"
                                }`}
                                style={{
                                  width: "42px",
                                  height: "42px",
                                }}
                              >
                                <i className="bi bi-person"></i>
                              </div>

                              <div className="flex-grow-1">

                                <h6 className="mb-1 fw-bold">
                                  {visitor.name}
                                </h6>

                                <small
                                  className={
                                    isActive
                                      ? "text-white-50"
                                      : "text-muted"
                                  }
                                >
                                  {visitor.profession}
                                </small>

                                <div>
                                  <small
                                    className={
                                      isActive
                                        ? "text-white-50"
                                        : "text-muted"
                                    }
                                  >
                                    Conversation #{conv.id}
                                  </small>
                                </div>

                              </div>

                              <i className="bi bi-chevron-right"></i>

                            </div>

                          </div>
                        );
                      })
                    )}

                  </div>
                </div>

              </div>

              {/* ================= RIGHT SIDE ================= */}

              <div className="col-lg-8">

                <div className="card border-0 shadow-sm">

                  {chatLoading ? (
                    <div className="card-body text-center py-5">

                      <div
                        className="spinner-border text-dark"
                        role="status"
                      ></div>

                      <p className="text-muted mt-3 mb-0">
                        Loading conversation...
                      </p>

                    </div>
                  ) : !selectedChat ? (
                    <div className="card-body text-center py-5">

                      <div
                        className="bg-light rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                        style={{
                          width: "80px",
                          height: "80px",
                        }}
                      >
                        <i className="bi bi-chat-square-dots fs-1 text-muted"></i>
                      </div>

                      <h5 className="fw-bold">
                        Select a Conversation
                      </h5>

                      <p className="text-muted mb-0">
                        Choose a conversation from the left to
                        view the complete chat.
                      </p>

                    </div>
                  ) : (
                    <>

                      {/* Visitor Header */}

                      <div className="card-header bg-white border-0 p-4">

                        <div className="d-flex align-items-center gap-3">

                          <div
                            className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center"
                            style={{
                              width: "55px",
                              height: "55px",
                            }}
                          >
                            <i className="bi bi-person fs-4"></i>
                          </div>

                          <div>

                            <h4 className="fw-bold mb-1">
                              {selectedChat.conversation?.visitor?.name ||
                                "Anonymous"}
                            </h4>

                            <span className="badge bg-light text-dark border">
                              <i className="bi bi-briefcase me-1"></i>
                              {selectedChat.conversation?.visitor
                                ?.profession || "Unknown"}
                            </span>

                          </div>

                        </div>

                      </div>

                      {/* Visitor Details */}

                      <div className="px-4 pb-3">

                        <div className="row g-3">

                          <div className="col-md-6">

                            <div className="bg-light rounded-3 p-3">

                              <small className="text-muted d-block">
                                <i className="bi bi-bullseye me-1"></i>
                                Primary Goal
                              </small>

                              <span className="fw-semibold">
                                {selectedChat.conversation?.visitor
                                  ?.goal || "Not specified"}
                              </span>

                            </div>

                          </div>

                          <div className="col-md-6">

                            <div className="bg-light rounded-3 p-3">

                              <small className="text-muted d-block">
                                <i className="bi bi-hash me-1"></i>
                                Conversation ID
                              </small>

                              <span className="fw-semibold">
                                #
                                {selectedChat.conversation?.id}
                              </span>

                            </div>

                          </div>

                        </div>

                      </div>

                      <hr className="mx-4" />

                      {/* Messages */}

                      <div
                        className="card-body px-4"
                        style={{
                          maxHeight: "600px",
                          overflowY: "auto",
                        }}
                      >

                        <h6 className="fw-bold mb-4">
                          <i className="bi bi-chat-text me-2"></i>
                          Chat History
                        </h6>

                        {!selectedChat.messages ||
                        selectedChat.messages.length === 0 ? (
                          <div className="text-center py-5">
                            <i className="bi bi-chat fs-1 text-muted"></i>

                            <p className="text-muted mt-3">
                              No messages found.
                            </p>
                          </div>
                        ) : (
                          selectedChat.messages.map(
                            (message) => (

                              <div
                                key={message.id}
                                className={`d-flex mb-4 ${
                                  message.sender === "visitor"
                                    ? "justify-content-start"
                                    : "justify-content-end"
                                }`}
                              >

                                <div
                                  style={{
                                    maxWidth: "75%",
                                  }}
                                >

                                  <div
                                    className={`p-3 rounded-4 shadow-sm ${
                                      message.sender === "visitor"
                                        ? "bg-light"
                                        : "bg-dark text-white"
                                    }`}
                                  >

                                    <div className="d-flex align-items-center gap-2 mb-2">

                                      <i
                                        className={`bi ${
                                          message.sender === "visitor"
                                            ? "bi-person"
                                            : "bi-robot"
                                        }`}
                                      ></i>

                                      <strong>
                                        {message.sender ===
                                        "visitor"
                                          ? "Visitor"
                                          : "AI"}
                                      </strong>

                                    </div>

                                    <p
                                      className="mb-2"
                                      style={{
                                        whiteSpace: "pre-wrap",
                                      }}
                                    >
                                      {message.text}
                                    </p>

                                    <small
                                      className={
                                        message.sender ===
                                        "visitor"
                                          ? "text-muted"
                                          : "text-white-50"
                                      }
                                    >
                                      {message.createdAt
                                        ? new Date(
                                            message.createdAt
                                          ).toLocaleString()
                                        : ""}
                                    </small>

                                  </div>

                                </div>

                              </div>

                            )
                          )
                        )}

                      </div>

                    </>
                  )}

                </div>

              </div>

            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
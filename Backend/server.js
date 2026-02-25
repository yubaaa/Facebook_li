import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/reset-password", async (req, res) => {
  const { email, currentPassword, newPassword, confirmPassword } = req.body;

  // Vérification basique
  if (!email || !currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({
      message: "Tous les champs sont requis."
    });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      message: "Les nouveaux mots de passe ne correspondent pas."
    });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      message: "Le mot de passe doit contenir au moins 6 caractères."
    });
  }

  // Hash du nouveau mot de passe (bonne pratique)
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  console.log("---- RESET DEMANDE ----");
  console.log("Email:", email);
  console.log("Ancien mot de passe:", currentPassword);
  console.log("Nouveau mot de passe hashé:", hashedPassword);

  return res.status(200).json({
    message: "Mot de passe mis à jour avec succès."
  });
});

app.listen(5000, () => {
  console.log("Server running...");
});
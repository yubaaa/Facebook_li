const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (text) => new Promise((resolve) => rl.question(text, resolve));

const sendEmail = async () => {
  console.log("\n📧 ===== Envoi d'email Facebook =====\n");

  const toEmail   = await question("📩 Email du destinataire : ");
  const prenom    = await question("👤 Prénom du destinataire : ");
  const resetLink = await question("🔗 Lien de réinitialisation : ");
  const subject   = await question("📝 Objet de l'email (Entrée = défaut) : ") 
                    || "Réinitialisez votre mot de passe Facebook";

  rl.close();

  // Charger le template
  let html = fs.readFileSync(path.join(__dirname, "email-reset-password.html"), "utf-8");

  // Remplacer les variables
  html = html.replace("Bendali Badrou", prenom);
  html = html.replace("bendalibadreddine@gmail.com", toEmail);
  html = html.replace("https://www.facebook.com/login/identify?ctx=reset&amp;token=abc123xyz...", resetLink);
  html = html.replace('href="#" class="btn-reset"', `href="${resetLink}" class="btn-reset"`);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  console.log("\n⏳ Envoi en cours...\n");

  await transporter.sendMail({
    from: `"Facebook" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: subject,
    html: html
  });

  console.log(`✅ Email envoyé avec succès à ${toEmail} !`);
};

//wyhi xkkr ycfc jrjj
//set EMAIL_USER=silhouttessecret@gmail.com && set EMAIL_PASS="wyhi xkkr ycfc jrjj" && node send.js

sendEmail().catch((err) => {
  console.error("❌ Erreur :", err.message);
  process.exit(1);
});
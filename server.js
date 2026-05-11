const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { FedaPay, Transaction } = require('fedapay');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Sert les fichiers statiques (index.html, style.css, etc.)

// Logger simple pour le débogage
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Route pour servir l'accueil explicitement (optionnel car express.static le fait déjà)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Configuration FedaPay
const SECRET_KEY = process.env.FEDAPAY_SECRET_KEY;
const ENVIRONMENT = process.env.FEDAPAY_ENVIRONMENT || 'sandbox';

if (!SECRET_KEY) {
    console.error("❌ ERREUR : FEDAPAY_SECRET_KEY est manquante dans le fichier .env");
} else {
    FedaPay.setApiKey(SECRET_KEY);
    FedaPay.setEnvironment(ENVIRONMENT);
    console.log(`✅ FedaPay configuré en mode : ${ENVIRONMENT}`);
}

// Route pour créer une transaction (génère un token pour le frontend)
app.post('/api/create-transaction', async (req, res) => {
    try {
        const { amount, description, clientName, clientEmail } = req.body;

        if (!amount || amount < 100) {
            return res.status(400).json({ 
                success: false, 
                message: "Le montant minimum pour FedaPay est de 100 XOF." 
            });
        }

        console.log(`Initiation d'un paiement de ${amount} XOF pour ${clientName}`);

        // Création de la transaction FedaPay
        const transaction = await Transaction.create({
            description: description || "Paiement Food Fine",
            amount: Math.round(amount),
            currency: { iso: 'XOF' },
            callback_url: req.body.callbackUrl || "https://definition-mu.vercel.app/?payment=success",
            customer: {
                firstname: clientName || "Client",
                lastname: "Food Fine",
                email: clientEmail || "client@foodfine.com"
            }
        });

        // Génération du token pour FedaCheckout
        const token = await transaction.generateToken();

        console.log(`Lien de paiement généré avec succès : ${transaction.id}`);

        res.json({
            success: true,
            transactionId: transaction.id,
            token: token.token,
            url: token.url
        });
    } catch (error) {
        console.error("❌ Erreur FedaPay :", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Erreur lors de la création de la transaction FedaPay. Vérifiez vos clés API.",
            error: error.message 
        });
    }
});

// Route pour envoyer une notification WhatsApp via Green API
app.post('/api/send-whatsapp', async (req, res) => {
    try {
        const { orderType, clientName, amount, items, delivery, address, resDetails } = req.body;
        
        let message = `*✅ NOUVELLE COMMANDE FOOD FINE !*\n\n`;
        message += `*Client :* ${clientName}\n`;
        message += `*Statut :* 🟢 Payé (FedaPay)\n`;
        message += `*Total Payé :* ${amount} F\n\n`;
        
        if (orderType === 'cart') {
            message += `*🛒 DÉTAILS DU PANIER :*\n`;
            if (items && items.length > 0) {
                items.forEach(item => {
                    message += `- ${item.name} (${item.price} F)\n`;
                });
            } else {
                message += `- Panier vide ou non renseigné\n`;
            }
            message += `\n*Livraison :* ${delivery ? 'Oui' : 'Non'}\n`;
            if (delivery && address) {
                message += `*📍 Adresse :* ${address}\n`;
            }
        } else if (orderType === 'reservation') {
            message += `*🍽️ RÉSERVATION DE TABLE :*\n`;
            message += `- *Code :* ${resDetails?.code || 'N/A'}\n`;
            message += `- *Table :* ${resDetails?.table || 'N/A'}\n`;
            message += `- *Zone :* ${resDetails?.area || 'N/A'}\n`;
            message += `- *Date/Heure :* ${resDetails?.date || 'N/A'}\n`;
            message += `- *Personnes :* ${resDetails?.guests || 'N/A'}\n`;
        } else if (orderType === 'sub') {
            message += `*👑 NOUVEL ABONNEMENT :*\n`;
            message += `- *Abonnement activé avec succès*\n`;
        }

        const idInstance = process.env.GREEN_API_ID;
        const apiTokenInstance = process.env.GREEN_API_TOKEN;
        const phone = process.env.RESTAURANT_WA_NUMBER;
        
        if (!idInstance || !apiTokenInstance || !phone) {
            throw new Error("Clés Green API ou Numéro manquants dans le fichier .env");
        }

        const url = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
        const payload = {
            chatId: `${phone}@c.us`,
            message: message
        };

        // Envoi effectif de la requête (fetch est natif dans Node 18+)
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        res.json({ success: true, data });
    } catch (error) {
        console.error("Erreur WhatsApp:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

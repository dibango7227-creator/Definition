const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { FedaPay, Transaction } = require('fedapay');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configuration FedaPay
FedaPay.setApiKey(process.env.FEDAPAY_SECRET_KEY);
FedaPay.setEnvironment(process.env.FEDAPAY_ENVIRONMENT); // 'sandbox' ou 'live'

// Route pour créer une transaction (génère un token pour le frontend)
app.post('/api/create-transaction', async (req, res) => {
    try {
        const { amount, description, clientName, clientEmail } = req.body;

        // Création de la transaction FedaPay
        const transaction = await Transaction.create({
            description: description || "Paiement Food Fine",
            amount: Math.round(amount), // Conversion USD vers XOF (1$ = 600 XOF approx), minimum 100 XOF requis
            currency: { iso: 'XOF' },
            callback_url: req.body.callbackUrl || "https://definition-mu.vercel.app/?payment=success", // Dynamique ou par défaut
            customer: {
                firstname: clientName || "Client",
                lastname: "Food Fine",
                email: clientEmail || "client@foodfine.com"
            }
        });

        // Génération du token pour FedaCheckout
        const token = await transaction.generateToken();

        res.json({
            success: true,
            transactionId: transaction.id,
            token: token.token,
            url: token.url
        });
    } catch (error) {
        console.error("Erreur lors de la création de la transaction:", error);
        res.status(500).json({ success: false, message: error.message });
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

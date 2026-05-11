// Script for Food Fine interactivity and dynamic features

let cart = [];
let requireDelivery = false;
let currentLang = 'fr'; // default language

// Translations dictionary
const translations = {
    fr: {
        nav_home: "Accueil",
        nav_menu: "Menu",
        nav_delivery: "Livraison",
        nav_reservation: "Réservation",
        nav_plans: "Abonnements",
        hero_title: "<span class='highlight'>La Cuisine</span><br>comme vous<br>l'aimez",
        hero_subtitle: "Vivez les meilleures créations culinaires livrées directement chez vous. Laissez-vous tenter par la gastronomie premium.",
        hero_btn: "Commander",
        menu_title: "Nos Plats Spéciaux",
        dish1_name: "Saumon Grillé", dish1_desc: "Saumon sauvage premium",
        dish2_name: "Canard Yakitori", dish2_desc: "Canard effiloché tendre",
        dish3_name: "Bœuf Teriyaki", dish3_desc: "Avec riz blanc savoureux",
        dish4_name: "Steak Wagyu", dish4_desc: "Wagyu grade A5 à la truffe",
        dish5_name: "Pâtes Fruits de Mer", dish5_desc: "Linguine fraîches au homard",
        dish6_name: "Risotto Truffe", dish6_desc: "Risotto crémeux, truffe noire",
        ref_title: "Rafraîchissements",
        ref1_name: "Eau Minérale Premium", ref1_desc: "Bouteille en verre glacé",
        ref2_name: "Vin Rouge Prestige", ref2_desc: "Cabernet Sauvignon Grand Cru",
        ref3_name: "Cocktail Signature", ref3_desc: "Mixologie experte, agrumes frais",
        delivery_title: "Service de Livraison<br>Premium",
        delivery_desc: "Une expérience de restaurant gastronomique dans le confort de votre maison. Saisissez votre position ci-dessous pour trouver les points de repère sur la carte.",
        delivery_input: "Entrez votre ville ou quartier...",
        delivery_btn: "Vérifier",
        del_feat1: "Emballage thermique contrôlé",
        del_feat2: "Garantie de livraison en moins de 30 minutes",
        res_title: "Réserver une Table",
        res_desc: "Réservez votre place pour une expérience culinaire inoubliable chez Food Fine. Choisissez votre zone préférée.",
        res_btn: "Réserver Maintenant",
        sub_title: "Abonnements Mensuels",
        sub_desc: "Choisissez un plan adapté à votre style de vie. Profitez d'avantages exclusifs et de livraisons gratuites.",
        sub1_name: "Assiette Argent", sub1_f1: "5 livraisons gratuites", sub1_f2: "5% de réduction", sub1_btn: "Choisir Argent",
        sub_pop: "Le plus populaire",
        sub2_name: "Assiette Or", sub2_f1: "Livraison gratuite illimitée", sub2_f2: "10% de réduction", sub2_f3: "1 Dégustation Exclusive", sub2_btn: "Choisir Or",
        sub3_name: "Assiette Platine", sub3_f2: "20% de réduction", sub3_f3: "Menus Dégustation Hebdo", sub3_btn: "Choisir Platine",
        per_mo: "/mois",
        footer_desc: "Nous offrons l'expérience culinaire la plus exquise. Élevez vos repas quotidiens avec notre service premium.",
        footer_links: "Liens Rapides", footer_contact: "Contact", footer_rights: "Tous droits réservés.",
        cart_title: "Votre Panier", cart_del_opt: "Je veux être livré (+ 1 F)", cart_del_addr: "Votre adresse complète", cart_total: "Total", cart_pay: "Payer",
        sub_modal_desc: "Complétez vos détails d'abonnement", sub_modal_btn: "S'abonner pour",
        res_mod_title: "Réservation de Table", res_mod_desc: "Sélectionnez vos préférences pour un dîner parfait",
        res_guest_def: "Nombre de Personnes", res_g1: "1 Personne", res_g2: "2 Personnes", res_g4: "4 Personnes", res_g6: "6+ Personnes",
        res_area_def: "Sélectionner la Zone", res_a1: "Salle Standard (Gratuit)", res_a2: "Baie Vitrée (+ 2000 F)", res_a3: "Près de la mer (+ 3000 F)", res_a4: "Espace VIP (+ 5000 F)",
        res_mod_btn: "Procéder au paiement",
        momo_title: "Paiement Mobile Money", momo_desc: "Entrez vos détails pour confirmer", momo_name: "Nom Complet (Pour Facture)", momo_num: "Numéro Mobile Money", momo_btn: "Confirmer le paiement", momo_load: "Traitement en cours...", momo_succ: "Paiement Réussi !", momo_dl: "Télécharger Facture",
        inv_title: "FACTURE", inv_date: "Date :", inv_num: "Facture # :", inv_method: "Méthode de Paiement :", inv_status: "Statut :", inv_paid: "PAYÉ",
        inv_client: "Nom du Client :", inv_del_addr: "Adresse de Livraison :", inv_res_code: "Code de Réservation :", inv_res_table: "Numéro de Table :", inv_res_date: "Date & Heure :",
        inv_desc: "Description", inv_amt: "Montant", inv_sub: "Sous-total :", inv_del_fee: "Frais de livraison :", inv_tot: "Total Payé :", inv_thanks: "Merci d'avoir dîné avec Food Fine !", inv_contact: "Si vous avez des questions concernant cette facture, contactez aimoneyhello@gmail.com"
    },
    en: {
        nav_home: "Home", nav_menu: "Menu", nav_delivery: "Delivery", nav_reservation: "Reservation", nav_plans: "Plans",
        hero_title: "<span class='highlight'>Food</span><br>just the way<br>you like it",
        hero_subtitle: "Experience the finest culinary creations delivered straight to your door. Indulge in premium gastronomy.",
        hero_btn: "Order Food",
        menu_title: "Our Special Dishes",
        dish1_name: "Grilled Salmon", dish1_desc: "Premium wild-caught salmon",
        dish2_name: "Yakitori Duck", dish2_desc: "Tender Shredded Duck",
        dish3_name: "Teriyaki Beef", dish3_desc: "With Savory White Rice",
        dish4_name: "Wagyu Steak", dish4_desc: "A5 Grade Wagyu with Truffle",
        dish5_name: "Seafood Pasta", dish5_desc: "Fresh linguine with lobster",
        dish6_name: "Truffle Risotto", dish6_desc: "Creamy risotto, black truffle",
        ref_title: "Refreshments",
        ref1_name: "Premium Mineral Water", ref1_desc: "Iced glass bottle",
        ref2_name: "Prestige Red Wine", ref2_desc: "Cabernet Sauvignon Grand Cru",
        ref3_name: "Signature Cocktail", ref3_desc: "Expert mixology, fresh citrus",
        delivery_title: "Premium Delivery<br>Service",
        delivery_desc: "Restaurant-quality dining from the comfort of your home. Enter your location below to see map landmarks.",
        delivery_input: "Enter your city or area...",
        delivery_btn: "Check",
        del_feat1: "Thermal controlled packaging",
        del_feat2: "Under 30 minutes delivery guarantee",
        res_title: "Book a Table",
        res_desc: "Reserve your spot for an unforgettable dining experience at Food Fine. Select your preferred seating area.",
        res_btn: "Book a Table Now",
        sub_title: "Monthly Subscription Plans",
        sub_desc: "Choose a plan that fits your lifestyle. Enjoy exclusive perks and free deliveries.",
        sub1_name: "Silver Plate", sub1_f1: "5 free deliveries", sub1_f2: "5% off all menu items", sub1_btn: "Choose Silver",
        sub_pop: "Most Popular",
        sub2_name: "Gold Plate", sub2_f1: "Unlimited free delivery", sub2_f2: "10% off all menu items", sub2_f3: "1 Exclusive Tasting", sub2_btn: "Choose Gold",
        sub3_name: "Platinum Plate", sub3_f2: "20% off all menu items", sub3_f3: "Weekly Tasting menus", sub3_btn: "Choose Platinum",
        per_mo: "/mo",
        footer_desc: "We provide the most exquisite dining experience. Elevate your daily meals with our premium service.",
        footer_links: "Quick Links", footer_contact: "Contact Info", footer_rights: "All rights reserved.",
        cart_title: "Your Cart", cart_del_opt: "I want delivery (+ 1 F)", cart_del_addr: "Full Delivery Address", cart_total: "Total", cart_pay: "Pay",
        sub_modal_desc: "Complete your subscription details", sub_modal_btn: "Subscribe for",
        res_mod_title: "Table Reservation", res_mod_desc: "Select your preferences for the perfect dining experience",
        res_guest_def: "Number of Guests", res_g1: "1 Person", res_g2: "2 People", res_g4: "4 People", res_g6: "6+ People",
        res_area_def: "Select Seating Area", res_a1: "Standard Dining (Free)", res_a2: "Window Seat (+ 2000 F)", res_a3: "Near the Sea (+ 3000 F)", res_a4: "VIP Lounge (+ 5000 F)",
        res_mod_btn: "Proceed to Payment",
        momo_title: "Mobile Money Payment", momo_desc: "Enter your details to confirm", momo_name: "Full Name (For Invoice)", momo_num: "Mobile Money Number", momo_btn: "Confirm Payment", momo_load: "Processing...", momo_succ: "Payment Successful!", momo_dl: "Download Invoice",
        inv_title: "INVOICE", inv_date: "Date:", inv_num: "Invoice #:", inv_method: "Payment Method:", inv_status: "Status:", inv_paid: "PAID",
        inv_client: "Client Name:", inv_del_addr: "Delivery Address:", inv_res_code: "Reservation Code:", inv_res_table: "Table Number:", inv_res_date: "Date & Time:",
        inv_desc: "Description", inv_amt: "Amount", inv_sub: "Subtotal:", inv_del_fee: "Delivery Fee:", inv_tot: "Total Paid:", inv_thanks: "Thank you for dining with Food Fine!", inv_contact: "If you have any questions concerning this invoice, contact aimoneyhello@gmail.com"
    }
};

function changeLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });
    
    // update calendar locale dynamically if possible
    if(window.flatpickrInstanceDate) {
        // Re-init flatpickr with new locale
        initFlatpickr();
    }
}

let flatpickrInstanceDate = null;
let flatpickrInstanceTime = null;

function initFlatpickr() {
    if(flatpickrInstanceDate) flatpickrInstanceDate.destroy();
    if(flatpickrInstanceTime) flatpickrInstanceTime.destroy();
    
    flatpickrInstanceDate = flatpickr('.date-picker', {
        locale: currentLang === 'fr' ? 'fr' : 'default',
        dateFormat: "Y-m-d",
        minDate: "today"
    });
    flatpickrInstanceTime = flatpickr('.time-picker', {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Set default language
    changeLanguage('fr');
    initFlatpickr();

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            alert('Mobile menu clicked!');
        });
    }

    // Like buttons toggle
    const likeBtns = document.querySelectorAll('.like-btn');
    likeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const icon = btn.querySelector('i');
            if (icon.classList.contains('fa-regular')) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
                icon.style.color = '#D90429'; // Red color for liked
            } else {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
                icon.style.color = '';
            }
        });
    });

    // Add to Cart Logic
    const addBtns = document.querySelectorAll('.add-to-cart-btn');
    addBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const originalIcon = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-check"></i>';
            btn.style.backgroundColor = '#BA0424'; 
            setTimeout(() => {
                btn.innerHTML = originalIcon;
                btn.style.backgroundColor = ''; 
            }, 1500);

            const card = btn.closest('.dish-card');
            if(card) {
                const item = {
                    id: card.dataset.id + '_' + Date.now(),
                    name: card.querySelector('h4').textContent, // dynamic translated name
                    price: parseFloat(card.dataset.price),
                    img: card.dataset.img
                };
                cart.push(item);
                updateCartBadge();
                renderCart();
            }
        });
    });

    // Cart Icon Click -> Open Modal
    document.getElementById('cart-icon-btn').addEventListener('click', () => {
        document.getElementById('modal-overlay').classList.add('active');
        document.getElementById('cart-modal').classList.add('active');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        });
    });
});

// ----------------------------------------------------
// Vérifier le retour de FedaPay après une redirection
// ----------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    // Si on a un paramètre id (venant de FedaPay) ou payment=success
    if (urlParams.get('payment') === 'success' || urlParams.has('id')) {
        // Restaurer l'état
        const savedCart = localStorage.getItem('ff_cart');
        const savedTotal = localStorage.getItem('ff_total');
        const savedInvoice = localStorage.getItem('ff_invoice');
        const savedType = localStorage.getItem('ff_type');

        if (savedCart) cart = JSON.parse(savedCart);
        if (savedTotal) checkoutTotal = parseInt(savedTotal, 10);
        if (savedInvoice) invoiceData = JSON.parse(savedInvoice);
        if (savedType) currentCheckoutType = savedType;

        // Nettoyer l'URL sans rafraîchir pour ne pas que ça se déclenche en boucle
        window.history.replaceState({}, document.title, window.location.pathname);

        // Ouvrir la modale de succès
        setTimeout(() => {
            document.getElementById('modal-overlay').classList.add('active');
            document.getElementById('momo-modal').classList.add('active');
            document.getElementById('momo-form').style.display = 'none';
            document.getElementById('momo-loading').style.display = 'none';
            document.getElementById('momo-success').style.display = 'block';
            
            if(currentCheckoutType === 'reservation') {
                const code = 'FF-' + Math.random().toString(36).substr(2, 6).toUpperCase();
                const table = Math.floor(Math.random() * 20) + 1;
                document.getElementById('res-code').textContent = code;
                document.getElementById('res-table').textContent = table;
                document.getElementById('res-success-details').style.display = 'block';
                
                invoiceData.resCode = code;
                invoiceData.resTable = table;
            }

            // Notification WhatsApp via le backend
            const sendWhatsAppNotification = async () => {
                try {
'https://definition-production.up.railway.app/api/send-whatsapp', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            orderType: currentCheckoutType,
                            clientName: invoiceData.clientName || 'Client Food Fine',
                            amount: checkoutTotal,
                            items: cart,
                            delivery: invoiceData.hasDeliveryFee || false,
                            address: invoiceData.deliveryAddress || '',
                            resDetails: {
                                code: invoiceData.resCode,
                                table: invoiceData.resTable,
                                area: invoiceData.resArea,
                                date: invoiceData.resDate,
                                guests: invoiceData.resGuests
                            }
                        })
                    });
                } catch (e) {
                    console.error("Erreur notification WA", e);
                }
            };
            sendWhatsAppNotification();

            // Vider le localStorage pour la prochaine fois
            localStorage.removeItem('ff_cart');
            localStorage.removeItem('ff_total');
            localStorage.removeItem('ff_invoice');
            localStorage.removeItem('ff_type');
        }, 500);
    }
});

function updateMap() {
    const query = document.getElementById('delivery-address-check').value;
    if(query) {
        const loader = document.getElementById('map-loader');
        const iframe = document.getElementById('delivery-map');
        
        loader.style.display = 'flex';
        // Simulate loading time
        setTimeout(() => {
            iframe.src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
            
            iframe.onload = () => {
                loader.style.display = 'none';
            };
            setTimeout(() => { loader.style.display = 'none'; }, 1000); // Fallback
        }, 1500);
    }
}

const mapLocations = [
    "Fidjrossè, Cotonou", "Haie Vive, Cotonou", "Cadjèhoun, Cotonou", "Akpakpa, Cotonou",
    "Gbégamey, Cotonou", "Sikècodji, Cotonou", "Zongo, Cotonou", "Ganhi, Cotonou",
    "Agla, Cotonou", "Cocotiers, Cotonou", "St Michel, Cotonou", "Maroc, Cotonou"
];

function showSuggestions(val, boxId) {
    const box = document.getElementById(boxId);
    box.innerHTML = '';
    if (!val) {
        box.style.display = 'none';
        return;
    }
    
    const matches = mapLocations.filter(loc => loc.toLowerCase().includes(val.toLowerCase()));
    
    if (matches.length > 0) {
        box.style.display = 'block';
        matches.forEach(match => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${match}`;
            div.onclick = () => {
                const inputId = boxId === 'home-suggestions' ? 'delivery-address-check' : 'checkout-delivery-address';
                document.getElementById(inputId).value = match;
                box.style.display = 'none';
                if(boxId === 'home-suggestions') updateMap();
            };
            box.appendChild(div);
        });
    } else {
        box.style.display = 'none';
    }
}

document.addEventListener('click', (e) => {
    if(!e.target.closest('.delivery-location') && !e.target.closest('#cart-delivery-wrapper')) {
        document.querySelectorAll('.suggestions-box').forEach(b => b.style.display = 'none');
    }
});

function toggleCartDelivery() {
    requireDelivery = document.getElementById('require-delivery-cb').checked;
    const wrapper = document.getElementById('cart-delivery-wrapper');
    if (requireDelivery) {
        wrapper.style.display = 'block';
    } else {
        wrapper.style.display = 'none';
        document.getElementById('checkout-delivery-address').value = '';
    }
    renderCart(); // Re-render to update total
}

function updateCartBadge() {
    const badge = document.getElementById('cart-count');
    badge.textContent = cart.length;
    badge.style.transform = 'scale(1.5)';
    setTimeout(() => { badge.style.transform = 'scale(1)'; }, 200);
}

function renderCart() {
    const container = document.getElementById('cart-items-container');
    const totalEl = document.getElementById('cart-total-price');
    container.innerHTML = '';
    let total = 0;

    if(cart.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#888;">Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            total += item.price;
            container.innerHTML += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                        <div>
                            <h4 style="margin:0; font-size:1rem;">${item.name}</h4>
                            <p style="margin:0; color:#888;">${item.price} F</p>
                        </div>
                    </div>
                    <button class="cart-item-del" onclick="removeFromCart('${item.id}')">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `;
        });
    }
    
    if (requireDelivery && cart.length > 0) {
        total += 1;
    }
    totalEl.textContent = total + ' F';
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartBadge();
    renderCart();
}

function closeModals() {
    document.getElementById('modal-overlay').classList.remove('active');
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
    document.getElementById('momo-form').style.display = 'block';
    document.getElementById('momo-loading').style.display = 'none';
    document.getElementById('momo-success').style.display = 'none';
    document.getElementById('res-success-details').style.display = 'none';
}

function openSubscriptionModal(planName, price) {
    // Check if planName matches translated versions, if needed we can grab innerHTML of the card
    document.getElementById('sub-plan-name').textContent = planName;
    document.getElementById('sub-plan-price').textContent = price;
    document.getElementById('modal-overlay').classList.add('active');
    document.getElementById('sub-modal').classList.add('active');
}

function openReservationModal() {
    document.getElementById('modal-overlay').classList.add('active');
    document.getElementById('reservation-modal').classList.add('active');
    updateReservationPrice();
}

function updateReservationPrice() {
    const select = document.getElementById('res-area');
    const price = select.value ? parseFloat(select.value) : 0;
    document.getElementById('res-price').textContent = price + ' F';
}

let currentCheckoutType = ''; // 'cart', 'sub', 'reservation'
let checkoutTotal = 0;
let invoiceData = {};

function checkoutMobileMoney(type) {
    currentCheckoutType = type;
    invoiceData = {}; // reset
    
    if (type === 'cart') {
        if(cart.length === 0) {
            alert(currentLang === 'fr' ? "Votre panier est vide!" : "Your cart is empty!");
            return;
        }
        
        let total = cart.reduce((sum, item) => sum + item.price, 0);
        if (requireDelivery) {
            const deliveryAddress = document.getElementById('checkout-delivery-address').value;
            if(!deliveryAddress) {
                alert(currentLang === 'fr' ? "Veuillez entrer une adresse de livraison." : "Please enter a delivery address.");
                return;
            }
            invoiceData.deliveryAddress = deliveryAddress;
            invoiceData.hasDeliveryFee = true;
            total += 1;
        }
        checkoutTotal = total;
        
    } else if (type === 'sub') {
        checkoutTotal = parseFloat(document.getElementById('sub-plan-price').textContent);
        
    } else if (type === 'reservation') {
        const date = document.getElementById('res-date').value;
        const time = document.getElementById('res-time').value;
        const guests = document.getElementById('res-guests').value;
        const areaSelect = document.getElementById('res-area');
        
        if(!date || !time || !guests || !areaSelect.value) {
            alert(currentLang === 'fr' ? "Veuillez remplir tous les champs de réservation." : "Please fill all reservation fields.");
            return;
        }
        
        checkoutTotal = parseFloat(areaSelect.value);
        invoiceData.resDate = date + ' @ ' + time;
        invoiceData.resArea = areaSelect.options[areaSelect.selectedIndex].getAttribute('data-name');
        invoiceData.resGuests = guests;
    }

    document.getElementById('momo-total-price').textContent = checkoutTotal + ' F';
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
    
    // Afficher la modale de facturation pour demander le nom
    document.getElementById('modal-overlay').classList.add('active');
    document.getElementById('momo-modal').classList.add('active');
    document.getElementById('momo-form').style.display = 'block';
    document.getElementById('momo-loading').style.display = 'none';
    document.getElementById('momo-success').style.display = 'none';
    
    // Vider le champ nom par précaution
    document.getElementById('momo-name').value = '';
}

async function processPayment() {
    // Récupérer le nom
    invoiceData.clientName = document.getElementById('momo-name').value || "Client Food Fine";

    // Afficher brièvement un état de chargement dans la modale existante
    document.getElementById('momo-form').style.display = 'none';
    document.getElementById('momo-loading').style.display = 'block';

    // Le montant doit être un entier pour FedaPay
    const finalAmount = Math.round(checkoutTotal);

    // Si le montant est inférieur à 100 F, FedaPay refusera. On force un minimum de 100F.
    const amountToPay = finalAmount < 100 ? 100 : finalAmount;

    // Afficher brièvement un état de chargement
    document.getElementById('modal-overlay').classList.add('active');
    document.getElementById('momo-modal').classList.add('active');
    document.getElementById('momo-form').style.display = 'none';
    document.getElementById('momo-loading').style.display = 'block';
    document.getElementById('momo-success').style.display = 'none';

    // 1. Sauvegarder l'état actuel dans le localStorage car nous allons quitter la page
    localStorage.setItem('ff_cart', JSON.stringify(cart));
    localStorage.setItem('ff_total', checkoutTotal.toString());
    localStorage.setItem('ff_invoice', JSON.stringify(invoiceData));
    localStorage.setItem('ff_type', currentCheckoutType);

    // 2. Construire l'URL de retour
    const baseUrl = window.location.origin + window.location.pathname;
    const callbackUrl = baseUrl + "?payment=success";

    try {
const response = await fetch('https://definition-production.up.railway.app/api/create-transaction', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: amountToPay,
                description: currentCheckoutType === 'cart' ? 'Commande Food Fine' : (currentCheckoutType === 'sub' ? 'Abonnement Food Fine' : 'Réservation Table'),
                clientName: invoiceData.clientName || 'Client Food Fine',
                callbackUrl: callbackUrl
            })
        });

        const data = await response.json();

        if (data.success && data.url) {
            // 3. Redirection directe vers la page de paiement sécurisée de FedaPay
            window.location.href = data.url;
        } else {
            alert("Erreur lors de l'initialisation du paiement: " + (data.message || "URL introuvable"));
            closeModals();
        }
    } catch (error) {
        console.error("Erreur serveur:", error);
        alert("Erreur de connexion au serveur de paiement. Assurez-vous que le serveur Node (server.js) est lancé.");
        closeModals();
    }
}

function downloadInvoice() {
    const d = new Date();
    const invNum = 'INV-' + Math.floor(Math.random() * 100000);
    document.getElementById('inv-date').textContent = d.toLocaleDateString();
    document.getElementById('inv-number').textContent = invNum;
    document.getElementById('inv-client-name').textContent = invoiceData.clientName || 'Valued Customer';
    
    const deliveryP = document.getElementById('inv-delivery-p');
    if(invoiceData.deliveryAddress) {
        document.getElementById('inv-delivery-addr').textContent = invoiceData.deliveryAddress;
        deliveryP.style.display = 'block';
    } else {
        deliveryP.style.display = 'none';
    }
    
    const resDetails = document.getElementById('inv-res-details');
    if(currentCheckoutType === 'reservation') {
        document.getElementById('inv-res-code').textContent = invoiceData.resCode;
        document.getElementById('inv-res-table').textContent = invoiceData.resTable;
        document.getElementById('inv-res-datetime').textContent = invoiceData.resDate + ` (${invoiceData.resArea} / ${invoiceData.resGuests} pers)`;
        resDetails.style.display = 'block';
    } else {
        resDetails.style.display = 'none';
    }
    
    const tbody = document.getElementById('inv-items');
    tbody.innerHTML = '';
    
    let subtotal = 0;
    if (currentCheckoutType === 'cart') {
        cart.forEach(item => {
            tbody.innerHTML += `<tr><td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name}</td><td style="text-align: right; padding: 10px; border-bottom: 1px solid #ddd;">${item.price} F</td></tr>`;
            subtotal += item.price;
        });
        document.getElementById('inv-delivery-fee-row').style.display = invoiceData.hasDeliveryFee ? 'flex' : 'none';
        
        cart = [];
        document.getElementById('require-delivery-cb').checked = false;
        toggleCartDelivery();
        updateCartBadge();
        renderCart();
    } else if (currentCheckoutType === 'sub') {
        const planName = document.getElementById('sub-plan-name').textContent;
        tbody.innerHTML += `<tr><td style="padding: 10px; border-bottom: 1px solid #ddd;">Subscription: ${planName}</td><td style="text-align: right; padding: 10px; border-bottom: 1px solid #ddd;">${checkoutTotal} F</td></tr>`;
        subtotal = checkoutTotal;
        document.getElementById('inv-delivery-fee-row').style.display = 'none';
    } else if (currentCheckoutType === 'reservation') {
        tbody.innerHTML += `<tr><td style="padding: 10px; border-bottom: 1px solid #ddd;">Table Reservation (${invoiceData.resArea})</td><td style="text-align: right; padding: 10px; border-bottom: 1px solid #ddd;">${checkoutTotal} F</td></tr>`;
        subtotal = checkoutTotal;
        document.getElementById('inv-delivery-fee-row').style.display = 'none';
    }

    document.getElementById('inv-subtotal').textContent = subtotal + ' F';
    document.getElementById('inv-total').textContent = checkoutTotal + ' F';

    // Generer le code QR
    const qrContainer = document.getElementById('invoice-qrcode');
    qrContainer.innerHTML = ''; // Nettoyer
    const qrData = `FoodFine Facture #${invNum} | Date: ${d.toLocaleDateString()} | Total: ${checkoutTotal}F`;
    new QRCode(qrContainer, {
        text: qrData,
        width: 80,
        height: 80,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.L
    });

    setTimeout(() => {
        window.print();
        setTimeout(() => {
            closeModals();
        }, 1000);
    }, 500);
}

// Menu Mobile Toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Fermer le menu mobile quand on clique sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

const path = require('path');

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Root endpoint for health check
app.get('/', (req, res) => {
    res.send('Bhartiya Sidhant Payment Gateway Server is running!');
});

/**
 * Route: /api/create-order
 * Method: POST
 * Body: { amount: Number (in paise) }
 * Description: Generates a Razorpay Order ID for secure checkout.
 */
app.post('/api/create-order', async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid amount' });
        }

        const options = {
            amount: amount, // Amount in paise
            currency: 'INR',
            receipt: 'receipt_' + Date.now(),
        };

        const order = await razorpay.orders.create(options);

        if (!order) {
            return res.status(500).json({ success: false, message: 'Failed to create order' });
        }

        res.status(200).json({
            success: true,
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
            key_id: process.env.RAZORPAY_KEY_ID
        });

    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

/**
 * Route: /api/verify-payment
 * Method: POST
 * Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
 * Description: Cryptographically verifies the payment signature from Razorpay.
 */
app.post('/api/verify-payment', (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ success: false, message: 'Missing payment details' });
        }

        // Create the expected signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        // Compare signatures
        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // Payment is verified
            res.status(200).json({ success: true, message: 'Payment verified successfully' });
        } else {
            // Signature mismatch
            res.status(400).json({ success: false, message: 'Invalid signature' });
        }

    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// File-based database for Customer Purchase Leads
const fs = require('fs');
const LEADS_FILE = path.join(__dirname, 'leads.json');
const CMS_DATA_FILE = path.join(__dirname, 'cms_data.json');

/**
 * Route: /api/save-cms-data
 * Method: POST
 * Body: CMS configuration/data JSON object
 * Description: Stores CMS data securely on the server (disk or Firebase).
 */
app.post('/api/save-cms-data', async (req, res) => {
    try {
        const data = req.body;
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ success: false, message: 'Invalid CMS data' });
        }

        const firebaseDbUrl = process.env.FIREBASE_DB_URL;
        if (firebaseDbUrl) {
            const url = firebaseDbUrl.replace(/\/$/, '') + '/bs_admin_data.json';
            const resp = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (resp.ok) {
                return res.status(200).json({ success: true, message: 'CMS data saved to Firebase' });
            } else {
                throw new Error('Firebase save returned non-ok status: ' + resp.status);
            }
        }

        fs.writeFileSync(CMS_DATA_FILE, JSON.stringify(data, null, 2));
        res.status(200).json({ success: true, message: 'CMS data saved to disk' });
    } catch (error) {
        console.error('Error saving CMS data:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

/**
 * Route: /api/cms-data
 * Method: GET
 * Description: Retrieves stored CMS data (from Firebase or disk).
 */
app.get('/api/cms-data', async (req, res) => {
    try {
        const firebaseDbUrl = process.env.FIREBASE_DB_URL;
        if (firebaseDbUrl) {
            const url = firebaseDbUrl.replace(/\/$/, '') + '/bs_admin_data.json';
            const resp = await fetch(url);
            if (resp.ok) {
                const data = await resp.json();
                if (data && Object.keys(data).length > 0) {
                    return res.status(200).json(data);
                }
            }
        }

        if (fs.existsSync(CMS_DATA_FILE)) {
            const fileData = fs.readFileSync(CMS_DATA_FILE, 'utf8');
            try {
                const data = JSON.parse(fileData || '{}');
                return res.status(200).json(data);
            } catch (e) {
                return res.status(500).json({ success: false, message: 'Error parsing CMS file' });
            }
        }
        res.status(200).json({});
    } catch (error) {
        console.error('Error fetching CMS data:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

/**
 * Route: /api/save-lead
 * Method: POST
 * Body: { name, phone, email, source, product, amount, paymentId, date, status, details }
 * Description: Stores customer purchase details securely on the server.
 */
app.post('/api/save-lead', async (req, res) => {
    try {
        const lead = req.body;
        if (!lead.name || !lead.paymentId) {
            return res.status(400).json({ success: false, message: 'Invalid lead data' });
        }

        let leads = [];

        const firebaseDbUrl = process.env.FIREBASE_DB_URL;
        if (firebaseDbUrl) {
            const url = firebaseDbUrl.replace(/\/$/, '') + '/leads.json';
            const resp = await fetch(url);
            if (resp.ok) {
                const data = await resp.json();
                if (Array.isArray(data)) leads = data;
            }
            leads.push(lead);
            const putResp = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(leads)
            });
            if (putResp.ok) {
                return res.status(200).json({ success: true, message: 'Lead saved successfully to Firebase' });
            }
        }

        if (fs.existsSync(LEADS_FILE)) {
            const fileData = fs.readFileSync(LEADS_FILE, 'utf8');
            try {
                leads = JSON.parse(fileData || '[]');
            } catch (e) {
                leads = [];
            }
        }

        leads.push(lead);
        fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
        res.status(200).json({ success: true, message: 'Lead saved successfully' });
    } catch (error) {
        console.error('Error saving lead on server:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

/**
 * Route: /api/leads
 * Method: GET
 * Description: Retrieves all stored customer purchase details.
 */
app.get('/api/leads', async (req, res) => {
    try {
        let leads = [];
        const firebaseDbUrl = process.env.FIREBASE_DB_URL;

        if (firebaseDbUrl) {
            const url = firebaseDbUrl.replace(/\/$/, '') + '/leads.json';
            const resp = await fetch(url);
            if (resp.ok) {
                const data = await resp.json();
                if (Array.isArray(data)) {
                    return res.status(200).json({ success: true, leads: data });
                }
            }
        }

        if (fs.existsSync(LEADS_FILE)) {
            const fileData = fs.readFileSync(LEADS_FILE, 'utf8');
            try {
                leads = JSON.parse(fileData || '[]');
            } catch (e) {
                leads = [];
            }
        }
        res.status(200).json({ success: true, leads });
    } catch (error) {
        console.error('Error fetching leads from server:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

/**
 * Route: /api/save-leads
 * Method: POST
 * Body: Array of leads
 * Description: Overwrites the leads JSON database (used for deletes/status updates).
 */
app.post('/api/save-leads', async (req, res) => {
    try {
        const leads = req.body;
        if (!Array.isArray(leads)) {
            return res.status(400).json({ success: false, message: 'Invalid leads array' });
        }

        const firebaseDbUrl = process.env.FIREBASE_DB_URL;
        if (firebaseDbUrl) {
            const url = firebaseDbUrl.replace(/\/$/, '') + '/leads.json';
            const resp = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(leads)
            });
            if (resp.ok) {
                return res.status(200).json({ success: true, message: 'Leads database updated in Firebase' });
            }
        }

        fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
        res.status(200).json({ success: true, message: 'Leads database updated' });
    } catch (error) {
        console.error('Error saving leads list on server:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

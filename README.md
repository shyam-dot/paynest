# PayNest (demo UPI PWA)
1. `cp .env.example .env` and fill in your Firebase web app config.
2. Firebase console: enable Authentication > Anonymous; create a Firestore database; paste `firestore.rules`.
3. `npm install && npm run dev` (camera needs HTTPS or localhost) or `npm run build`.
4. Vercel: import repo, add the 6 VITE_FIREBASE_* env vars, deploy. vercel.json handles SPA routing.
All payments are simulated. Test QR text: `upi://pay?pa=example@upi&pn=Example&am=10&tn=Test`

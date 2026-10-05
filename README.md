# PayNest — UPI Payment PWA

A fast, modern, and lightweight UPI payment web app simulation built with React and Tailwind CSS.

## Features
- **Pure Front-End**: Runs 100% locally with zero external backend or Firebase dependencies.
- **No `.env` Needed**: Works straight out of the box with zero configuration.
- **Instant Demo Payments**: Enter any amount, add notes, and simulate real-time UPI payments with transaction loading and instant confirmation.
- **Transaction History**: Automatically saves payment receipts to browser storage (`localStorage`).
- **QR Code Scanner**: Scan UPI QR codes using your device camera or upload a QR image from your gallery.
- **PWA Ready**: Supports offline mode and installability on mobile devices.

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Sample UPI QR String
To test QR code scanning:
```
upi://pay?pa=merchant@okaxis&pn=Cafe%20Coffee&am=250&tn=Coffee%20and%20Snacks
```

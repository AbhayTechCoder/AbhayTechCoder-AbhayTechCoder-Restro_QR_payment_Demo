import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>Delicious Bites</h2>
          <p>Smart QR based restaurant ordering system.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="/about">About Us</a>
          <a href="/contact">Contact Us</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms & Conditions</a>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Email: support@deliciousbites.com</p>
          <p>Phone: +91 9793979220</p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Delicious Bites. All rights reserved.
      </div>
    </footer>
  );
}
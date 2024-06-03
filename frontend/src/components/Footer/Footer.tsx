// src/components/Footer/Footer.tsx

import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>© 2024 Namadej. جميع الحقوق محفوظة.</p>
      <p>
        <a href="/privacy-policy">سياسة الخصوصية</a> |{" "}
        <a href="/terms">الشروط والأحكام</a>
      </p>
    </footer>
  );
};

export default Footer;

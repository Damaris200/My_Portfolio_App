import "../styles/Footer.css";
import { FaGithub, FaLinkedin } from "react-icons/fa"; // Import GitHub and LinkedIn icons

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Damaris Portfolio. All Rights Reserved.</p>
      <div className="social-links">
        <a href="https://github.com/Damaris200" target="_blank" rel="noopener noreferrer">
          <FaGithub size={30} /> {/* GitHub Icon */}
        </a>
        <a href="https://linkedin.com/in/ateh-damaris-b1393029b" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={30} /> {/* LinkedIn Icon */}
        </a>
      </div>
    </footer>
  );
}

export default Footer;

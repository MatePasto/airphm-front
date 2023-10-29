import FacebookIcon from '@mui/icons-material/Facebook'
import './Footer.css';

function Footer() {
  return (
    <div className="footer-content">
        <FacebookIcon className="facebook-img" />
        <p><strong>Airphm</strong> / Copyright &copy; {new Date().getFullYear()}</p>
    </div>
  );
}

export default Footer;
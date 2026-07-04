import './Footer.css';

const footerLinks = {
  Products: ['New Arrivals', "Men's", "Women's", 'Sale'],
  Account:  ['Login', 'Register', 'My Cart'],
  Help:     ['About Us', 'Contact', 'Returns'],
};

function Footer() {
  return (
    <footer className="footer">

      {/* Top grid */}
      <div className="footer__top">

        {/* Brand */}
        <div>
          <div className="footer__brand">SneakerHub</div>
          <p className="footer__tagline">
            Premium sneakers for every occasion. Your next favourite pair is here.
          </p>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title} className="footer__col">
            <div className="footer__col-title">{title}</div>
            {links.map(link => (
              <a key={link} href="#">{link}</a>
            ))}
          </div>
        ))}

      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <span>© 2026 SneakerHub — Built by Mon Chivorn · SmallLab Cohort 3</span>
        <span>Final Project</span>
      </div>

    </footer>
  );
}

export default Footer;
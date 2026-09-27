function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <span>🍹</span>
        OM SARAVANAN BAVAN
      </div>

      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#menu">Menu</a>
        <a href="#icebar">Ice Bar</a>
        <a href="#reviews">Reviews</a>
        <a href="#contact">Contact</a>
      </div>

      <a
        className="call-button"
        href="tel:+919600838369"
      >
        📞 Call Now
      </a>
    </nav>
  );
}

export default Navbar;
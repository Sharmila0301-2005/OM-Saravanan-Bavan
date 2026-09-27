function Contact() {
  return (
    <section className="contact-section" id="contact">

      <div className="section-heading">

        <p>CONTACT US</p>

        <h2>
          Visit OM SARAVANAN BAVAN
        </h2>

      </div>

      <div className="contact-grid">

        <div className="contact-card">

          <div className="contact-icon">
            📍
          </div>

          <h3>Location</h3>

          <p>
            Somalpuram Road,
            <br />
            Kaspa-A, Ambur,
            <br />
            Near Gandhi Selai
          </p>

        </div>

        <div className="contact-card">

          <div className="contact-icon">
            📞
          </div>

          <h3>Phone</h3>

          <p>
            +91 9600838369
          </p>

          <a
            href="tel:+919600838369"
            className="small-call"
          >
            Call Now
          </a>

        </div>

        <div className="contact-card">

          <div className="contact-icon">
            🕒
          </div>

          <h3>Orders</h3>

          <p>
            Call us directly for
            <br />
            juice and Ice Bar orders.
          </p>

        </div>

      </div>

    </section>
  );
}

export default Contact;
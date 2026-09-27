function Hero() {
  return (
    <section className="hero" id="home">

      <div className="hero-content">

        <p className="small-title">
          🍹 FRESH • COOL • DELICIOUS
        </p>

        <h1>
          OM SARAVANAN <span>BAVAN</span>
        </h1>

        <h2>
          Ice Factory & Cool Drinks
        </h2>

        <p className="hero-description">
          Fresh juices, delicious mixed drinks and
          quality ice products made for every occasion.
        </p>

        <div className="hero-buttons">

          <a href="#menu" className="primary-btn">
            View Menu
          </a>

          <a
            href="tel:+919600838369"
            className="secondary-btn"
          >
            📞 Order by Phone
          </a>

        </div>

      </div>

      <div className="hero-fruits">
        <div>🍎</div>
        <div>🍊</div>
        <div>🍋</div>
        <div>🍉</div>
        <div>🍍</div>
      </div>

    </section>
  );
}

export default Hero;
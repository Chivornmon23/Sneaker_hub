import './Hero.css';

function Hero() {
  return (
    <section className="hero">

      {/* Background image */}
      <img
        className="hero__image"
        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&q=80"
        alt="Featured sneaker"
      />

      {/* Dark overlay */}
      <div className="hero__overlay" />

      {/* Content */}
      <div className="hero__content">

        <p className="hero__eyebrow">New Season — 2026</p>

        <h1 className="hero__title">
          Just Move<br />Faster.
        </h1>

        <p className="hero__sub">
          Premium kicks for every stride — from the track to the street.
        </p>

        <div className="hero__buttons">
          <a href="#" className="btn btn--white">Shop Now</a>
          <a href="#" className="btn btn--outline-white">View All</a>
        </div>

      </div>
    </section>
  );
}

export default Hero;
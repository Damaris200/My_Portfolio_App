import "../styles/Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Hi, I'm Ateh Damaris Anyah</h1>
        <p>A passionate Software Engineer which believe in IT every problem has a solution</p>
        <div className="buttons">
          <a href="/projects" className="btn">View My Work</a>
          <a href="/contact" className="btn btn-alt">Contact Me</a>
        </div>
      </div>
    </section>
  );
}

export default Hero;

import "../styles/AboutPage.css";

function AboutPage() {
  return (
    <section className="about">
      <h1>About Me</h1>
      <div className="about-container">
        <img src="/images/profile.jpg" alt="Profile" className="profile-pic" />
        <div className="bio">
          <p>
            Hi, I'm <strong>Ateh Damaris Anyah</strong>, a passionate Software Engineer with experience in designing and developing scalable web applications. I enjoy solving IT problems which I told a course IT Support Specailist on Google and earn a Certificate and bringing innovative ideas to life.
          </p>
          <p>
            My journey started with a love for technology, leading me to specialize in IT Support, frontend and backend development. I thrive in collaborative environments and continuously seek to enhance my skills.
          </p>
        </div>
      </div>

      <h2>My Journey</h2>
      <div className="timeline">
        <div className="timeline-item">
          <span className="year">2023</span>
          <p>A current Software Engineering Bachelors student at the ICT University of Cameroon, I started in 2023, will be graduating in 2026/2027.</p>
        </div>
        <div className="timeline-item">
          <span className="year">2024</span>
          <p>Completed Google IT Support Professional Certification.</p>
        </div>
        <div className="timeline-item">
          <span className="year">2023 to date today</span>
          <p>Built my multiple full-stack web applications.</p>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;

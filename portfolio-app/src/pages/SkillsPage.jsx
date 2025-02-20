import "../styles/SkillsPage.css";

const skills = {
  "Programming Languages": ["JavaScript", "Python", "Java", "C++"],
  "Frontend Frameworks": ["React", "Vue.js", "Tailwind CSS"],
  "Backend Technologies": ["Node.js", "Django", "Express.js"],
  "Databases": ["MongoDB", "MySQL", "SQLite"],
  "Tools & Platforms": ["Git", "Docker", "Firebase", "Linux"],
  "IT Support": ["Troubleshooting", "System maintenance", "Security practice", "Network support"]
};

function SkillsPage() {
  return (
    <section className="skills">
      <h1>Skills</h1>
      <div className="skills-container">
        {Object.entries(skills).map(([category, skillList]) => (
          <div key={category} className="skill-category">
            <h2>{category}</h2>
            <ul>
              {skillList.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SkillsPage;

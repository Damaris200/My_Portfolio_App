import "../styles/ProjectsPage.css";

const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A personal portfolio to showcase my projects and skills.",
    image: "/images/portfolio.png",
    technologies: ["React", "CSS", "JavaScript", "node.js"],
    liveLink: "#",
    codeLink: "#"
  },
  
  {
    id: 2,
    title: "Todo-List App",
    description: "A productivity app for tracking tasks and goals.",
    image: "/images/todolist.png",
    technologies: ["React", "Plain CSS"],
    liveLink: "https://todo-app-henna-xi.vercel.app/",
    codeLink: "https://github.com/Damaris200/to-do-list-app"
  },
  {
    id: 3,
    title: "A School Management System",
    description: "A school management system that manages student admission status and sent them notification messages.",
    image: "/images/school.png",
    technologies: ["React", "express.js", "SQLite"],
    liveLink: "#",
    codeLink: "https://github.com/Damaris200/School_Management_System"
  },
];

function ProjectsPage() {
  return (
    <section className="projects">
      <h1>Projects</h1>
      <div className="projects-container">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <img src={project.image} alt={project.title} className="project-img" />
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p className="tech-stack">
              <strong>Technologies:</strong> {project.technologies.join(", ")}
            </p>
            <div className="project-links">
              <a href={project.liveLink} target="_blank" className="btn">View Project</a>
              <a href={project.codeLink} target="_blank" className="btn">Source Code</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProjectsPage;

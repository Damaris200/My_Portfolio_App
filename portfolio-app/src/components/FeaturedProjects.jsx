import "../styles/FeaturedProjects.css";

const projects = [
  {
    id: 1,
    title: "Todo-List App",
    description: "A todo-list web application for managing tasks efficiently.",
    image: "/images/todolist.png",
    link: "/projects",
  },
  {
    id: 2,
    title: "My Portfolio App",
    description: "A portfolio website built with React and Vite using Node.js for the Backend and SQLite for the database.",
    image: "/images/portfolio.png",
    link: "/projects",
  },
  {
    id: 3,
    title: "A School Management System",
    description: "A school management system that manages student admission status and sent them notification messages.",
    image: "/images/school.png",
    link: "/projects",
  },
];

function FeaturedProjects() {
  return (
    <section className="featured-projects">
      <h2>Featured Projects</h2>
      <div className="project-grid">
        {projects.map((project) => (
          <div className="project-card" key={project.id}>
            <img src={project.image} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.link} className="btn">View More</a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProjects;

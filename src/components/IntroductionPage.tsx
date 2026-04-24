import React from 'react';

const IntroductionPage: React.FC = () => {
    return (
        <div>
            <section className="hero">
                <h1>Welcome to My Portfolio</h1>
                <p>
                    Hi, I'm Deepak! I specialize in Test Automation, MERN Stack Development, Data Engineering, and AI projects.
                </p>
            </section>
            <section className="featured-projects">
                <h2>Featured Projects</h2>
                <ul>
                    <li><a href="https://github.com/Deepak10010/Playwright-Automation-Framework">Playwright Automation Framework</a></li>
                    <li><a href="https://github.com/Deepak10010/MERN-Task-Manager">MERN Task Manager</a></li>
                    <li><a href="https://github.com/Deepak10010/AI-Healthcare-Copilot">AI Healthcare Copilot</a></li>
                    <li><a href="https://github.com/Deepak10010/Fitness-Tracker-App">Fitness Tracker App</a></li>
                    <li><a href="https://github.com/Deepak10010/Spotify-Data-Engineering">Spotify Data Engineering</a></li>
                    <li><a href="https://github.com/Deepak10010/PitchCraft">PitchCraft</a></li>
                </ul>
            </section>
            <section className="tech-stack">
                <h2>Tech Stack</h2>
                <div>
                    <span>React</span>
                    <span>TypeScript</span>
                    <span>Node.js</span>
                    <span>MongoDB</span>
                    <span>Python</span>
                    <span>Playwright</span>
                    <span>AWS</span>
                </div>
            </section>
            <section className="call-to-action">
                <h2>Get in Touch!</h2>
                <p>If you'd like to collaborate on any projects or have any inquiries, feel free to reach out!</p>
                <button>Contact Me</button>
            </section>
        </div>
    );
};

export default IntroductionPage;
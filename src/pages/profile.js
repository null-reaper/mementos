import * as React from 'react'
import { Link } from 'gatsby'
import {Helmet} from "react-helmet";
import { PostCard } from '../components/PostCard'

import '../styles/app.css'
import logo from '../images/pos.jpg';
import icon from '../images/icon.png';
import education from '../images/education.png';
import cmu from '../images/cmu.jpg';

// Images

import linkedin from "../images/linkedin.png"
import gmail from "../images/gmail.png"
import pos_tagging from '../images/nlp/pos_tagging/example.jpg';

const ProfilePage = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Profile</title>
      </Helmet>

      <div className="viewport">

        <div className="viewport-top">
            {/* The main header section on top of the screen */}
            <header className="profile-head"> 
                <div className="container">
                    <div className="site-mast">
                        <div className="site-mast-left">
                        </div>
                        <div className="site-mast-right">
                        <a href="https://www.linkedin.com/in/clivegomes/" className="site-nav-item" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src={linkedin} alt="LinkedIn" /></a>
                        <a href="mailto:cliveg@andrew.cmu.edu" className="site-nav-item" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src={gmail} alt="Email" /></a>
                        </div>
                    </div>


                    <div className="site-banner">
                        <h1 className="site-banner-title">Profile</h1>
                        <p className="site-banner-desc">Learn About Me</p>
                    </div>

                    <nav className="site-nav">
                        <div className="site-nav-right">
                            <Link className="site-nav-button" to="/projects">Projects</Link>
                        </div>
                    </nav>
                </div>
            </header>

            <main className="site-main">
              <div className="profile-header">
                <img src={ education } alt="o" />
                <h3>Education</h3>
              </div>

              <div className="school">
                <img src={ cmu } alt="CMU" />
                <h4>Carnegie Mellon University</h4>
                <h5 className="school-first-h5">Department: School of Computer Science</h5>
                <h5>Degree: MS in Artificial Intelligence and Innovation</h5>
                <h5>Duration: May 2020 ~ May 2022</h5>
                <h5>Location: Pittsburgh, PA</h5>
                <h5>QPA: 4.07 (A/A+)</h5>
              </div>

              <div className="school">
                <img src={ cmu } alt="CMU" />
                <h4>Illinois Institute of Technology</h4>
                <h5 className="school-first-h5">Department: Armour College of Engineering</h5>
                <h5>Degree: BS in Electrical &amp; Computer Engineering</h5>
                <h5>Duration: Aug 2017 ~ May 2020</h5>
                <h5>Location: Chicago, IL</h5>
                <h5>GPA: 4.0/4.0</h5>
              </div>
              
              <div className="school">
                <img src={ cmu } alt="CMU" />
                <h4>École Nationale Supérieure de l'Électronique et de ses Applications</h4>
                <h5 className="school-first-h5">Program: Spring Semester Study Abroad</h5>
                <h5>Duration: Jan 2019 ~ May 2019</h5>
                <h5>Location: Cergy-Pontoise, France</h5>
                <h5>Letter Grade: A</h5>
              </div>

              <div className="school">
                <img src={ cmu } alt="CMU" />
                <h4>Osaka City University</h4>
                <h5 className="school-first-h5">Program: Summer Semester Study Abroad</h5>
                <h5>Duration: June 2019 ~ July 2019</h5>
                <h5>Location: Osaka, Japan</h5>
                <h5>Letter Grade: A</h5>
              </div>

              <div className="profile-header">
                <img src={ education } alt="o" />
                <h3>Experience</h3>
              </div>

              <div>
                <h4>Research Assistant</h4>
                <h5>Carnegie Mellon University School of Computer Science · Part-time</h5>
                <h5>Aug 2021 - Present</h5>
                <h5>Pittsburgh, Pennsylvania, United States</h5>
                <p>This position involves participation in the Alexa Prize Taskbot Challenge, the goal of which is to design and build an Alexa skill for Recipe/DIY tasks. My primary roles include Dialog Management and UX Design.</p>
                <p>Status: Currently in Semi-Finals</p>
              </div>

              <div>
                <h4>Capstone Project</h4>
                <h5>SkyHigh Ventures · Part-time</h5>
                <h5>Aug 2021 - Present</h5>
                <h5>Pittsburgh, Pennsylvania, United States</h5>
                <p>Final Year Capstone Project for the MSAII program at Carnegie Mellon. The goal of this project is to design and build a Fluency Tutor software that can assess reading difficulties and provide content at the appropriate level to help users get better. AI techniques involved in this project include Speech Processing/NLP, Reinforcement Learning and Recommendation Systems.</p>
              </div>

              <div>
                <h4>NLP Intern</h4>
                <h5>Brain Technologies, Inc. · Internship</h5>
                <h5>Jun 2021 - Aug 2021 · 3 mos</h5>
                <h5>San Mateo County, California, United States (Remote)</h5>
                <ul>
                  <li>Reviewed the company's "Natural" app and documented fixes and ideas for improvements</li>
                  <li>Designed and built prototypes for a variety of projects including multi-turn query handling, vague intent understanding, goal tracking and user recommendations</li>
                  <li>Set up a basic testing framework for internal evaluation of the NLP backend</li>
                </ul>
              </div>

              <div>
                <h4>Software Engineer</h4>
                <h5>Mott MacDonald · Internship</h5>
                <h5>Oct 2020 - Dec 2020 · 3 mos</h5>
                <h5>Mumbai, Maharashtra, India</h5>
                <ul>
                  <li>Automated over 90% of the spec sheet generation process by creating a desktop application</li>
                  <li>Built a search interface with a statistical analysis dashboard to manage construction projects</li>
                  <li>Delivered a presentation on ML applications in construction projects attended by 150 employees</li>
                </ul>
              </div>

              <div>
                <h4>Teaching Assistant</h4>
                <h5>Illinois Institute of Technology · Part-time</h5>
                <h5>Aug 2019 - Dec 2019 · 5 mos</h5>
                <h5>Chicago, Illinois, United States</h5>
              </div>

            </main>

        </div>

        <div className="viewport-bottom">
            {/* The footer at the very bottom of the screen */}
            <footer className="site-foot">
                <div className="site-foot-nav container">
                    <div className="site-footer">
                      <Link to="https://github.com/null-reaper">Null Reaper</Link> © 2022
                    </div>
                </div>
            </footer>

        </div>
        </div>

      
    </div>
  )
}

export default ProfilePage

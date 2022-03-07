import * as React from 'react'
import { Link } from 'gatsby'
import {Helmet} from "react-helmet";

import '../styles/app.css'

import linkedin from "../images/linkedin.png"
import gmail from "../images/gmail.png"

export function ProjectPage(props) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{props.title}</title>
      </Helmet>

      <div className="viewport">

        <div className="viewport-top">
            {/* The main header section on top of the screen */}
            <header className="site-head"> 
            <div className="container">
                    <div className="site-mast">
                        <div className="site-mast-left">
                        </div>
                        <div className="site-mast-right">
                        <a href="https://www.linkedin.com/in/clivegomes/" className="site-nav-item" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src={linkedin} alt="LinkedIn" /></a>
                        <a href="mailto:cliveg@andrew.cmu.edu" className="site-nav-item" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src={gmail} alt="Email" /></a>
                        </div>
                    </div>
                    <nav className="site-nav">
                        <div className="site-nav-right">
                            <Link className="site-nav-button" to="/">Projects</Link>
                        </div>
                    </nav>
                </div>
            </header>

            <main className="site-main">
                <div className="container">
                    <article className="content">
                        <figure className="post-feature-image center-img">
                            <img src={ props.image } alt="Project Preview" />
                        </figure>
                        <section className="post-full-content">
                            <h1 className="content-title"> { props.title }</h1>

                            <section
                                className="content-body load-external-scripts"
                            />
                            { props.children }
                        </section>
                    </article>
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
  );
}

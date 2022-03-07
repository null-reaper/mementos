import * as React from 'react'
import { Link } from 'gatsby'
import {Helmet} from "react-helmet";
import { MyPlanet } from '../components/MyPlanet'

import '../styles/app.css'

const HomePage = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Projects</title>
      </Helmet>

      <div className="viewport">

        <div className="viewport-top">
            {/* The main header section on top of the screen */}
            <header className="site-head"> 
                <div className="container">
                    <div className="site-mast">
                        <div className="site-mast-left">
                          <p>A</p>
                        </div>
                        <div className="site-mast-right">
                            <a href="/" className="site-nav-item" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/twitter.svg" alt="Twitter" /></a>
                        </div>
                    </div>

                    <div className="site-banner">
                      <div className="planet">
                      <MyPlanet className="planetobj"/>
                      </div>
                    </div>

                </div>
            </header>

            <main className="site-main">
            </main>

        </div>

        <div className="viewport-bottom">
            {/* The footer at the very bottom of the screen */}
            <footer className="site-foot">
                <div className="site-foot-nav container">
                    <div className="site-foot-nav-left">
                        <Link to="/">D</Link> © 2022 &mdash; Published with <a className="site-foot-nav-item" href="https://ghost.org" target="_blank" rel="noopener noreferrer">Ghost</a>
                    </div>
                    <div className="site-foot-nav-right">
                        <p>E</p>
                    </div>
                </div>
            </footer>

        </div>
        </div>

      
    </div>
  )
}

export default HomePage

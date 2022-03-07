import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'
import { Link } from 'gatsby'

import '../../../styles/app.css'

// Images

import example from '../../../images/speech/audio_captioning/example.png';

const AudioCaptioningPage = () => {
  return (
    <ProjectPage image={ example } title="Audio Captioning" >    
      <article className="project-article">
        <h1>Task</h1>
        <p>This project is Subtask #1 of the DCASE2022 Challenge (details can be found <Link to="https://dcase.community/challenge2022/#automated-audio-captioning-and-language-based-audio-retrieval" className="post-card">here</Link>). The goal is to generate a general audio content description using free text. This competition will be held during the period of 15 March, 2022 - 1 July, 2022. Documentation of our approach &amp; results shall be posted here after the competition ends. Please check back later.</p>
      </article>
    </ProjectPage>
  )
}

export default AudioCaptioningPage

import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'
import { Link } from 'gatsby'

import '../../../styles/app.css'

// Images

import example from '../../../images/speech/audio_retrieval/example.jpg';

const AudioRetrievalPage = () => {
  return (
    <ProjectPage image={ example } title="Language-based Audio Retrieval" >    
      <article className="project-article">
        <h1>Task</h1>
        <p>This project is Subtask #2 of the DCASE2022 Challenge (details can be found <Link to="https://dcase.community/challenge2022/#automated-audio-captioning-and-language-based-audio-retrieval" className="post-card">here</Link>). The goal is to build a retrieval system that takes a free-form textual description as an input and is supposed to rank audio signals in a fixed dataset based on their match to the given description. This competition will be held during the period of 15 March, 2022 - 1 July, 2022. Documentation of our approach &amp; results shall be posted here after the competition ends. Please check back later.</p>
      </article>
    </ProjectPage>
  )
}

export default AudioRetrievalPage

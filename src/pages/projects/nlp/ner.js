import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'

import '../../../styles/app.css'

// Images

import example from '../../../images/nlp/ner/example.jpg';

const NERPage = () => {
  return (
    <ProjectPage image={ example } title="Named Entity Recognition" >    
      <article className="project-article">
        <h1>Task</h1>
        <p>The goal of this project is to implement a Hidden Markov Model (HMM) for Parts of Speech (POS) tagging; tags for test sentences are computed from the transition and emmission probabilities in the HMM using the popular Viterbi algorithm which is a dynamic programming approach used to compute the "best" path through state transitions in HMM models.</p>
      </article>
    </ProjectPage>
  )
}

export default NERPage

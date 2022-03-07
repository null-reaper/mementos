import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'

import '../../../styles/app.css'

// Images

import example from '../../../images/speech/fluency_tutor/example.png';
import speech_analyzer from '../../../images/speech/fluency_tutor/speech_analyzer.png';
import system from '../../../images/speech/fluency_tutor/system.png';

const FluencyTutorPage = () => {
  return (
    <ProjectPage image={ example } title="Fluency Tutor" >    
      <article className="project-article">
        <h1>Task</h1>
        <p>This is a final year Capstone project for the MSAII program at Carnegie Mellon University sponsored by Sky High Ventures. The goal of this project is to design and build a Fluency Tutor software that can assess reading difficulties and provide content at the appropriate level to help users get better. AI techniques involved in this project include Speech Processing/NLP, Reinforcement Learning and Recommendation Systems. Target age group for users of this software is 7~12 years.</p>
      </article>
      <article className="project-article">
        <h1>Approach</h1>
        <p>The Fluency Tutor project involves four main components:</p>
        <ol>
          <li><b>Speech Analyzer:</b> Processes the audio recording of the user and assess their fluency</li>
          <li><b>Exercise Recommender:</b> Uses the speech assessment to provide reading exercises at or slightly above the user’s reading level</li>
          <li><b>Report Generator:</b> Summarizes key performance metrics that instructors/parents may use to help plan lessons for the student (users)</li>
          <li><b>UI:</b> A simple prototype interface to demonstrate the usefulness of the above modules</li>
        </ol>
        <p>A high-level diagram summarizing the connections between the different components is shown below.</p>
        <img src={system} alt="System Design"/> 
        <p>The entire process involves the following steps:</p>
        <ol>
          <li>displaying an exercise on the screen</li>
          <li>having the user read it and record them</li>
          <li>track and analyze the audio real-time as well as later to gather metrics</li>
          <li>use the metrics to select the next exercise for the user to read</li>
          <li>aggregate the metrics to generate a report at the end of the session</li>
        </ol>
        <p>The Speech Analyzer and Exercise Recommender are two of the big components of this project and will be briefly discussed in the following sections.</p>
      </article>
      <article className="project-article">
        <h1>Speech Analyzer</h1>
        <p>In order to assess the user’s fluency, we plan to look at 3 aspects of the recorded speech:</p>
        <ol>
          <li>phoneme accuracy</li>
          <li>reading speed (as well as pauses)</li>
          <li>intonation</li>
        </ol>
        <p>Our initial design for this module is shown in the figure below. The idea is to, first, convert the text given to the user (to read) into its constituent phonemes and then track the audio to compare the phonemes in the recorded audio with the expected phonemes. By performing this analysis, we can measure the phoneme accuracy (checking against the expected phonemes), pauses in speech (looking for the SIL phoneme) and also identify areas of the sentence the user has trouble reading (we can look at the duration of each phoneme to see which ones the user drags on).</p>
        <img src={speech_analyzer} alt="Speech Analyzer"/> 
        <p>In parallel with the above module, we also perform FFT on the audio recording and identify the F0 frequency at each word of the sentence. Using a set of heuristics, we then assess the user’s prosody (for e.g., the F0 typically goes up on the “key” point of the sentence; like, when asked a question, the F0 should be highest when saying the word that answers the question).</p>
      </article>
      <article className="project-article">
        <h1>Exercise Recommender</h1>
        <p>Using our Speech Analyzer, we are able to get an N x 1 vector (where N is the number of unique phonemes) containing a score (some function of phoneme accuracy, pauses and prosody) for each of the phonemes. We maintain such a vector to evaluate the user’s continual performance. Additionally, we also store an N x N confusion matrix representing how similar or different any two phonemes in English are. By combining these two, we evaluate every sentence (exercise) in our database by looking at the phoneme distribution of the words in the sentence; so, sentences that have more phonemes that the user had a low score on in the past would be evaluated as a “difficult” sentence for the user. Accordingly, we are able to track the user’s current ability, score exercises for each individual user, and then select the most appropriate exercise for that user.</p>
      </article>
      <article className="project-article">
        <h1>Conclusion</h1>
        <p>This article briefly describes our design for the Fluency Tutor software that our team is building as part of our Capstone Project. As this project is still in development, many details have not been fleshed out, while others have been intentionally omitted from the article (due to NDAs). If you would like to know more about the project or its progress, feel free to email me personally at cgomes1@hawk.iit.edu.</p>
      </article>
    </ProjectPage>
  )
}

export default FluencyTutorPage

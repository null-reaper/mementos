import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'

import '../../../styles/app.css'

// Images

import example from '../../../images/cv/face_id/example.png';
import approach from '../../../images/cv/face_id/approach.png';

const FaceIDPage = () => {
  return (
    <ProjectPage image={ example } title="Face ID (Verification)" >    
      <article className="project-article">
      <h1>Task</h1>
        <p>In this task, we are given a dataset of images containing pictures of faces from 7000 people (multiple pictures per person). The goal is to obtain appropriate representations for these face images so that we can look at a new picture of one of these 7000 people and check if it matching a specific person's face (the ID). This is a follow-up to the "Face Recognition" project. </p>
      </article>
      <article className="project-article">
      <h1>Approach</h1>
      <p>For this problem, we will reuse the neural network built for the "Face Recognition" project as it has learned good representations of the people's faces. We shall obtain representations for two three-channel 224x224 images&mdash;the source image (that we want to verify) and the target image (the ID to compare against)&mdash; by extracting them from the end of the multiple Convolutional layers, i.e. the first feed-forward (fully-connected) layer. These two vector representations will then be compared by some distance metric such as Euclidean Distance, Cosine Similarity, etc. Exact details will be added once this project is complete.</p>
      <img src={approach} alt="High-Level Diagram" /> 
      </article>
      <article className="project-article">
      <h1>Progress</h1>
      <p>The time period for this project is March 1 - March 17. Accordingly, results of this project will be posted after this deadline. Please check back later.</p>
      </article>
    </ProjectPage>
  )
}

export default FaceIDPage

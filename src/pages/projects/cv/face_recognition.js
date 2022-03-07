import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'

import '../../../styles/app.css'

// Images

import example from '../../../images/cv/face_recognition/example.png';
import approach from '../../../images/cv/face_recognition/approach.png';

const FaceRecPage = () => {
  return (
    <ProjectPage image={ example } title="Face Recognition" >    
      <article className="project-article">
      <h1>Task</h1>
        <p>In this task, we are given a dataset of images containing pictures of faces from 7000 people (multiple pictures per person). The goal is to obtain appropriate representations for these face images so that we can look at a new picture of one of these 7000 people and correctly identify who it belongs to.</p>
      </article>
      <article className="project-article">
      <h1>Approach</h1>
      <p>This problem will be treated as a multi-label classification task. The input will be a three-channel 224x224 image which will be passed to a multiple Convolutional layers followed by a feed-forward (fully-connected) network (this is shown in the figure below). The exact architecture of this network will be added once this project is complete.</p>
      <img src={approach} alt="High-Level Diagram" /> 
      </article>
      <article className="project-article">
      <h1>Progress</h1>
      <p>The time period for this project is March 1 - March 17. Accordingly, results of this project will be posted after this deadline. Please check back later.</p>
      </article>
    </ProjectPage>
  )
}

export default FaceRecPage

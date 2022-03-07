import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'

import '../../../styles/app.css'

// Images

import example from '../../../images/rl/pusher_2d/example.png';

const Pusher2DPage = () => {
  return (
    <ProjectPage image={ example } title="Solving the Pusher 2D Environment" >    
      <article className="project-article">
        <h1>Task</h1>
        <p>This task is a modification to Four Rooms problem in the Imitation Learning project (finding a path between a start position and a goal) except that, in the Pusher2D environment, we have to find a path from the start position to a box (located at some position) and then to the goal (only after having collected the box by landing on its position). To do this, Probabilistic Ensemble and Trajectory Sampling (PETS), a Model-based Reinforcement Learning algorithm, was used.</p>
      </article>
      <article className="project-article">
        <h1>Task</h1>
        <p></p>
      </article>
    </ProjectPage>
  )
}

export default Pusher2DPage

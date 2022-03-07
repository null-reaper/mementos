import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'

import '../../../styles/app.css'

// Images

import example from '../../../images/rl/imitation/example.jpg';
import bc1 from '../../../images/rl/imitation/bc1.png';
import bc2 from '../../../images/rl/imitation/bc2.png';
import dag1 from '../../../images/rl/imitation/dag1.png';
import dag2 from '../../../images/rl/imitation/dag2.png';
import samples from '../../../images/rl/imitation/samples.png';
import four_rooms from '../../../images/rl/imitation/four_rooms.png';
import gcbc from '../../../images/rl/imitation/gcbc.png';
import cartpole from '../../../images/rl/imitation/cartpole.png';

const ImitationPage = () => {
  return (
    <ProjectPage image={ example } title="Imitation Learning" >    
      <article className="project-article">
        <h1>Task</h1>
        <p>This project includes two subparts. In the first, we solve the CartPole_v0 openai environment (pole balancing) using two Imitation Learning techniques: Behavior Cloning &amp; DAGGER. In the next task, we work on the Four Rooms environment (pathfinding) using Goal-Conditioned Behavior Cloning (GCBC).</p>
      </article>
      <article className="project-article">
        <h1>Subtask #1: Cart Pole</h1>
        <p>In this task, the goal is to select an action (move left, don't move, or move right) to keep the pole balanced; the episode terminates if the pole touches the ground. A screenshot of this environment is shown below:</p>
        <img src={cartpole} alt="Cart Pole Environment" /> 
      </article>
      <article className="project-article">
        <h1>Behavior Cloning</h1>
        <p>In this approach, we performed Behavior Cloning where the model was trained by learning from a buffer containing transitions labelled by an expert. The results after 100 iterations (each uses 100 expert episodes to train on) are shown below:</p>
        <img src={bc1} alt="BC Results" /> 
        <p>We also looked at how the number of expert episodes used to train on during each iteration (1, 10, 50 or 100) affects the results of Behavior Cloning by looking at the number of iterations required for the reward to converge (see plots below).</p>
        <img src={bc2} alt="BC Dependence on Expert Episodes" /> 
      </article>
      <article className="project-article">
        <h1>DAGGER</h1>
        <p>The exact same steps as before were repeated but, this time, using DAGGER. Results are shown below.</p>
        <img src={dag1} alt="DAGGER Results" /> 
        <p>And here are the plots for the reward's dependence on the number of expert episodes used per iteration; as before, we tried 1, 10, 50 and 100 episodes, respectively.</p>
        <img src={dag2} alt="DAGGER Dependence on Expert Episodes" /> 
      </article>
      <article className="project-article">
        <h1>Behavior Cloning vs DAGGER</h1>
        <p>The problem with BC is that it performs poorly when it encounters states that the expert has not labelled. Dagger, on the other hand, does better at this since it periodically asks the expert to relabel such unseen states. Due to this, we would expect Dagger to reach the optimal reward faster than BC, and the plots (reward/loss) will also be less noisy (which is caused by unseen states in BC). We can verify both of these in the current experimental setup. As seen in the second set of plots for each implementation, the reward plot for Dagger does increase faster than that of BC (see the plot for keys=1). Additionally, the loss plot for Dagger is much less noisy than BC's.</p>
      </article>
      <article className="project-article">
        <h1>Subtask #2: Four Rooms</h1>
        <p>In the second task, the goal is to find a path from a start position to a goal in the Four Rooms environment (a screenshot is shown below). Allowed actions are up, down, left and right.</p>
        <img src={four_rooms} alt="Four Rooms Environment" /> 
      </article>
      <article className="project-article">
        <h1>Expert Algorithm</h1>
        <p>First, we created a simple function to find the shortest path between any two points in the Four Rooms environment (2D grid) using Breadth-First Search (BFS). Sample trajectories obtained from these are shown below.</p>
        <img src={samples} alt="Expert Trajectories" /> 
      </article>
      <article className="project-article">
        <h1>Goal-Conditioned Behavior Cloning (GCBC)</h1>
        <p>We then used the previous function as the "expert" to perform GCBC. More specifically, we used trajectories generated by this expert to train a goal-conditioned policy conditioned on both state and goal. results are shown below:</p>
        <img src={gcbc} alt="GCBC Results" /> 
      </article>
    </ProjectPage>
  )
}

export default ImitationPage

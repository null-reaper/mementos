import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'

import '../../../styles/app.css'

// Images

import example from '../../../images/rl/mountain_climber/example.png';
import disc from '../../../images/rl/mountain_climber/disc.png';
import q_approx from '../../../images/rl/mountain_climber/q_approx.png';
import tile from '../../../images/rl/mountain_climber/tile.png';
import weights from '../../../images/rl/mountain_climber/weights.png';

const MountainCarPage = () => {
  return (
    <ProjectPage image={ example } title="Performing Linear Approximate Q-Learning" >    
      <article className="project-article">
        <h1>Task</h1>
        <p>The goal of this was to implement Q-learning with linear function approximation to solve the mountain car environment. More specifically, we want the car to reach the flag at the top-right peak by learning the right action&mdash;move left, do nothing, or move right&mdash;at any given time.</p>
      </article>
      <article className="project-article">
        <h1>Feature Engineering</h1>
        <p>The state of the mountain car is given by its velocity and position. These properties are (intentionally) bounded to a range of -0.07 to 0.07 units for the velocity and -1.2 to -0.6 for the position. The 2D visualization of this grid space (which has been discretized into a 5x5 grid) is shown below.</p>
        <img id="mc_disc" src={disc} alt="Mountain Car Discretized State Space"/> 
        <p>A problem with this approach is that this model does not generalize well. For example, the green and red points in the grid above are close to each other, but since they are in different squares, they will be treated as completely distinct. To resolve this issue, we overlayed a second grid over the first one, slightly offsetted, and have two values for each state&mdash;the two grid squares (zero-indexed starting at the bottom-left square) that the point lies within. This new representation is shown in the figure below. As an example, the green point in the grid below will be represented by the values (6, 39)&mdash;this will be represented as a vector with a "1" at position 6 and 39, and 0 elsewhere.</p>
        <img id="mc_tile" src={tile} alt="Mountain Car Tiled State Space"/> 
      </article>
      <article className="project-article">
        <h1>Q-Learning Implementation</h1>
        <p>The weights vector (whose length is equal to the vector size of the representation, plus a bias term) was zero-initialized (there were three such vectors for each of the available actions), while the initial state of the mountain car was as ollows: position=-0.8 and velocity=0 (stationary at the lowest point of the valley). Thw reward was set to -1, regardless of the action taken (to ensure that the goal is achieved using minimum actions). Weights were then updated using the following equation.</p>
        <img id="mc_weights" src={weights} alt="Weights Update Equation"/> 
        <p>The Q-Value in the above equation was approximated using the following linear function.</p>
        <img id="mc_qval" src={q_approx} alt="Q-Value Linear Approximation"/> 
        <p>After performing the update step, we select the best action to take next, which is the one with the highest Q value at this point. With a prability &epsilon; (a hyperparameter&mdash;here, &epsilon;=0.05), we ignore the selection process and perform a random action. The entire process is then repeated again. The result of this Q-Learning implementation is shown below (the maximum number of iterations per episode was set to 200).</p>
        <iframe class="vid" src="https://www.youtube.com/embed/OF4oKJ6FVVY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>    <p>As can be seen, the mountain car reaches the goal for the first time within a few tries and then (almost) consistently reaches the goal after&mdash;whenever the "random action" event is triggered, the car does not reach the top during that and the next one or two episodes. Now compare this with the single-grid feature implementation discussed earlier.</p>
        <p>Clearly, the overlaying grids implementation is way better than the latter&mdash;the single-grid approach learns extremely slowly, and may or may not reach the goal (since "the random action" event may throw it off repeatedly).</p>
        <iframe class="vid" src="https://www.youtube.com/embed/uRJGxMr2sjs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </article>
      <article className="project-article">
        <h1>Conclusion</h1>
        <p>We have successfully built a q-learning model that learns to drive a 2D car up a mountain, under the influence of gravity. Even though the Q-values were approximated using a simple linear function with a bias term, the model performs really well. This is, however, a simple learning task; a more complex example may need a better approximation function to provide sufficiently good results.</p>
      </article>
    </ProjectPage>
  )
}

export default MountainCarPage

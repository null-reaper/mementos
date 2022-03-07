import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'

import '../../../styles/app.css'

// Images

import example from '../../../images/rl/cart_pole/example.png';
import a2c_a from '../../../images/rl/cart_pole/a2c_a.png';
import a2c1 from '../../../images/rl/cart_pole/a2c1.png';
import a2c10 from '../../../images/rl/cart_pole/a2c10.png';
import a2c100 from '../../../images/rl/cart_pole/a2c100.png';
import baseline_a from '../../../images/rl/cart_pole/baseline_a.png';
import baseline from '../../../images/rl/cart_pole/baseline.png';
import reinforce_a from '../../../images/rl/cart_pole/reinforce_a.png';
import reinforce from '../../../images/rl/cart_pole/reinforce.png';
import dqn from '../../../images/rl/cart_pole/dqn.png';

const CartPolePage = () => {
  return (
    <ProjectPage image={ example } title="Solving the Cart Pole Environment" >    
      <article className="project-article">
        <h1>Task</h1>
        <p>The goal of this project is to solve the CartPole_v0 environment from the openai gym. In this task, the system must select an appropriate action (move left, don't move or move right) to keep the pole balanced (the episode ends if it touches the ground). A number of Deep Reinforcement Learning algorithms were tried and compared against each other. Specifically, four solutions to the Cart Pole environment were implemented: REINFORCE, REINFORCE w/ Baseline, N-step Advantage Actor Critic, and DQN. Each algorithm was run for 5 IID trials with 3500 timesteps each.</p>
      </article>
      <article className="project-article">
        <h1>REINFORCE</h1>
        <p>The first approach tried was the standard REINFORCE algorithm. Pseudocode for this is shown below:</p>
        <img src={reinforce_a} alt="REINFORCE Algorithm" /> 
        <p>Below are the average returns for 3500 timesteps over 5 trials:</p>
        <img src={reinforce} alt="REINFORCE Returns" /> 
      </article>
      <article className="project-article">
        <h1>REINFORCE w/ Baseline</h1>
        <p>Next, a baseline network was added to the previous code. The modified pseudocode is shown below:</p>
        <img src={baseline_a} alt="REINFORCE w/ Baseline Algorithm" /> 
        <p>Here are the results:</p>
        <img src={baseline} alt="REINFORCE w/ Baseline Returns" /> 
      </article>
      <article className="project-article">
        <h1>REINFORCE w/o vs w/ Baseline</h1>
        <p>As seen in the plots, the REINFORCE with baseline implementation reaches a near-200 reward in slightly fewer episodes than REINORCE without a baseline (the upward curve is steeper). This happens because adding a baseline to the loss function reduces the variance, which leads to more stable weight updates and, consequently, faster convergence to the optimal value.</p>
      </article>
      <article className="project-article">
        <h1>N-step Advantage Actor Critic</h1>
        <p>The next method tried was the classic N-step Advantage Actor Critic. Pseudocode and results for 3 different values of N (1, 10 and 100) are shown below:</p>
        <img src={a2c_a} alt="N-step A2C Algorithm" /> 
        <img src={a2c1} alt="1-step A2C Returns" /> 
        <img src={a2c10} alt="10-step A2C Returns" /> 
        <img src={a2c100} alt="100-step A2C Returns" /> 
      </article>
      <article className="project-article">
        <h1>N-step A2C vs REINFORCE w/ &amp; w/o Baseline</h1>
        <p>When the N is sufficiently large (when N → ∞), t + N is always greater than T for all values of t (notation is the same as in the pseudocode). In this case, the V_end term is always 0, and the min(t+N-1, T-1) is always T-1. This makes it equivalent to the expression of REINFORCE with a baseline. In addition to this, if we do not use the critic network at all, it becomes equivalent to REINFORCE without baseline.</p>
      </article>
      <article className="project-article">
        <h1>Deep Q Network (DQN)</h1>
        <p>Finally, a DQN with experience replay was trained. Note: This was a Double Deep Q Network, i.e. it had two sets of weights: an online network (for action selection) and a target network (for value estimation). The plot of average returns for 200 timesteps over 5 trials is shown below:</p>
        <img src={dqn} alt="DQN Returns" /> 
      </article>
      <article className="project-article">
        <h1>DQN vs Policy Gradient Methods</h1>
        <p>Policy gradient methods (all except DQN) can often converge at a local minimum. They also usually have high variance, which can cause it to take longer to converge. We noticed this when we ran our experiments as, occasionally, 1 of our 5 trials would perform terrible out of nowhere, and when we reran the exact same code it would work great. While adding a baseline and using advantage in a2c helps, the replay buffer in DQN is simply better at handling variance in data. Another point we noticed is that, in the policy gradient pseudocode, we sample an entire trajectory at every training step; in DQN, we only sample a single transition. Interaction with the environment to get the next state and reward so often may be another reason why policy gradient methods take longer to show an increase in returns.</p>
      </article>
    </ProjectPage>
  )
}

export default CartPolePage

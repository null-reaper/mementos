import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'

import '../../../styles/app.css'

// Images

import boltzmann_eq from '../../../images/rl/bandits/boltzmann_eq.png';
import boltzmann from '../../../images/rl/bandits/boltzmann.png';
import compare from '../../../images/rl/bandits/compare.png';
import e_greedy from '../../../images/rl/bandits/e_greedy.png';
import example from '../../../images/rl/bandits/example.png';
import optimistic from '../../../images/rl/bandits/optimistic.png';
import ucb_formula from '../../../images/rl/bandits/ucb_formula.png';
import ucb from '../../../images/rl/bandits/ucb.png';

const BanditsPage = () => {
  return (
    <ProjectPage image={ example } title="The Multi-Arm Bandit Problem" >    
      <article className="project-article">
        <h1>Task</h1>
        <p>The goal of this project is to efficiently select arms in a 10-armed bandits setting to obtain the highest cumulative reward. The true (hidden) reward for each arm is drawn from a normal distribution N(1, 1)–which is unknown to the agent. The agent can pick an arm to pull and obtain a noisy reward N(r(a), 1) (where a is the selected arm and r(a) is its true reward). To solve this task, different exploration methods were tried out and were compared across 20 experiments of 1000 timesteps. The following sections present the results of this task.</p>
      </article>
      <article className="project-article">
        <h1>ϵ-Greedy Exploration</h1>
        <p>In this approach, the arm with the highest estimated reward (running average) is picked again with a probability of 1-ϵ (exploitation); at other times, a random arm is picked (exploration). The result of this approach for different values of ϵ (0, 0.001, 0.01, 0.1 and 1) is shown in the plot below.</p>
        <img className="half-img" src={e_greedy} alt="E-Greedy Experiments" /> 
      </article>
      <article className="project-article">
        <h1>Optimistic Initialization</h1>
        <p>Here, we overestimate our initial guesses for the obtainable reward from each arm by setting it to some constant. Values tried were 0, 1, 2, 5 and 10. </p>
        <img className="half-img" src={optimistic} alt="Optimistic Initialization Experiments" /> 
      </article>
      <article className="project-article">
        <h1>UCB Exploration</h1>
        <p>In UCB Exploration, we compute an upper confidence bound on the reward estimates using the formula below:</p>
        <img src={ucb_formula} alt="UCB Formula" /> 
        <p>In the formula, t is the current timestep, N(a) is the number of times arm “a” has been picked within the t timesteps, and c is a hyperparameter. Different values of c were tried (0, 1, 2 and 5), and the results are shown below.</p>
        <img className="half-img" src={ucb} alt="UCB Experiments" /> 
      </article>
      <article className="project-article">
        <h1>Boltzmann Exploration</h1>
        <p>This method involves learning a numerical preference P(a) for each action (bandit) instead of simply estimating the reward. This value is computed using the following equation:</p>
        <img src={boltzmann_eq} alt="Boltzmann Equation" /> 
        <p>Here, Q(a) denotes the estimated reward for arm “a” and τ is a hyperparameter. Values tried were 1, 3, 10, 30 and 100.</p>
        <img className="half-img" src={boltzmann} alt="Boltzmann Experiments" /> 
      </article>
      <article className="project-article">
        <h1>Comparison</h1>
        <p>The hyperparameter that obtained the highest expected reward using each approach was selected and plotted on a single figure. Results are shown below.</p>
        <img className="half-img" src={compare} alt="Comparison of All 4 Approaches" /> 
      </article>
      <article className="project-article">
        <h1>Conclusion</h1>
        <p>We have tried 4 different exploration methods to try and obtain the hughes cumulative reward in a multi-arm bandit setting. As seen in the previous figure, UCB obtained the highest reward followed by Optimistic Initialization, Boltzmann and ϵ-Greedy Exploration. This shows that, while ϵ-Greedy is the most common exploration technique used, other simple exploration methods outperform ϵ-Greedy in a multi-arm bandit setting.</p>
      </article>
    </ProjectPage>
  )
}

export default BanditsPage

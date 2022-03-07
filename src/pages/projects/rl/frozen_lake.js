import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'

import '../../../styles/app.css'

// Images

import async_policy1 from '../../../images/rl/frozen_lake/async_policy1.png';
import async_value1 from '../../../images/rl/frozen_lake/async_value1.png';
import example from '../../../images/rl/frozen_lake/example.png';
import sync_policy1 from '../../../images/rl/frozen_lake/sync_policy1.png';
import sync_policy2 from '../../../images/rl/frozen_lake/sync_policy2.png';
import sync_policy3 from '../../../images/rl/frozen_lake/sync_policy3.png';
import sync_value1 from '../../../images/rl/frozen_lake/sync_value1.png';
import sync_value2 from '../../../images/rl/frozen_lake/sync_value2.png';
import sync_value3 from '../../../images/rl/frozen_lake/sync_value3.png';

const FrozenLakePage = () => {
  return (
    <ProjectPage image={ example } title="Solving the Frozen Lake Environment" >    
      <article className="project-article">
        <h1>Task</h1>
        <p>The goal of this project is to solve the FrozenLake_v0 environment on OpenAI Gym. This environment is a 2x2 grid where each cell can take on one of four values:</p>
        <ol>
          <li>S: starting point (safe)</li>
          <li>F: frozen surface (safe)</li>
          <li>H: hole (unsafe – game over)</li>
          <li>G: goal (safe – end run)</li>
        </ol>
        <p>The agent starts at the S cell and must navigate to the G cell without landing on an H cell. Allowed actions are Up (U), Down (D), Left (L) and Right (R). </p>
        <p>To solve this task, Synchronous and Asynchronous versions of Value and Policy Iteration were explored. The following sections present the results of these experiments. Specifically, each section shows the value-function heatmap, solution to the environment (action map) and number of iterations required to reach convergence. Results are presented for 4x4 and 8x8 versions of the environment.</p>
      </article>
      <article className="project-article">
        <h1>Synchronous Policy Iteration</h1>
        <img src={sync_policy1} alt="Synchronous Policy Iteration Cycles" /> 
        <img src={sync_policy2} alt="Synchronous Policy Iteration Solution" /> 
        <img src={sync_policy3} alt="Synchronous Policy Iteration Heatmap" /> 
      </article>
      <article className="project-article">
        <h1>Synchronous Value Iteration</h1>
        <img src={sync_value1} alt="Synchronous Value Iteration Cycles" /> 
        <img src={sync_value2} alt="Synchronous Value Iteration Solution" /> 
        <img src={sync_value3} alt="Synchronous Value Iteration Heatmap" /> 
      </article>
      <article className="project-article">
        <h1>Asnchronous Policy Iteration</h1>
        <img src={async_policy1} alt="Asynchronous Policy Iteration Cycles" /> 
        <img src={sync_policy2} alt="Asynchronous Policy Iteration Solution" /> 
        <img src={sync_policy3} alt="Asynchronous Policy Iteration Heatmap" /> 
      </article>
      <article className="project-article">
        <h1>Asynchronous Value Iteration</h1>
        <img src={async_value1} alt="Asynchronous Value Iteration Cycles" /> 
        <img src={sync_value2} alt="Asynchronous Value Iteration Solution" /> 
        <img src={sync_value3} alt="Asynchronous Value Iteration Heatmap" /> 
      </article>
    </ProjectPage>
  )
}

export default FrozenLakePage

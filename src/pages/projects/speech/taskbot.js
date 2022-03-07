import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'

import '../../../styles/app.css'

// Images

import example from '../../../images/speech/taskbot/example.jpg';

const TaskbotPage = () => {
  return (
    <ProjectPage image={ example } title="Recipe &amp; DIY Taskbot" >    
      <article className="project-article">
        <h1>Task</h1>
        <p>This project is sponsored by the Alexa Team. More specifically, the Alexa Prize Taskbot Challenge is a competition among 10 schools (selected by Amazon based on an initial proposal), the goal of which is to design and build an Alexa skill for Recipe/DIY tasks. As part of Carnegie Mellon’s team, my primary roles include Dialog Management and UX Design. In this article, I shall briefly describe the task, and some of the things I have worked on so far.</p>
      </article>
      <article className="project-article">
        <h1>Overview</h1>
        <p>The basic sequence of events for the taskbot are as follows:</p>
        <ol>
          <li>Identify the user’s intent (do they want a recipe or a DIY task)</li>
          <li>If the ask for a specific recipe/task, retrieve results from the WholeFoods/Wikihow API</li>
          <li>Score the results and provide them to the user in a sorted manner (based on rating, cooking time, etc.)</li>
          <li>Let the user browse through the options</li>
          <li>Once the user selects an option, display the list of ingredients/tools they will need for the task</li>
          <li>If the user is ready, guide them through the recipe/DIY task step-by-step until the user has completed the task</li>
        </ol>
        <p>An additional challenge is that the skill must be able to  handle users that have the headless Echo device (audio only) as well as the Echo Show device (audio + screen). As such, independent functionalities targeting each user group needs to be considered.</p>
      </article>
      <article className="project-article">
        <h1>Contributions</h1>
        <p>Below are short descriptions on some of the things I worked on to date:</p>
        <ul>
          <li>Dialog Management: Worked on the “strategy selection” module that involved coming up with potential intents that should be supported by the system and designing functions to handle these intents, once identified. I was also responsible for integrating components built by other team members into the dialog system.</li>
          <li>Intents &amp; Slots: Built a rule-based model (using entity recognition and ConceptNet) to classify recipe vs DIY queries and extract the recipe/task name.</li>
          <li>Navigation: Designed intents (and corresponding parsers) for navigational queries (like “go back” or “next step” and coded handlers for each of these.</li>
          <li>UI/UX: Worked on the layout and individual event screens (ingredients page, steps page, etc.) for both recipe and DIY tasks.</li>
          <li>Recommendation: Built a recommendation system for recipes based on keywords, ingredients, etc.</li>
          <li>Sorting &amp; Filters: Built functionality to allow users to reorder and filter recipe results by rating, cooking time, servings, calories, number of ingredients/steps, or dietary preferences.</li>
          <li>Advanced Search: Designed a module that allows users to search recipes by certain properties (as in the previous step) instead of needing to specify an exact recipe name.</li>
        </ul>
      </article>
      <article className="project-article">
        <h1>Conclusion</h1>
        <p>In this article, I have briefly described the goal of the Alexa Prize Taskbot Challenge and my own contributions to our team’s current progress. At the time of writing this post, our team has advanced to the semi-finals and is now working on improving our Taskbot by monitoring and addressing issues identified in user logs and by adding new functionality to make the UX richer. If you would like to know more about the project or its progress, feel free to email me personally.</p>
      </article>
    </ProjectPage>
  )
}

export default TaskbotPage

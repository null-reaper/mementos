import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'

import '../../../styles/app.css'

// Images

import example from '../../../images/speech/pizza_ordering/example.jpg';
import state_diagram from '../../../images/speech/pizza_ordering/state_diagram.png';

const PizzaOrderingPage = () => {
  return (
    <ProjectPage image={ example } title="Pizza Ordering w/ Alexa" >    
      <article className="project-article">
        <h1>Task</h1>
        <p>The goal of this project was to build an Alexa Skill for a multi-turn Pizza Ordering system. The skill was built using the "flask_ask" library in Python and hosted using an ngrok server. Details of the implementation and a demo of the skill have been provided in this report.</p>
      </article>
      <article className="project-article">
        <h1>State Diagram</h1>
        <img src={state_diagram} alt="State Diagram"/> 
      </article>
      <article className="project-article">
        <h1>State Descriptions</h1>
        <p>Here, we describe what occurs at each state in the above state diagram.</p>
        <ul>
          <li><b>Start:</b> This is the entry point to our system. A welcome message is provided to the user and they are asked if they would like to order a pizza. If they say yes, the task continues; if no, we provide a goodbye message; if any other intent (or ununderstood intent) is provided, we confirm with the user whether they want to order a pizza or not.</li>
          <li><b>Size:</b> Here, we ask the user what size pizza they want. If an appropriate size is identified (we support small, medium, large and extra large), the task continues. If an unsupported size is provided, we tell the user what sizes are available and ask if they still want to order one of those. If they wish to cancel (since their size isn’t available), we go to the “Cancel Confirmation” state. Else, we once again ask what size the user wants.</li>
          <li><b>Size Confirmation:</b> Next, we simply repeat the size selected by the user to confirm that we got it right. If yes, the task continues; else, we ask the size again.</li>
          <li><b>Toppings:</b> Like size, we now ask what toppings the user wants. For simplicity, we support 6 toppings (more can be easily added, but making alexa read all of them is bothersome): extra cheese, mushrooms, olives, pepperoni, ham and bacon. If all toppings mentioned by the user are among these, we continue with the task. If some of the toppings mentioned are not in the supported list, we only take the ones that are, and ask the user if they are okay with only those. If no supported toppings are mentioned, we tell the user what toppings are supported. As with size, users have the choice to cancel the order if the toppings they want aren’t available. Otherwise, we again ask the user what toppings (among the supported ones) they want.</li>
          <li><b>Toppings Confirmation:</b> Again, we simply repeat the toppings selected by the user to confirm that we got it right. If yes, the task continues; else, we ask the size again.</li>
          <li><b>More Pizza:</b> Finally, we repeat the full order of the user (size and toppings) and ask the user if they would like to order another pizza. If yes, we go back to the “Size” state and repeat the process. If not, the skill exits with a goodbye message.</li>
          <li><b>Cancel Confirmation:</b> Here, we ask the user if they wish to cancel the order. If yes, we end with a goodbye message. Otherwise, we go back to the previous step of the task. For simplicity, we split this state into two: “Size Cancel” and “Toppings Cancel.” This way, we didn’t need to implement the logic of figuring out what the previous state was.</li>
          <li><b>End:</b> This is the terminal state of the skill. If, for some reason, the skill did not automatically terminate, we let the user know that the skill has ended and they should restart the skill if they wish to redo the task.</li>
        </ul>
      </article>
      <article className="project-article">
        <h1>Intents</h1>
        <p>To support the implementation of the pizza ordering system, 5 intents were relevant (only 2 of which were custom, while the rest were built-in ones).</p>
        <p><b>Built-In</b></p>
        <ul>
          <li><b>AMAZON.YesIntent:</b> Used to denote an affirmative response.</li>
          <li><b>AMAZON.NoIntent:</b> Used to denote a negative response.</li>
          <li><b>AMAZON.FallbackIntent:</b> Used as a general “Else” intent.</li>
        </ul>
        <p><b>Custom</b></p>
        <ul>
          <li><b>SizeIntent:</b> User response containing the pizza size</li>
          <li><b>ToppingsIntent:</b> User response containing the pizza toppings.</li>
        </ul>
      </article>
      <article className="project-article">
        <h1>Slots</h1>
        <p>For the custom intents, 2 custom slots were created:</p>
        <ul>
          <li><b>Size:</b> Represents the pizza size. Supported values include: “small”, “medium”, “large” and “extra large”. This is a single value slot.</li>
          <li><b>Topping:</b> Represents the pizza toppings. Supported values include: “extra cheese”, “mushrooms”, “olives”, “pepperoni”, “ham” and “bacon”. This is a multi-value slot (users can say one or more toppings).</li>
        </ul>
      </article>
      <article className="project-article">
        <h1>Sample Utterances</h1>
        <p>The following sample utterances were used for the 2 custom intents. Note: words in { } represent slots.</p>
        <p><b>SizeIntent</b></p>
        <ul>
          <li>i would like a &#123;size&#125; pizza</li>
          <li>a &#123;size&#125; pizza</li>
          <li>one &#123;size&#125; pizza</li>
          <li>gimme a &#123;size&#125; pizza</li>
          <li>&#123;size&#125; pizza</li>
          <li>&#123;size&#125;</li>
          <li>get me a &#123;size&#125; pizza</li>
          <li>i want one &#123;size&#125; pizza</li>
          <li>i want a &#123;size&#125; pizza</li>
        </ul>
        <p><b>ToppingsIntent</b></p>
        <ul>
          <li>how about &#123;toppings&#125;</li>
          <li>do you have &#123;toppings&#125;</li>
          <li>&#123;toppings&#125; please</li>
          <li>&#123;toppings&#125;</li>
          <li>i want &#123;toppings&#125;</li>
          <li>i would like &#123;toppings&#125;</li>
        </ul>
      </article>
      <article className="project-article">
        <h1>Demo</h1>
        <p>Finally, here's a demo of the skill on Alexa:</p>
        <iframe class="vid" src="https://www.youtube.com/embed/_Ab8RONLlBo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </article>
    </ProjectPage>
  )
}

export default PizzaOrderingPage

import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'

import '../../../styles/app.css'

// Images

import cleaning from '../../../images/nlp/question_generation/cleaning.png';
import example from '../../../images/nlp/question_generation/example.jpg';
import grammar from '../../../images/nlp/question_generation/grammar.png';
import model1 from '../../../images/nlp/question_generation/model1.png';
import model2 from '../../../images/nlp/question_generation/model2.png';
import questions from '../../../images/nlp/question_generation/questions.png';
import relevance from '../../../images/nlp/question_generation/relevance.png';
import tokenize from '../../../images/nlp/question_generation/tokenize.png';
import validity from '../../../images/nlp/question_generation/validity.png';

const QGPage = () => {
  return (
    <ProjectPage image={ example } title="Question Generation" >    
      <article className="project-article">
        <h1>Task</h1>
        <p>The goal of this task is to build a Question Generation system. The input for this task is passage (taken from Wikipedia), and the system must output a set of 5 "best" questions that it can come up with. Questions must be in complete sentences, be grammatically correct, and have an obvious answer in the passage (i.e. no inference questions).</p>
      </article>
      <article className="project-article">
        <h1>Data Cleanining</h1>
        <p>We start with a few preprocessing steps to prepare the passage for question generation. First, we remove multiple whitespaces within the text using the neattext library. We also eliminate non-ascii characters from sentences as these may not work well for the question generation task. Finally, we use the contractions library to expand contractions such as “wasn’t” to “was not.”</p>
        <img src={cleaning} alt="Data Cleaning" /> 
        <p>We also used coreference resolution to replace pronouns with their corresponding subjects to prevent generating questions like "What did he do?" , where the "he" referred to is ambiguous.</p>
      </article>
      <article className="project-article">
        <h1>Sentence Tokenization</h1>
        <p>In our approach, the idea was to break down the passage into individual sentences and rephrase them as questions. Since very short sentences may not produce good questions, we decided to eliminate sentences with 3 or fewer words. This also took out titles/subtitles from text which shouldn't really be converted into questions.</p>
        <img src={tokenize} alt="Sentence Tokenization" /> 
      </article>
      <article className="project-article">
        <h1>The Model</h1>
        <p>We used a pre-trained T5-base model, which we fine-tuned with SQuAD dataset. For question generation, we encoded the specific input to the model, and then returned a question as output.</p>
        <img src={model1} alt="Model Description #1" /> 
        <p>The input to the model includes 4 parts, first an answer token, then either an NER or a full sentence as the answer. We then add a context token with the former sentence, current sentence and next sentence as context. In this way, we generate a set of questions based on each answer and each sentence’s context from our model.</p>
        <img src={model2} alt="Model Description #2" /> 
      </article>
      <article className="project-article">
        <h1>Scoring Questions</h1>
        <p>Now that we have a set of candidate questions, our final step is to score, reorder and pick the top 5 questions as the output. We used 3 metrics to perform this scoring: grammar, validity &amp; relevance. The next few sections talk about these.</p>
      </article>
      <article className="project-article">
        <h1>Grammar</h1>
        <p>To assess the grammatical correctness of the generated questions, we finetuned a BERT classifier using the CoLA (Corpus of Linguistic Ability) dataset. This contains a list of sentences labelled as 1 if they are grammatically correct and 0 if not. The input to the model is formatted as a CLS token which is required for BERT classification tasks followed by the sentence and a SEP token which is the terminal character.</p>
        <img src={grammar} alt="Grammar Scoring Model" /> 
      </article>
      <article className="project-article">
        <h1>Validity</h1>
        <p>The same BERT model was fine-tuned using the SQUAD dataset mentioned earlier. Pairs of questions and answers from the dataset were passed into the model in the format shown below, and these were given a label of “1” indicating valid question-answer pairs. To generate invalid pairs, the questions and answers were shuffled and mismatched, proving a label of “0”..</p>
        <img src={validity} alt="Validity Scoring Model" /> 
      </article>
      <article className="project-article">
        <h1>Relevance</h1>
        <p>Finally, to check for relevance, we leverage the Sentence-Transformers library. Using a pre-trained CrossEncoder, we evaluate a generated question based on the sentence it was generated from. With the Cross-Encoder architecture, we can provide the sentence and question as input, and retrieve a relevance score between 0-1.</p>
        <img className="w40" src={relevance} alt="Relevance Scoring Model" /> 
      </article>
      <article className="project-article">
        <h1>Output</h1>
        <p>Each of the three scores is normalized between 0-1, and we average all 3 scores to sort the generated questions. We then return the top 5 questions as output. For a passage regarding a Twitter hack, the following questions were generated:</p>
        <img src={questions} alt="Output Questions" /> 
      </article>
      <article className="project-article">
        <h1>Conclusion</h1>
        <p>Our system was able to generate good (grammatically correct, valid and relevant), however, you may have observed that the questions we generated have quite monotonous patterns ("What is this?", "What is that?"). This might be due to the training set we used are dominated by “what” type of questions. As a result, we might want to increase the variety of training set in future. Besides, our model required all the inputs in lowercase, this made certain capitalized words appear in lowercase in our outputs. This might be solved if we can recognize these words in output and correct them.</p>
      </article>
    </ProjectPage>
  )
}

export default QGPage

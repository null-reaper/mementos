import * as React from 'react'
import { Link } from 'gatsby'
import { ProjectPage } from '../../../components/ProjectPage'

import '../../../styles/app.css'

// Images

import data_stats from '../../../images/nlp/pos_tagging/data_stats.png';
import data_text from '../../../images/nlp/pos_tagging/data_text.png';
import data_tags from '../../../images/nlp/pos_tagging/data_tags.png';
import emm from '../../../images/nlp/pos_tagging/emm.png';
import example from '../../../images/nlp/pos_tagging/example.png';
import hmm from '../../../images/nlp/pos_tagging/hmm.png';
import res from '../../../images/nlp/pos_tagging/res.png';
import trans from '../../../images/nlp/pos_tagging/trans.png';
import vit_eqs from '../../../images/nlp/pos_tagging/vit_eqs.png';

const POSTaggingPage = () => {
  return (
    <ProjectPage image={ example } title="Parts of Speech Tagging using Viterbi's" >    
      <article className="project-article">
        <h1>Task</h1>
        <p>The goal of this project is to implement a Hidden Markov Model (HMM) for Parts of Speech (POS) tagging; tags for test sentences are computed from the transition and emmission probabilities in the HMM using the popular Viterbi algorithm which is a dynamic programming approach used to compute the "best" path through state transitions in HMM models.</p>
      </article>
      <article className="project-article">
        <h1>Dataset</h1>
        <p>The Penn Treebank Dataset was used for this project (can be found <a href="">here</a>); the first 21 sections were used to train the HMM model while section 22 was used as the test dataset. Both datasets (the training &amp;test datasets) consists of two files: one contains lines of text (one sentence per line), and the other contains corressponding POS tags for each word in the sentences. Example visuals of the first three lines of the two training dataset files are shown below.</p>
        <img id="pt_text" src={ data_text } alt="Penn Treebank Dataset&mdash;Text" /> 
        <img id="pt_tags" src={ data_tags } alt="Penn Treebank Dataset&mdash;Tags" /> 
        <p>Basic statistics for the training and test datasets are given in the table below.</p>
        <img id="pt_stats" src={ data_stats } alt="Training &amp; Test Dataset Stats" /> 
      </article>
      <article className="project-article">
        <h1>Building the HMM Model</h1>
        <p>Our first step was to compute transition and emmission probabilities for all words in the training dataset. Additionally, three special tokens were added to the vocabulary&mdash;one for "out-of-vocabulary" words and two more for the start and end of sentences. The equations used for computing the transition and emmission probabilities, respectively, are given below.</p>
        <img id="pt_trans" src={ trans } alt="Transition Probability Equation" /> 
        <img id="pt_emm" src={ emm } alt="Emmission Probability Equation" /> 
        <p>In the above equations, 'N' refers to the count of words, 'Y' is the POS tag, 'X' represents the word in the sentence, 'j' is the index of the tag of the current word ('J' is the set of all POS tags), 'k' is the index of the tag of the previous word, and 't' is the position of the word in a sentence. In addition to these equations, every time a new word (one that was not yet enterred into the vocabulary) was encountered, it was treated as an 'out-of-vocabulary' word. This was done so that our HMM model could appropriately compute a probability for unseen words.</p>
        <p>After a pass through the entire dataset, the HMM probabilities were outputted to a separate file, such that it could be used for predicting POS tags using the Viterbi algorithm. A screenshot of the model output is shown below.</p>
        <img id="pt_hmm" src={ hmm } alt="HMM Model Output" /> 
      </article>
      <article className="project-article">
        <h1>Predicting POS Tags</h1>
        <p>To implement the Viterbi's Algorithm to predict POS tags for a test sentence, two matrices were first created&mdash;one to store the weights and the other to store backpointers to the "best" previous state that led to the current state. Each row of these matrices represented one word in the sentence (plus two more for the start and end) and contained 28 values, one for each type of POS tag in our dataset. The weights for the "start-of-the-sentence" word were set to 0 (on a log scale). Weights (&omega;) and backpointers (b) for the rest of the words were computed using the following equations.</p>
        <img id="pt_vit_eqs" src={ vit_eqs } alt="Viterbi Weight &amp; Backpointer Equations" /> 
        <p>The 'B' in the above equations refers to the emission probabilities, 'A', the transition probabilities, and 's' denotes the state. Note that since the equations above involve multiplications of probabilities (which could get very small), all computations were performed in log scale. Once the end of the sentence was reached, we do a back pass (from the end to the start of the sentence) through the matrices to find the "best" sequence of POS tags&mdash;by picking the tag with the highest weight in the last row of the matrix and following the backpointers. The "hypothesized" POS tags were then compared against the "true" tags; the following errors were obtained on the training and test datasets.</p>
        <img id="pt_res" src={ res } alt="Error on Training &amp; Test Datasets" /> 
      </article>
      <article className="project-article">
        <h1>Conclusion</h1>
        <p>We have successfully built a HMM model and performed POS tagging using Viterbi's Algorithm. As seen in the table earlier, our model has a 6% error rate (or a 94% accuracy) on unseen data, which is pretty good. Error rate for sentences, on the other hand, is almost 70%; this means that even though our POS tagger has has a high accuracy, the mistakes are spread out&mdash;it tags roughly 1 or 2 words incorrectly per sentence (containing 20 words on average). To get a better performance, the simplest approach could be to create a trigram HMM instead of the current bigram implementation. Alternatively, we may use deep neural networks, specifically attention models, which take even more context into account, thereby giving better results.</p>
      </article>
    </ProjectPage>
  )
}

export default POSTaggingPage

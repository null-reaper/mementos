import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'

import '../../../styles/app.css'

// Images

import example from '../../../images/nlp/sentiment_polarity/head.png';
import data from '../../../images/nlp/sentiment_polarity/data.png';
import datasets from '../../../images/nlp/sentiment_polarity/datasets.png';
import features from '../../../images/nlp/sentiment_polarity/features.png';
import plot from '../../../images/nlp/sentiment_polarity/plot.png';
import results from '../../../images/nlp/sentiment_polarity/results.png';

const SentimentPolarityPage = () => {
  return (
    <ProjectPage image={ example } title="Movie Review Sentiment Polarity Analyzer" >    
      <article className="project-article">
        <h1>Task</h1>
        <p>The goal of this project was to perform Sentiment Analysis using logistic regression. More specifically, our algorithm must determine whether a review is positive or negative given textual movie reviews.</p>
      </article>
      <article className="project-article">
        <h1>Dataset</h1>
        <p>A movie reviews dataset provided by the instructors at CMU was used for building the seniment polarity analyzer. Each entry in this dataset contains a textual review of a movie and a corresponding sentiment ("1" for "positive" and "2" for "negative"). A simple visual of a small portion of this dataset is shown below.</p>
        <img id="logr_data" src={data} alt="Movie Review Sentiment Dataset"/> 
        <p>The dataset was divided into training, validation and test datasets. Characteristics of these Datasets are given below.</p>
        <img id="logr_sets" src={datasets} alt="Training, Validation and Test Datasets"/> 
      </article>
      <article className="project-article">
        <h1>Feature Engineering</h1>
        <p>The movie reviews contained in our dataset are of variable lengths (number of words). To make the data easier to manage, we first converted these movie reviews into a more readable usable format. A bag-of-words approach was followed, where we represent each review as a sparse vector containing 1s in the dictionary positions of words present in the reviews and 0s in positions of words not present. A sample output after performing this feature engineering is shown below (only part of the output is shown)&mdash;note, to save space, indices of only vocabulary words that are present in the review are stored (the left-most "1" in each row denotes the "positive" sentiment).</p>
        <img id="logr_feat" src={features} alt="Bag of Words Features for Movie Reviews"/> 
        <p>The code for this section can be found in the "feature.py" located <a href="">here</a>. Note, two options for feature engineering are available in this implementation. If "feature_flag" is set to 1, the above described approach is used; if set to 2, a trimmed bag-of-words approach is used where only more frequent words (the threshold for which can be modifed in the "feature.py" file) will be considered as "present."</p>
      </article>
      <article className="project-article">
        <h1></h1>
      </article>
      <article className="project-article">
        <h1>Training the Classifier</h1>
        <p>The vocabulary size of the dictionary used for feature engineering in the previous step was 39,176 words. Accordingly, a numpy array of 39,177 floats (1 extra for the bias term) was used as the weights for logistic regression&mdash;all weights were zero-initialized. Stochastic Gradient Descent (SGD) was then used to train on the entire dataset, one example at a time. The hyperparameters here were the number of training epochs and the learning rate, which were tuned using the validation dataset.</p>
        <p>SGD was performed on the entire datasets for 250 epochs (learning rate was set to 0.1) and the training and validation error was noted at each epoch&mdash;a softmax function was applied on the weights vectors to compute class probabilities, which were then compared against the true class labels. The following plot was obtained</p>
        <img id="logr_plot" src={plot} alt="Plot of Training &amp;Validation Error vs epochs"/> 
        <p>From the figure above, we can see that the train and test error stabilize after ~125 epochs; this is a reasonably stopping point for training.</p>
      </article>
      <article className="project-article">
        <h1>Predicting on Test Data</h1>
        <p>The trained classifier was then used to predict sentiment polarity on the training, validation and test datasets . The results are shown below.</p>
        <img id="logr_res" src={results} alt="Sentiment Polarity Analyzer Results"/> 
        <p>As seen above, our implementation of logistic regression isn't great, but it performs reasonably well on the classification task given the simplicity of the approach.</p>
      </article>
      <article className="project-article">
        <h1>Conclusion</h1>
        <p>We have successfully implemented a sentiment polarity analyzer that can predict whether a movie review is positive or negative by performing logistic regression on the bag-of-words representation of the review. As seen earlier, we were able to obtain a zero training error (since the data is linearly separable), but our minimum validation and test errors were 0.14 and 0.21, respectively. The reason for this is that a simple bag-of-words model typically isn't the best choice for tasks that depend on the semantics of the entire sentence as opposed to individual words&mdash;a review like "the movie was not good at all" is a negative review even though it contains the word "good" in it. Accordingly, we may try to use bigram/trigram features or word embeddings to improve the performance of our model on unseen data.</p>
      </article>
    </ProjectPage>
  )
}

export default SentimentPolarityPage

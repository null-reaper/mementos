import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'

import '../../../styles/app.css'

// Images

import example from '../../../images/ml/song_popularity_prediction/example.png';
import features from '../../../images/ml/song_popularity_prediction/features.png';

const SongPopularityPage = () => {
  return (
    <ProjectPage image={ example } title="Song Popularity Prediction" >    
      <article className="project-article">
        <h1>Task</h1>
        <p>In this task, we worked with the Million Song dataset. The goal was to use song features to predict whether the song is popular or not; hence, this was a binary classification task. A number of different classification techniques (including Logistic Regression, Random Forest, Gradient Boosted Trees and a Multi-Layer Perceptron) were tried out to obtain the best possible model.</p>
      </article>
      <article className="project-article">
        <h1>Features</h1>
        <p>The screenshot below shows the different features available in the Million Song dataset.</p>
        <img src={features} alt="Features" /> 
        <p>After some exploratory data analysis, we dropped features that were mostly 0 or had a very low variability (energy, danceability). We also dropped rows that had one or more null values. Finally, we dropped songs that had a year value of less than 1920; we also shifted the remaining values down to 0. After all this, around 20% (117339 / 581965) of the original entries remained.</p>
        <p>We then used the "song_hotttnesss" feature to create the class label. Essentially, we pick a threshold (mean of all "song_hotttnesss" values). Then, any song with a value greater than this mean was labelled as class 1 (popular songs), while the rest were class 0 (average songs). Of the 117339 entries, 52289 were class 0 and the remaining 65050 were class 1.</p>
        <p>In the following sections, we document the different modelling approaches tried to build the classifier. For each model, a 80:20 train-validation split was used.</p>
      </article>
      <article className="project-article">
        <h1>Baseline Models</h1>
        <p>Before getting to the heavy work, we first built 2 baseline models to get a sense of the problem.</p>
        <p>The first classifier we tried was a simple logistic regression model. After fitting to the training set, an accuracy of 69.61% was obtained. The validation accuracy was 69.5%.</p>
        <p>Next, a Random Forest Classifier was built and the accuracies obtain were slightly lower than in the previous approach: 69.5% for the training  set and 69.17% for the validation one.</p>
      </article>
      <article className="project-article">
        <h1>Using Bag-Of-Words &amp; TF-IDF Features</h1>
        <p>To try an improve the performance of the baseline classifiers, we performed a bit of feature engineering on textual features ("title" and "artist_terms" ). First, we established word counts to build Bag-Of-Words features (count vectors), and then we computed TF-IDF vectors for the two features. Different vector sizes (for TF-IDF) and vocabulary sizes (for Bag-Of-Words) were experimented with (default value of vector length was 5 and vocab length was 10).</p>
        <p>After repeating Logistic Regression using these new features, the training accuracy increased to 70.58% and validation accuracy, to 70.47%.</p>
        <p>As with Logistic Regression, the training and validation accuracies for Random Forest also increased (70.06% and 69.43%, respectively).</p>
      </article>
      <article className="project-article">
        <h1>Round #1 Modelling</h1>
        <p>Now that we have a baseline, our next goal is to push the accuracy of the classifier as high as we can. We tried various hyperparameters for 4 different types of models: Logistic Regression, Random Forest, Gradient Boosted Trees and Multi-Layer Perceptron.</p>
        <p>Using raw fetures, we first compared the best training accuracy obtained by each model type (after trying various values of hyperparameters). Below are the results:</p>
        <ul>
          <li>Logistic Regression: 70.57%</li>
          <li>Random Forest: 95.04%</li>
          <li>Gradient Boosted Trees: 98.37%</li>
          <li>Multi-Layer Perceptron: 70.87%</li>
        </ul>
        <p>We see that the Random Forest and Gradient Boosted Trees models are able to achieve the best accuracies (granted, with a bit of overftting).</p>
      </article>
      <article className="project-article">
        <h1>Round #2 Modelling</h1>
        <p>In the second round, we only considered the two best model types from the previous round (Random Forest and Gradient Boosted Trees). We then used TF-IDF features and a proper validation set to get the highest accuracy possible. Results are shown below:</p>
        <ul>
        <li>Random Forest: training acc=99.62%, validation acc=80.12% (maxDepth=24, numTrees=20, maxBins=10000, tf_idf_num_features=5, bow_vocab_size=50)</li>
        <li>Gradient Boosted Trees: training acc=99.65%, validation acc=78.02% (maxDepth=15, maxBins=1000, tf_idf_num_features=5, bow_vocab_size=50)</li>
        </ul>
      </article>
      <article className="project-article">
        <h1>Conclusion</h1>
        <p>In the end, the Random Forest model obtained the highest validation accuracy of 80.13% (the Gradient Boosted Trees classifier overfit more than the Random Forest one). We also looked at the AUC of the Random Forest model: training AUC = 0.996, and validation AUC = 80.13%.</p>
      </article>    
    </ProjectPage>
  )
}

export default SongPopularityPage

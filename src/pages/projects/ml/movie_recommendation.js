import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'

import '../../../styles/app.css'

// Images

import example from '../../../images/ml/movie_recommendation/example.png';
import data1 from '../../../images/ml/movie_recommendation/data1.png';
import data2 from '../../../images/ml/movie_recommendation/data2.png';
import data3 from '../../../images/ml/movie_recommendation/data3.png';
import movie_plot from '../../../images/ml/movie_recommendation/movie_plot.png';
import user_plot from '../../../images/ml/movie_recommendation/user_plot.png';

const MovieRecPage = () => {
  return (
    <ProjectPage image={ example } title="Movie Recommendation System using K-Means" >    
      <article className="project-article">
        <h1>Task</h1>
        <p>The goal of this project is to recommend a list of 20 movies (ranked) that the user may like, based on past behavior. Here, we built a simple movie recommendation system using k-means to cluster similar users &amp; movies and suggest movies accordingly.</p>
      </article>
      <article className="project-article">
        <h1>Dataset</h1>
        <p>A movie review dataset (derived from the <a href="">MovieLens Dataset</a>) was provided by the instructors at CMU. This dataset comprised of three sets of files (all in JSON format).</p>
        <p>The first set contained files for each individual movie;details about the movie&mdash;including an ids, title, genres, budget, revenue, and other similar attributes&mdash;were stored in a JSON dictionary.</p>
        <img id="mr_data1" src={data1} alt="Movie Data"/> 
        <p>The second set is similar to the first, except that it contains information about users instead (id, age, gender and occupation).</p>
        <img id="mr_data2" src={data2} alt="User Data"/> 
        <p>Finally, the third set of files contains a map between users and the movies they have watched, along with the rating on the scale of 1 to 5.</p>
        <img id="mr_data3" src={data3} alt="Movie Ratings Data"/> 
        <p>For this initial implementation, a small subset of the data was used. This included information about 1006 movies, 164 users, and ratings given by 147 users for roughly 8 movies on average.</p>
      </article>
      <article className="project-article">
        <h1>Performing K Means</h1>
        <p>The idea here was to group users and movies into clusters based on the similarity between their attributes. For this initial model, only numeral attributes (such as 'age' for users and 'revenue', 'vote count', etc. for movies) were used.</p>
        <p>To select the appropriate number of "K" for movies and users, a silhoutte plot was generated for different values of K. The plot for the movies was as follows.</p>
        <img id="mr_mplot" src={movie_plot} alt="Silhouette Plot for Movies"/> 
        <p>As can be seen, the peaks in the plot are at K = 4, 7, 10, 16, and so on. Among these, K=7 was selected&mdash;since it is not too small (like 4), but still has a high silhouette score (as compared to 10, 16, etc.). The silhouette plot was users were similarly generated.</p>
        <img id="mr_uplot" src={user_plot} alt="Silhouette Plot for Users"/> 
        <p>Here, K=17 was the most ideal choice. After clustering the users and movie using the selected values for K, the clusters were saved in a npz archive, to be used in the movie recommendation task.</p>
      </article>
      <article className="project-article">
        <h1>Recommending Movies</h1>
        <p>To recommend movies to a user, we first look up the top 5 movies that user has rated highly. We then get all similar movies from the clusters created in the previous task. Additionally, we also locate other users similar to this user (using the user clusters), and get the top movies rated by them.</p>
        <p>At this point, we have a candidate set of movies that the user may like. Next, we score each movie in this list against the top 5 movies rated by the user using cosine similarity; we also filter out any movie the user has already watched (by checking if the user has provided a rating for each of those movies. Finally, we order the list of movies based on the score and return the top 20 among them.</p>
        <p>Note: If the user or movie is not present in any of the existing clusters, the first cluster is used by default.</p>
      </article>
      <article className="project-article">
        <h1>Evaluation</h1>
        <p>The movie recommendation system built was uploaded to the class server, which periodically sends recommendation requests and returns a rating for one of the the movies from among the top 20&mdash;the one that the user decided to watch.</p>
        <p>To test our model's performance, we counted the number of 1, 2, 3, 4 and 5 star ratings provided and computed an aggregate score between 0 and 1 (using a high weight for 4 &amp;5, and a low weight for 1-3). The score obtained for the current version of the system was 0.78, while the baseline score (for random list of recommendations) was 0.47.</p>
      </article>
      <article className="project-article">
        <h1>Conclusion</h1>
        <p>We have built a simple movie recommendation system that returns a list of 20 movies that a given user may like. At the moment, the model is decent, but its performance can be improved by complementing the K-Means implementation with SVD and XGBoost (in another project)</p>
      </article>
    </ProjectPage>
  )
}

export default MovieRecPage

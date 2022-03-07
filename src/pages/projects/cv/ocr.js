import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'

import '../../../styles/app.css'

// Images

import example from '../../../images/cv/ocr/example.png';
import data from '../../../images/cv/ocr/data.png';
import dist from '../../../images/cv/ocr/dist.png';
import plot from '../../../images/cv/ocr/plot.png';
import res from '../../../images/cv/ocr/res.png';
import sets from '../../../images/cv/ocr/sets.png';

const OCRPage = () => {
  return (
    <ProjectPage image={ example } title="Classifying Handwritten Characters using a Basic ANN" >    
      <article className="project-article">
        <h1>Task</h1>
        <p>The goal of this project was to build a simple neural network to recognize handwritten characters. This task was only limited to the 26 lowercase characters from 'a' to 'z'.</p>
      </article>
      <article className="project-article">
        <h1>Dataset</h1>
        <p>An OCR dataset provided by Standford's AI lab (can be found <a href="http://ai.stanford.edu/~btaskar/ocr/">here</a>) was used in this project. This dataset contains 52,152 examples of 16x8 images (128 pixels) in the form of a tab-delimited file (each line represents one example image). A visual of the dataset is shown below (only relevant attributes are shown). Note, in the table below, 'p_x_y' refers to the pixel at i=x and j=y pixel.</p>
        <img id="ocr_data" src={data} alt="OCR Dataset" /> 
        <p>Additionally, a plot of the distribution of image counts for each letter is shown below.</p>
        <img id="ocr_dist" src={dist} alt="Distribution of Letters" /> 
        <p>Each letter was then represented as a number between 0 and 25 (in alphabetical order). The dataset was also split into training, validation and test datasets as follows.</p>
        <img id="ocr_sets" src={sets} alt="Training, Validation and Test Datasets" /> 
      </article>
      <article className="project-article">
        <h1>Training the Neural Network</h1>
        <p>A neural network with a single hidden layer was used for the optical character recognition task. Accordingly, two sets of weight matrices were created&mdash;one between the input layer (128 pixels) and hidden layer ('D' nodes), and the other between the hidden layer ('D+1' nodes) and output layer (26 letters)&mdash;note, 'D' here is a hyperparameter with an additional node for a bias term. Additionally, a softmax function was used at the output layer (to obtain class probailities), while sigmoid functions were used at the remaining nodes.</p>
        <p>Next, all of the weights in the two matrices were set randomly using a uniform distribution (-0.1 to 0.1). Stochastic Gradient Descent (SGD) was then used to train the neural network for N epochs (another hyperparameter). Setting the number of hidden nodes D=30, learning rate &eta;=0.1, the following error plot was obtained for the first 100 iterations.</p>
        <img id="ocr_plot" src={plot} alt="Training &amp;Validation Error vs epochs" /> 
        <p>As seen above, the optimal number of epochs was around N=20 (though, this is a rough estimate since our model weights are randomly initialized); the model was re-trained up to this point.</p>
      </article>
      <article className="project-article">
        <h1>Predicting on the Test Data</h1>
        <p>The model created in the previous step was then used to predict output labels for the examples on all three datasets. These labels were compared against the true labels, and the error and average cross-entropy were noted. The table below summarizes the results.</p>
        <img id="ocr_res" src={res} alt="Training, Validation &amp;Test Errors and Average Cross-Entropy" /> 
      </article>
      <article className="project-article">
        <h1>Conclusion</h1>
        <p>We have successfully built a simple neural network from scratch. Our model is able to predict lowercase characters from black/white images, though its accuracy isn't that great. This may be because the model was not trained long enough (due to time constraints for this project); increasing the number of epochs may provide better results (especially considering that training error is still high). Alternatively, changing the number of hidden nodes 'D' and the learning rate &alpha; may also help. The feature generation process also has issues. For instance, one-hot vectors may be more suited to this classification task since alphabets a-z cannot really be compared on a numeric scale. Finally, Artifical Neural Networks such as this one do not consider location of pixels in the image; using CNNs for this would, therefore, be a more logical approach.</p>
      </article>
    </ProjectPage>
  )
}

export default OCRPage

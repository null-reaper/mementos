import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'

import '../../../styles/app.css'

// Images

import example from '../../../images/ml/binary_decision_tree_classifier/example.png';
import data from '../../../images/ml/binary_decision_tree_classifier/data.png';
import results from '../../../images/ml/binary_decision_tree_classifier/results.png';
import tree_visual from '../../../images/ml/binary_decision_tree_classifier/tree_visual.png';

const BTreePage = () => {
  return (
    <ProjectPage image={ example } title="Implementation of a Binary Classifier" >    
      <article className="project-article">
        <h1>Task</h1>
        <p>The goal of this project was to build a Binary Classifier (from scratch) that can work on any dataset only containing attributes with two classes. Selection of attributes to split on was based on mutual information.</p>
      </article>
      <article className="project-article">
        <h1>Dataset</h1>
        <p>Although our goal was to build a general decision tree classifier that does not depend on the dataset used, we used a sample dataset to make sure that we were implementing the functions for the classifier correctly. For this project, we used the Politicians dataset provided by the teaching staff of CMU (can be downloaded from <a href="">here</a>).</p>
        <p>The Politician's dataset contains information about US politician's past voting (on bills) history; this is in the form of 'yes'/'no' responses for the attributes in the dataset (where each attribute refers to a bill that was voted on). The dataset also contains a column denoting the party to which the politician belongs (Democratic or Republican)&mdash;this is what we need to predict based on the remaining attributes. The first 5 entries of this dataset are shown below as reference.</p>
        <img id="dtree_data" src={data} alt="Politician Dataset (First 5 Entries)"/> 
        <p>Before using this dataset in our decision tree classifier, it was first split into a training and test dataset containing 149 and 83 entries, respectively.</p>
      </article>
      <article className="project-article">
        <h1>Building the Decision Tree</h1>
        <p>We initially defined a class "Node" which represents a node in our decision tree. Each node contains the following properties:</p>
        <ul>
          <li>Depth: An int representing the node's depth in the decision tree</li>
          <li>Data: A variable to hold a subset of the dataset used for training at that node</li>
          <li>Attribute Index: An int storing the index of the attribute to split on</li>
          <li>Left Label: The value of the split attribute on the left branch</li>
          <li>Child Type: Denoting whether the node is a left or right child of its parent</li>
          <li>Decision Label: The label selected by majority vote (only for leaf nodes)</li>
          <li>Left, Right &amp; Parent Nodes</li>
        </ul>
        <p>To create the decision tree classifier, our first step was to create a single root node (depth=0) and then passed our entire dataset to it. We then created a function to expand the tree, one level at a time; this is a recursive function that terminates based on the "max depth" limit (provided as an input). At each node in the recursive call, we need to determine the best attribute to split on&mdash;the attribute that provides the maximum mutual information gain after the split (vs before). To compute this mutual information metric I(Y;X), we first computed the class entropy H(Y), specific conditional entropies P(Y|X='value 1') &amp; P(Y|X='value 2'), and conditional entropies H(Y|X). These were then used to compute I(Y;X). Equations for these are given below. (Note, each of the probabilities were measured simply by dividing the number of training examples satifying the given constraint&mdash;specific value of an attribute&mdash;by the total number of training examples)</p>
        <p class="eq first">H(Y|X='value 1') = -P(Y='class 1'|X='value 1').log(P(Y='class 1'|X='value 1')) - P(Y='class 2'|X='value 1').log(P(Y='class 2'|X='value 1'))</p>
        <p class="eq">H(Y|X='value 2') = -P(Y='class 1'|X='value 2').log(P(Y='class 1'|X='value 2')) - P(Y='class 2'|X='value 2').log(P(Y='class 2'|X='value 2'))</p>
        <p class="eq">H(Y|X) = P(X='value 1').H(Y|X='value 1') + P(X='value 2').H(Y|X='value 2')</p>
        <p class="eq">H(Y) = -P(Y='class 1').log(P(Y='class 1')) - P(Y='class 2').log(P(Y='class 2'))</p>
        <p class="eq last">I(Y;X) = H(Y) - H(Y|X)</p>
        <p>We perform these computes with each of the attributes and pick the one with the highest mutual information I(Y;X). This value is stored in the "Attribute Index" property of the node. The training data is then split based on this attribute and the two subsets are passed down to the left and right child nodes. If the "max depth" limit is reached, a majority voting on the labels of the remaining data is performed and the final decision is stored in the "Decision Label" property of the node.</p>
      </article>
      <article className="project-article">
        <h1>Predicting Classes</h1>
        <p>Once the decision tree is built, we can predict classes for new examples by passing them down the decision tree (starting at the root node) and select the left or right child node each time depending on the value of the split attribute at that node. Once we are at a leaf node of the tree, we return the value of the "Decision Label" property of that node.</p>
        <p>To evaluate our "politician party" classifier, we computed the error rate of the predictions on both the training and test datasets (a function for this was implemented as well). The results for a decision tree with max-depth=5 were as follows:</p>
        <img id="dtree_res" src={results} alt="Politican Party Classification Results"/> 
        <p>As we would expect, the accuracy on the training dataset is more than that on the test dataset. This accuracy can be modified by changing the "max-depth" hyperparameter; increasing this too much would lead to overfitting and so, to pick the optimal value, we would typically create a third, validation dataset.</p>
        <p>The Implementation also contains a function to display a simple representation of the generated decision tree. The output for the politician example discussed is shown below.</p>
        <img id="dtree_vis" src={tree_visual} alt="Politican Party Classifier Visualization"/>
      </article>
      <article className="project-article">
        <h1>Conclusion</h1>
        <p>We have successfully implemented a decision tree classifier that can be easily used on any given dataset. One limitation here is that it only works on datasets with binary attributes, but we can easily modify the code to work on multiclass attributes (by updating the probability, entropy and mutual information calculations). Additionally, we can also allow for more user flexibility by adding alternative hyperparameters such as "minimum mutual information" (to stop splitting on attributes is mutual information gain is smaller than a threshold, "no_replacement" (to split with or without replacement), and other such properties.</p>
      </article>
    </ProjectPage>
  )
}

export default BTreePage

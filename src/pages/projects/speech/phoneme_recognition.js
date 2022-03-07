import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'

import '../../../styles/app.css'

// Images

import example from '../../../images/speech/phoneme_recognition/example.png';
import arch from '../../../images/speech/phoneme_recognition/arch.png';
import features from '../../../images/speech/phoneme_recognition/features.png';
import loss from '../../../images/speech/phoneme_recognition/loss.png';
import phonemes from '../../../images/speech/phoneme_recognition/phonemes.png';

const PhonemeRecogntionPage = () => {
  return (
    <ProjectPage image={ example } title="Phoneme Recognition" >    
      <article className="project-article">
        <h1>Task</h1>
        <p>The goal of this project is to perform frame-level phoneme recognition; the input is an audio file, whereas the output is a sequence of phonemes. A set of 40 English phonemes (shown below) are supported. A multilayer feed-forward neural network will be used to perform this task.</p>
        <img src={phonemes} alt="Phonemes" /> 
      </article>
      <article className="project-article">
        <h1>Feature Extraction</h1>
        <p>In this step, the input audio is chunked into frames of 25ms. Short-Time Fourier Transform (STFT) is then performed on each frame after which its melspectrogram is obtained (represented as a 13-long vector). This is used as the input to the the neural network. Additionally, instead of simply passing a single frame to the network, we use the context of the frame (N frames before and after) to help improve predictions. A context of N=16 was used in this implementation.</p>
        <img src={features} alt="Feature Extraction" /> 
      </article>
      <article className="project-article">
        <h1>Network Architecture</h1>
        <p>Phoneme recognition was treated as a multi-label classification task and a feed-forward neural network was used to make predictions. The architecture of this network is shown in the figure below. As can be seen, Linear layers, BatchNorm, Dropout and ReLU activation function were used to build a deep neural network.</p>
        <img src={arch} alt="Network Architecture" /> 
      </article>
      <article className="project-article">
        <h1>Results</h1>
        <p>The neural network was trained on a set of around 1,000,000 examples (frames, not audio files) and the training accuracy obtained was around 88%. At the same time, the validation accuracy was around 86% (which is close to the training accuracy, and the validation accuracy monotonically increased, so there likely wasn't any overfitting). The loss curve during training is shown below:</p>
        <img src={loss} alt="Loss Curve" /> 
        <p>The trained model was then submitted to the Kaggle competition and was scored on a hidden test set. It obtained an accuracy of 85.646%.</p>
      </article>
    </ProjectPage>
  )
}

export default PhonemeRecogntionPage

import * as React from 'react'
import { Link } from 'gatsby'
import {Helmet} from "react-helmet";
import { PostCard } from '../components/PostCard'
import MetaTags from 'react-meta-tags';

import '../styles/app.css'
import logo from '../images/pos.jpg';
import icon from '../images/icon.png';

// Images

import linkedin from "../images/linkedin.png"
import gmail from "../images/gmail.png"

import grocery_store from '../images/app/grocery_store/example.png';
import qr_geolocation from '../images/app/qr_geolocation/example.png';

import m68k_monitor from '../images/computer_architecture/m68k_monitor/example.png';
import mips_cpu from '../images/computer_architecture/mips_cpu/example.png';

import pos_tagging from '../images/nlp/pos_tagging/example.png';
import ner from '../images/nlp/ner/example.jpg';
import sentiment_polarity from '../images/nlp/sentiment_polarity/head.png';
import lm from '../images/nlp/lm/example.jpg';
import question_answering from '../images/nlp/question_answering/example.png';
import question_generation from '../images/nlp/question_generation/example.jpg';

import asr from '../images/speech/asr/example.png';
import tts from '../images/speech/synthesis/example.jpg';
import pizza_ordering from '../images/speech/pizza_ordering/example.jpg';
import phoneme from '../images/speech/phoneme_recognition/example.png';
import fluency_tutor from '../images/speech/fluency_tutor/example.png';
import taskbot from '../images/speech/taskbot/example.jpg';
import audio_captioning from '../images/speech/audio_captioning/example.png';
import audio_retrieval from '../images/speech/audio_retrieval/example.jpg';

import ocr from '../images/cv/ocr/example.png';
import face_rec from '../images/cv/face_recognition/example.png';
import face_id from '../images/cv/face_id/example.png';
import gan from '../images/cv/gan/example.gif';
import style_transfer from '../images/cv/style_transfer/example.gif';
import toon_talker from '../images/cv/toon_talker/example.gif';

import video_enhancement from '../images/image_processing/video_enhancement/example.png';
import image_reconstruction from '../images/image_processing/3d_image_reconstruction/example.png';
import color_channel_alignment from '../images/image_processing/color_channel_alignment/example.png';
import gradient_domain_fusion from '../images/image_processing/gradient_domain_fusion/example.png';

import mountain_car from '../images/rl/mountain_climber/example.png';
import cart_pole from '../images/rl/cart_pole/example.png';
import imitation from '../images/rl/imitation/example.jpg';
import bandits from '../images/rl/bandits/example.png';
import frozen_lake from '../images/rl/frozen_lake/example.png';
import pusher_2d from '../images/rl/pusher_2d/example.png';

import dtree from '../images/ml/binary_decision_tree_classifier/example.png';
import song from '../images/ml/song_popularity_prediction/example.png';
import movie_rec from '../images/ml/movie_recommendation/head.jpg';

import emmanuel_electronics from '../images/web/emmanuel_electronics.png';
import covid from '../images/web/covid.png';

import tensorboard from '../images/blog/tensorboard.png';
import albert from '../images/blog/albert.png';


const ProjectsPage = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Projects</title>
      </Helmet>
      <MetaTags>
        <meta name="description" content="Portfolio of Personal &amp; Academic Projects" />
        <meta name="title" property="og:title" content="Mementos" />
        <meta property="og:type" content="website" />
        <meta name="image" property="og:image" content="https://live.staticflickr.com/65535/51923136072_6f1bc1812e_k.jpg" />
        <meta name="description" property="og:description" content="" />
        <meta name="author" content="Null Reaper" />
      </MetaTags>

      <div className="viewport">

        <div className="viewport-top">
            {/* The main header section on top of the screen */}
            <header className="project-head"> 
                <div className="container">
                    <div className="site-mast">
                        <div className="site-mast-left">
                        </div>
                        <div className="site-mast-right">
                        <a href="https://www.linkedin.com/in/clivegomes/" className="site-nav-item" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src={linkedin} alt="LinkedIn" /></a>
                        <a href="mailto:cliveg@andrew.cmu.edu" className="site-nav-item" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src={gmail} alt="Email" /></a>
                        </div>
                    </div>

                    <div className="site-banner">
                        <h1 className="site-banner-title">Projects</h1>
                        <p className="site-banner-desc">Academic &amp; Personal</p>
                    </div>

                    <nav className="site-nav">
                        <div className="site-nav-right">
                            <Link className="site-nav-button" to="https://www.linkedin.com/in/clivegomes/">Profile</Link>
                        </div>
                    </nav>
                </div>
            </header>

            <main className="site-main">
              <h1 className="project-header firsthead">Top Picks</h1>
            
              <div className="container box2">
                <section className="post-feed">
                    <PostCard link="/projects/speech/fluency_tutor" title="Fluency Tutor" excerpt="Software that can assess reading difficulties from audio recordings and provide content at the appropriate level to help users get better." feature_image={fluency_tutor} primary_author_profile_image={icon} primary_author_name="Name" />
                    <PostCard link="/projects/speech/taskbot" title="Recipe &amp; DIY Taskbot" excerpt="Competition among 10 schools to design and build an Alexa skill for Recipe/DIY tasks." feature_image={taskbot} primary_author_profile_image={icon} primary_author_name="Name" />
                    <PostCard link="/projects/cv/toon_talker" title="Toonification &amp; Lip Syncing" excerpt="Takes in an image of a person's face with a text passage and create a video where a cartoonized version of the person is reading the text." feature_image={toon_talker} primary_author_profile_image={icon} primary_author_name="Name" />
                </section>
              </div>  
              <h1 className="project-header">NLP</h1>
              <div className="container box2">
                <section className="post-feed">
                    <PostCard link="/projects/nlp/pos_tagging" title="Parts-of-Speech Tagging" excerpt="Hidden Markov Model (HMM) for Parts of Speech (POS) tagging." feature_image={ pos_tagging } primary_author_profile_image={icon} primary_author_name="Name" />
                    <PostCard link="/projects/nlp/question_generation" title="Question Generation" excerpt="Generate questions for a passage using BERT models fine-tuned on the SQuAD 2.0 dataset." feature_image={question_generation} primary_author_profile_image={icon} primary_author_name="Name" />
                    <PostCard link="/projects/nlp/question_answering" title="Question Answering" excerpt="Generate answers given a passage and a set of questions using BERT models fine-tuned on the SQuAD 2.0 dataset." feature_image={question_answering} primary_author_profile_image={icon} primary_author_name="Name" />
                    <PostCard link="/projects/nlp/sentiment_polarity" title="Sentiment-Polarity Analyzer" excerpt="Perform Sentiment Analysis on movie reviews using Logistic Regression." feature_image={ sentiment_polarity } primary_author_profile_image={icon} primary_author_name="Name" />
                </section>
              </div>  
              <h1 className="project-header">Speech Processing</h1>
              <div className="container box2">
                <section className="post-feed">
                    <PostCard link="/projects/speech/asr" title="Speech Recognition w/ Kaldi" excerpt="Experimenting with the ASR Language Model (LM) and Pronounciation Lexicon in Kaldi." feature_image={asr} primary_author_profile_image={icon} primary_author_name="Name" />
                    <PostCard link="/projects/speech/synthesis" title="Speech Synthesis w/ Festival" excerpt="Building two basic speech synthesizers&mdash;a talking clock and a clustergen (general-purpose) voice&mdash;using the Festival toolkit." feature_image={tts} primary_author_profile_image={icon} primary_author_name="Name" />
                    <PostCard link="/projects/speech/pizza_ordering" title="Pizza Ordering - Alexa Skill" excerpt="An Alexa Skill for a multi-turn Pizza Ordering system built using the flask_ask library in Python and hosted using an ngrok server." feature_image={pizza_ordering} primary_author_profile_image={icon} primary_author_name="Name" />
                    <PostCard link="/projects/speech/phoneme_recognition" title="Phoneme Recognition" excerpt="Frame-level phoneme recognition on audio files using a Feed-Forward Neural Network." feature_image={phoneme} primary_author_profile_image={icon} primary_author_name="Name" />
                    <PostCard link="/projects/speech/fluency_tutor" title="Fluency Tutor" excerpt="Software that can assess reading difficulties from audio recordings and provide content at the appropriate level to help users get better." feature_image={fluency_tutor} primary_author_profile_image={icon} primary_author_name="Name" />
                    <PostCard link="/projects/speech/taskbot" title="Recipe &amp; DIY Taskbot" excerpt="Competition among 10 schools to design and build an Alexa skill for Recipe/DIY tasks." feature_image={taskbot} primary_author_profile_image={icon} primary_author_name="Name" />
                    <PostCard link="/projects/speech/audio_captioning" title="Audio Captioning" excerpt="The DCASE2022 Challenge to generate a general audio content description using free text." feature_image={audio_captioning} primary_author_profile_image={icon} primary_author_name="Name" />
                    <PostCard link="/projects/speech/audio_retrieval" title="Audio Retrieval" excerpt="The DCASE2022 Challenge to build a retrieval system that ranks audio files based on their match to a given free-form textual description." feature_image={audio_retrieval} primary_author_profile_image={icon} primary_author_name="Name" />
                </section>
              </div>  
              <h1 className="project-header">Computer Vision</h1>
              <div className="container box2">
                <section className="post-feed">
                    <PostCard link="/projects/cv/ocr" title="Optical Character Recognition" excerpt="A simple Feed-Forward Neural Network to recognize handwritten characters." feature_image={ ocr } primary_author_profile_image={icon} primary_author_name="Name" />
                    <PostCard link="/projects/cv/face_recognition" title="Face Recognition" excerpt="Obtain appropriate representations for face images using a CNN and recognize the people in other images." feature_image={face_rec} primary_author_profile_image={icon} primary_author_name="Name" />
                    <PostCard link="/projects/cv/face_id" title="Face ID (Verification)" excerpt="Compare a given face image to a target face image (ID) using various similarity metrics." feature_image={face_id} primary_author_profile_image={icon} primary_author_name="Name" />
                    <PostCard link="/projects/cv/generating_cats" title="Generating Cats" excerpt="Generate novel images of cats from noise using DCGANs and CycleGANs." feature_image={gan} primary_author_profile_image={icon} primary_author_name="Name" />
                    <PostCard link="/projects/cv/style_transfer" title="Style Transfer" excerpt="Transfer style content from one image to another using a fine-tuned VGG-19 model." feature_image={ style_transfer } primary_author_profile_image={icon} primary_author_name="Name" />
                    <PostCard link="/projects/cv/toon_talker" title="Toonification &amp; Lip Syncing" excerpt="Takes in an image of a person's face with a text passage and create a video where a cartoonized version of the person is reading the text." feature_image={toon_talker} primary_author_profile_image={icon} primary_author_name="Name" />
                </section>
              </div>
              <h1 className="project-header">Image Processing</h1>
              <div className="container box2">
                <section className="post-feed">
                    <PostCard link="/projects/image_processing/video_enhancement" title="Video Enhancement" excerpt="Improve the quality of an old video footage using various image processing techniques." feature_image={ video_enhancement } primary_author_profile_image={icon} primary_author_name="Name" />
                    <PostCard link="/projects/image_processing/3d_image_reconstruction" title="3D Image Reconstruction" excerpt="Create 3D reconstructions from CT scans and look at different views." feature_image={ image_reconstruction } primary_author_profile_image={icon} primary_author_name="Name" />
                    <PostCard link="/projects/image_processing/color_channel_alignment" title="Color-Channel Alignment" excerpt="Find the best alignment between shifted red, green and blue image channels." feature_image={ color_channel_alignment } primary_author_profile_image={icon} primary_author_name="Name" />
                    <PostCard link="/projects/image_processing/gradient_domain_fusion" title="Gradient Domain Fusion" excerpt="Seemlessly blend an object into the background of another image." feature_image={ gradient_domain_fusion } primary_author_profile_image={icon} primary_author_name="Name" />
                </section>
              </div>  
              <h1 className="project-header">Reinforcement Learning</h1>
              <div className="container box2">
                <section className="post-feed">
                    <PostCard link="/projects/rl/multi_arm_bandits" title="Multi-Arm Bandits" excerpt="Learning to maximize reward in a 10-armed bandit setting using various exploration strategies." feature_image={bandits} primary_author_profile_image={icon} primary_author_name="Name" />
                    <PostCard link="/projects/rl/frozen_lake" title="Frozen Lake" excerpt="Using synchronous and asynchronous versions of value and policy iteration to solve the FrozenLake-v0 environment from OpenAI." feature_image={frozen_lake} primary_author_profile_image={icon} primary_author_name="Name" />
                    <PostCard link="/projects/rl/cart_pole" title="Cart Pole" excerpt="Using REINFORCE, A2C and DQN to solve the CartPole-v0 environment from OpenAI." feature_image={cart_pole} primary_author_profile_image={icon} primary_author_name="Name" />
                    <PostCard link="/projects/rl/mountain_car" title="Mountain Car" excerpt="Using linear approximate Q-Learning to solve the MountainCar-v0 environment from OpenAI." feature_image={ mountain_car } primary_author_profile_image={icon} primary_author_name="Name" />
                    <PostCard link="/projects/rl/imitation" title="Imitation Learning" excerpt="Using Behavior Clonining, Dataset Aggregation and Goal-Conditioned Behavior Cloning to solve the CartPole-v0 and FourRooms environment from OpenAI." feature_image={imitation} primary_author_profile_image={icon} primary_author_name="Name" />
                </section>
              </div>  
              <h1 className="project-header">Other ML Projects</h1>
              <div className="container box2">
                <section className="post-feed">
                    <PostCard link="/projects/ml/binary_tree_classifier" title="Binary Tree Classifier" excerpt="Building a binary tree classifer to determine whether a politician is a democrat or a republican based on how they voted on bills." feature_image={ dtree } primary_author_profile_image={icon} primary_author_name="Name" />
                    <PostCard link="/projects/ml/song_popularity_prediction" title="Song Popularity Prediction" excerpt="Predicting whether a song is popular or not using various types of classifiers." feature_image={ song } primary_author_profile_image={icon} primary_author_name="Name" />
                    <PostCard link="/projects/ml/movie_recommendation" title="Movie Recommendation" excerpt="A K-Means implementation of a system to recommend movies to users based on their demographics and their ratings on movies they have watched in the past." feature_image={ movie_rec } primary_author_profile_image={icon} primary_author_name="Name" />
                </section>
              </div>  
              <h1 className="project-header">App Development</h1>
              <div className="container box2">
                <section className="post-feed">
                    <PostCard link="/projects/app/grocery_store" title="Grocery Store (Desktop App)" excerpt="A desktop application for a grocery store (like WholeFoods) built using Java and SQL." feature_image={ grocery_store } primary_author_profile_image={icon} primary_author_name="Name" />
                    <PostCard link="/projects/app/qr_geolocation" title="QR Geolocation (Android App)" excerpt="An offline design to help people find directions to evacuation sites during a natural disaster." feature_image={ qr_geolocation } primary_author_profile_image={icon} primary_author_name="Name" />
                </section>
              </div>  
              <h1 className="project-header">Computer Architecture</h1>
              <div className="container box2">
                <section className="post-feed">
                    <PostCard link="/projects/computer_architecture/m68k_monitor" title="M68K Monitor Program" excerpt="A program to support basic command line functions and operations on an M68K microcontroller." feature_image={ m68k_monitor } primary_author_profile_image={icon} primary_author_name="Name" />
                    <PostCard link="/projects/computer_architecture/mips_cpu" title="MIPS CPU w/ VHDL" excerpt="VHDL Implementation of a complete MIPS CPU supporting a set of basic instructions." feature_image={ mips_cpu } primary_author_profile_image={icon} primary_author_name="Name" />
                </section>
              </div>  
              <h1 className="project-header">Web Design</h1>
              <div className="container box2">
                <section className="post-feed">
                    <PostCard link="https://emmanuelelectronics.in" title="Emmanuel Electronics" excerpt="Website for Emmanuel Electronics, a power electronics company based in Mumbai, India." feature_image={ emmanuel_electronics } primary_author_profile_image={icon} primary_author_name="Name" />
                    <PostCard link="https://knowyourpandemic.com" title="Know Your Pandemic" excerpt="An informational website for getting COVID-related information." feature_image={ covid } primary_author_profile_image={icon} primary_author_name="Name" />
                </section>
              </div>  
              <h1 className="project-header">Blog Posts</h1>
              <div className="container box2">
                <section className="post-feed">
                    <PostCard link="https://clive-gomes.medium.com/visualizing-with-tensorboard-96b013f3d931" title="TensorBoard" excerpt="An overview of Tensorboard along with its application to a movie recommendation system." feature_image={tensorboard} primary_author_profile_image={icon} primary_author_name="Name" />
                    <PostCard link="https://clive-gomes.medium.com/pre-training-large-language-models-at-scale-d2b133d5e219" title="ALBERT" excerpt="An easy to understand summary of the paper &#8220;ALBERT: A Lite BERT for Self-supervised Learning of Language Representations.&#8221;" feature_image={albert} primary_author_profile_image={icon} primary_author_name="Name" />
                </section>
              </div>  


            </main>

        </div>

        <div className="viewport-bottom">
            {/* The footer at the very bottom of the screen */}
            <footer className="site-foot">
                <div className="site-foot-nav container">
                    <div className="site-footer">
                      <Link to="https://github.com/null-reaper">Null Reaper</Link> © 2022
                    </div>
                </div>
            </footer>

        </div>
        </div>

      
    </div>
  )
}

export default ProjectsPage

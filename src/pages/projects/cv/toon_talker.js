import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'

import '../../../styles/app.css'

// Images

import example from '../../../images/cv/toon_talker/example.gif';
import arch from '../../../images/cv/toon_talker/arch.png';
import bad_toons from '../../../images/cv/toon_talker/bad_toons.jpg';
import colab_badge from '../../../images/cv/toon_talker/colab-badge.svg';
import dumbledore from '../../../images/cv/toon_talker/dumbledore.jpg';
import ffhq_out from '../../../images/cv/toon_talker/ffhq_out.png';
import finetuned_out from '../../../images/cv/toon_talker/finetuned_out.jpg';
import finetuned from '../../../images/cv/toon_talker/finetuned.png';
import ginny from '../../../images/cv/toon_talker/ginny.jpg';
import hermoine from '../../../images/cv/toon_talker/hermoine.jpg';
import ron from '../../../images/cv/toon_talker/ron.jpg';
import stylegan2_ffhq from '../../../images/cv/toon_talker/stylegan2_ffhq.png';
import toon_model from '../../../images/cv/toon_talker/toon_model.png';
import toonify from '../../../images/cv/toon_talker/toonify.png';
import ui_out from '../../../images/cv/toon_talker/ui_out.png';
import ui from '../../../images/cv/toon_talker/ui.png';
import w2lpaper from '../../../images/cv/toon_talker/w2lpaper.png';

const ToonTalkerPage = () => {
  return (
    <ProjectPage image={ example } title="Toonifying a Human Image &amp; Lip-Syncing" >    
      <article className="project-article">
        <h1>Task Description</h1>
        <p>For this project, we decided to experiment with Face Modelling &amp; Style Transfer techniques. Our system takes in an image of a person's face and converts it into a cartoonized version. Additionally, the user can provide a short text passage which the system will conert to audio using TTS and create a video where the cartoonized person lipsyncs along with the narration. Finally, we built a simple flask server to collect user input and display the final video (to try out our Toon-Talker, use this link <a href="https://drive.google.com/file/d/118Zq9S89Xyk_Q6InsCFCoLQ4OThN-r10/view?usp=sharing"><img src={ colab_badge } alt="Open in Colab" /></a>). In the following sections, we shall descriptions each of our main components while provide example outputs obtained from our models.</p>
      </article>
      <article className="project-article">
        <h1>User Interface</h1>
        <img id="ui" src={ui} alt="User Interface"/>
        <p>Let's start with the UI as this is the first thing a user sees. We set up a flask server to collect three types of inputs:</p>
        <ol>
          <li>Image: A .png/.jpg file containing a closeup of the person's face must be uploaded through the "Select Image" button&mdash;if it isn't a close-up pic, the code crops and centers the face. For best performance, the person must be facing straight ahead (as such images were used during training) and most facial features (such as eyes, ears, etc.) should be visible.</li>
          <li>Text: A passage that the user wishes to narrate can be provided in the text area. Depending on the lengtg of this text, the model may take longer to return a result.</li>
          <li>Binary: Radio buttons for "male" &amp; "female" are included. The user must select one of these to determine the pitch of the outputted narration.</li>
        </ol>
        <p>The text &amp; binary inputs are stored in a JSON file and, along with the image, the flask app passes these on to our "Toon-Talker" system. Once the output has been generated, the flask app displays the resulting video as shown below.</p>
        <img id="ui_out" src={ui_out} alt="Output on User Interface"/>
        <p>Next, we shall look at each of our two main components in the following sections.</p>
      </article>
      <article className="project-article">
        <h1>Toonification</h1>
        <p>Our first step was to convert the single image into a cartoonized version. We decided to do this before lipsyncing as this process is slow and, therefore, it is easier to perform the operation on a single image rather than on all frames of the lipsynced video. The following subsections describe the tasks performed in this step.</p>
        <section className="project-article">
          <h2>The Base Model</h2>
          <div className="grid2">
            <img id="ffhq" src={stylegan2_ffhq} alt="Base StyleGAN2 FFHQ Model"/>
            <img id="ffhq_out" src={ffhq_out} alt="Base StyleGAN2 Output Faces"/>
          </div>
          <p><a href="https://arxiv.org/abs/1912.04958">StyleGAN2</a> (an improved version of StyleGAN) designed by NVIDIA was used as the starting point for this project. The <a href="https://github.com/NVlabs/stylegan2">Github repo</a> for this architecture contains code for generating images, projecting inputs into latent space, fine-tuning the model, and so on. Additionally, NVIDIA also provides a set of pre-trained models such as ones trained on faces, cars, cats, etc. We used the first of these models i.e. <a href="http://d36zk2xti64re0.cloudfront.net/stylegan2/networks/stylegan2-ffhq-config-f.pkl">StyleGAN2 FFHQ</a> (which was trained on face images taken from Flickr) as the base model for generating faces.</p>
        </section>
        <section className="project-article">
          <h2>Fine-Tuning</h2>
          <div className="grid2">
            <img id="finetuned" src={finetuned} alt="Fine-Tuned Cartoon Model"/>
            <img id="finetuned_out" src={finetuned_out} alt="Fine-Tuned Cartoon Output Faces"/>  
          </div>
          <p>In order for the model to learn characteristics of cartoon faces, we first tried fine-tuning the StyleGAN2 FFHQ model on a few different cartoon datasets (<a href="https://google.github.io/cartoonset/">Cartoon Set</a>, <a href="https://www.justinpinkney.com/static/09ffe0deeab2230cb61d40b3a3806ba5/e993b/small-faces.jpg">Pixar Characters</a> and an <a href="https://www.gwern.net/Danbooru2020">Anime Dataset</a>). While these gave us reasonable output cartoon faces, we came across a <a href="https://drive.google.com/uc?id=1H73TfV5gQ9ot7slSed_l-lim9X7pMRiU">pre-trained toonify model</a> by <a href="https://www.justinpinkney.com">Justin Pinkney</a> that provided much better results. Accordingly, we decided to use that one instead.</p>
        </section>
        <section className="project-article">
          <h2>The Idea Behind Style Transfer</h2>
          <img id="toon" src={toon_model} alt="Toonify Model"/>
          <p>At this point, we have two models&mdash;the original StyleGAN2 FFHQ model and the fine-tuned Cartoon model. To toonify human faces, we take the first few layers of the Cartoon model (which encodes facial characteristics of cartoon faces such as eyes, mouth, etc.) and the last few layers of the StyleGAN2 FFHQ model (to add in finer details of real human faces). Combining these models together, we are able to get realistic looking transformations of human faces in the cartoon domain by projecting the input face into the W latent space and passing it through the model.</p>
          <img id="toonify" src={toonify} alt="Toonify Operation"/>
        </section>
        <section className="project-article">
          <h2>Challenges</h2>
          <p>A main issue with using the StyleGAN2 model is that it cannot be run without a GPU. Additionally, it requires tensorflow 1.x which is not as well supported as the 2.x versions. For these reasons, most training and experimentation had to be done on Google Colab or AWS.</p>
          <img id="bad_toon" src={bad_toons} alt="Bad Toon Outputs"/>
          <p>Another issue we had (since we used Colab) was that the model needed to be re-trained incremently. This not only took time but the results were also not always great. For example, our initial model generated cartoon images (as shown in the image above) that were halfway between human and cartoon faces; these were certainly not the kind of outputs we wanted, which is why we had to train for longer durations.</p>
        </section>
      </article>
      <article className="project-article">
        <h1>Lip Syncing</h1>
        <p>Having generated the cartoonized version of the human face, we then pass this along with the input passage and gender to our lipsyncing component. The following paragraphs describe our procedure.</p>
        <section className="project-article">
          <h2>Text-to-Speech</h2>
          <p>First, we generate an audio narration of the input passage using Google's TTS library (gTTS in Python); the choice of gender was provided by the user. One difficulty we ran into, however, was that gTTS only allowed us to generate the audio in a female voice (a male version wasn't available). To get around this, we used the audio analysis library "librosa" to lower the pitch of the output audio to get a male approximation. Though not perfect, this provided a reasonably good version for the male narration.</p>
        </section>
        <section className="project-article">
          <h2>Wav2Lip</h2>
          <p>The task of lip-syncing is defined as follows: Given a speech segment S and a random reference face R, we wish to generate a lip-synced version of the face that matches the audio. Essentially, we wish to convert an arbitrary video such that it appears the character in the video is realistically speaking the words in the provided utterance. This task is addressed in the 2020 paper, <a href="https://arxiv.org/abs/2008.10010">A Lip Sync Expert is All you Need for Speech to Lip Generation in the Wild. </a> </p>
            <img id="w2l" src={w2lpaper} alt="Wav2Lip"/>
          <p>In the paper, the authors propose using an expert lip-sync discriminator, as opposed to training one in the typical GAN framework.   For the discriminator, the authors  use a modified version of SyncNet, which is specifically trained to correct lip-sync errors and create large lip syncing datasets. </p>
            <img id="w2larch" src={arch} alt="Wav2Lip Architecture"/>
          <p>The Generator is composed of three components - the identity encoder, speech encoder, and face decoder.  The Identity Encoder is a stack of residual convolutional layers that encode a reference frame R  concatenated with a pose prior P, where the lower half of the target face is masked. The Speech Encoder is also a stack of 2D convolutions to encode the input melspectrogram speech segments S which are then concatenated with the face representation.  The decoder as well contains several convolutional layers, followed by transpose convolutions for upsampling.  The Generator is then trained to minimize the L1 loss between the generated frames and the ground truth frames, and the input to the discriminator is then the lower half of the generated frames. The authors found that this architecture incorporating an expert lip sync discriminator forces the generator to produce accurate lip shapes. </p>
          <p>Using this technique on our toonified image and TTS-generated audio, we obtain the following result:</p>
          <iframe class="vid_out" src="https://www.youtube.com/embed/jQQCqFZ0s0o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </section>
        <section className="project-article">
          <h2>Challenges</h2>
          <p>While our previous output looked fine, the lipsyncing algorithm generated weird results at times; one such example is shown in the video below. It is not clear exactly why this happened even though we used the same input image and text, however, we did notice that occasionally different batch sizes would be processed of the input melspectrograms, depending on the available GPU memory at the time. It is possible that different batch sizes during inference could have an effect on the lip generation, but further experiments would need to be conducted to determine the precise reason for the occasional lipsync failures.</p>
          <iframe class="vid_out" src="https://www.youtube.com/embed/6OJoh4g1HTI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <p>As mentioned earlier, our system needs a GPU to run. Taking this into account, we had initially planned to host the UI on AWS such that anyone could easily click the access and use the toon-talker system. Once we had transferred the code to the AWS instance (g4dn.xl for its GPU), we had trouble processing the images with the model, and continuously received an error that the runtime version of cuDNN was different than the version used for training the model. After extensive research, we were able to solve this issue by registering for a Nvidia developer account, downloading a particular version of cuDNN, manually installing it, and replacing certain header files and paths on the instance. This allowed us to feed images through the model one time, but due to improper memory handling by the wrapper code for one of the pre-trained models, we could not upload any more images to the UI without always restarting the server (GPU OOM errors). We experimented with various garbage collection libraries, and in addition to a thread-based approach, but with no luck. This was a major challenge of the project, and we ultimately decided to provide a Colab notebook to run the code instead.</p>
        </section>
      </article>
      <article className="project-article">
        <h1>Results</h1>
        <p>In this final section, we present a few additional examples of inputs and corresponding outputs created using our system.</p>
        <section className="project-article" id="toon_results">
          <h4 id="r1">Inputs</h4>
          <h4 id="r2">Output Video</h4>
          <h4 id="r3">Face Image</h4>
          <h4 id="r4">Passage</h4>
          <h4 id="r5">Gender</h4>
          <figure>
            <img src={hermoine} alt="Hermoine Image"/>
          </figure>
          <p><br/><br/>"Salvio Hexia!"</p>
          <p className="text-center"><br/><br/>Female</p>
          <figure>
            <iframe className="toon_iframe" src="https://www.youtube.com/embed/T0fesR6l5v8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>          </figure>
          <figure>
            <img src={ron} alt="Ron Image"/>
          </figure>
          <p><br/>"We are only as strong as we are united, as weak as we are divided."</p>
          <p className="text-center"><br/><br/>Male</p>
          <figure>
            <iframe className="toon_iframe" src="https://www.youtube.com/embed/1q0Ljl6qWiQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>          </figure>
          <figure>
            <img src={ginny} alt="Ginny Image"/>
          </figure>
          <p><br/>"The thing about growing up is that you sort of start thinking anything's possible if you've got enough nerve."</p>
          <p className="text-center"><br/><br/>Female</p>
          <figure>
            <iframe className="toon_iframe" src="https://www.youtube.com/embed/HjBm3xOwLLY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>          </figure>
          <figure>
            <img src={dumbledore} alt="Dumbledore Image"/>
          </figure>
          <p id="passage">"It is a curious thing but perhaps those who are best suited to power are those who have never sought it. Those who have leadership thrust upon them, and take up the mantle because they must, find to their own surprise that they wear it well."</p>
          <p className="text-center"><br/><br/>Male</p>
          <figure>
            <iframe className="toon_iframe" src="https://www.youtube.com/embed/3ctflZ9w500" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>          </figure>
        </section>
      </article>
    </ProjectPage>
  )
}

export default ToonTalkerPage

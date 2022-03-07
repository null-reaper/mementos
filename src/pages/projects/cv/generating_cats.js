import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'

import '../../../styles/app.css'

// Images

import cycle_c_xy_cats from '../../../images/cv/gan/cycle_c_xy_cats.gif';
import cycle_c_yx_cats from '../../../images/cv/gan/cycle_c_yx_cats.gif';
import cycle_cons_10k from '../../../images/cv/gan/cycle_cons_10k.png';
import cycle_cons_600 from '../../../images/cv/gan/cycle_cons_600.png';
import cycle_cons_w_wo_600 from '../../../images/cv/gan/cycle_cons_w_wo_600.png';
import cycle_df_loss from '../../../images/cv/gan/cycle_df_loss.png';
import cycle_dr_loss from '../../../images/cv/gan/cycle_dr_loss.png';
import cycle_gxy_loss from '../../../images/cv/gan/cycle_gxy_loss.png';
import cycle_gyx_loss from '../../../images/cv/gan/cycle_gyx_loss.png';
import cycle_loss from '../../../images/cv/gan/cycle_loss.png';
import cycle_nc_xy_cats from '../../../images/cv/gan/cycle_nc_xy_cats.gif';
import cycle_nc_yx_cats from '../../../images/cv/gan/cycle_nc_yx_cats.gif';
import cycle_train from '../../../images/cv/gan/cycle_train.png';
import cyclegan_generator from '../../../images/cv/gan/cyclegan_generator.png';
import dcgan_cats from '../../../images/cv/gan/dcgan_cats.gif';
import dcgan_d_loss_basic from '../../../images/cv/gan/dcgan_d_loss_basic.png';
import dcgan_d_loss_deluxe from '../../../images/cv/gan/dcgan_d_loss_deluxe.png';
import dcgan_d_loss from '../../../images/cv/gan/dcgan_d_loss.png';
import dcgan_discriminator from '../../../images/cv/gan/dcgan_discriminator.png';
import dcgan_fin_output from '../../../images/cv/gan/dcgan_fin_output.png';
import dcgan_g_loss_basic from '../../../images/cv/gan/dcgan_g_loss_basic.png';
import dcgan_g_loss_deluxe from '../../../images/cv/gan/dcgan_g_loss_deluxe.png';
import dcgan_g_loss from '../../../images/cv/gan/dcgan_g_loss.png';
import dcgan_generator from '../../../images/cv/gan/dcgan_generator.png';
import dcgan_ini_output from '../../../images/cv/gan/dcgan_ini_output.png';
import dcgan_pkmn_output from '../../../images/cv/gan/dcgan_pkmn_output.png';
import dcgan_pkmn from '../../../images/cv/gan/dcgan_pkmn.gif';
import no_cycle_cons_10k from '../../../images/cv/gan/no_cycle_cons_10k.png';
import no_cycle_cons_600 from '../../../images/cv/gan/no_cycle_cons_600.png';
import pkmn_train from '../../../images/cv/gan/pkmn_train.png';
import train from '../../../images/cv/gan/train.png';
import example from '../../../images/cv/gan/example.gif';

const GeneratingCatsPage = () => {
  return (
    <ProjectPage image={ example } title="Generating Cats Using DCGANs &amp; CycleGANs" >    
      <article className="project-article">
          <h1>Task</h1>
          <p> The goal of this project is to get hands-on experience coding and training GANs. Specifically, we designed the neural architecture and trained two kinds of GANs on cat images: DCGANs and CycleGANs. Both of these shall be discussed in the following sections of this report.</p>     
      </article>
      <article className="project-article">
          <h1>Deep Convolutional GAN (DCGAN)</h1>
          <p>A DCAN is a GAN that uses a CNN as the discriminator and a series of transposed convolutions as the generator. The purpose of this GAN is to take in a set of random values (or noise) and learn to generate images similar to those in the training dataset. In our case, we have used images of "grumpy" cats as shown below:</p>
          <figure id="grumpy_cats">
              <img src={train} alt="Grumpy Cats"/>
              <figcaption>Figure 1: Training Data&mdash;Images of Grumpy Cats</figcaption>
          </figure>
          <p>In order to improve the GANs output, a couple different data augmentation operations were considered:</p>
          <ol>
              <li>Basic: Only apply a simple normalization operation to shift the values of pixels to the range (-1, 1).</li>
              <li>Deluxe: First resize the image to 110% and then randomly crop to the original size. Then, randomly apply horizontal flips to images and normalize to (-1, 1) as in the basic augmentation.</li>
          </ol>
          <section className="project-article">
              <h2>Discriminator</h2>
              <p>We start by designing the discriminator for the DCGAN. A schematic for the CNN used in the project is given below. As can be seen, the network takes a 3-color channel 64x64 pixel image as an input and outputs a single number representing whether it thinks that the image is a real cat (output of 1) or a fake/generated cat (output of 0). The discriminator learns to make this distinction by performing a series of convolution operations with ReLU activation functions.</p>
              <figure id="dcgan_discr">
              <img src={dcgan_discriminator} alt="DCGAN Discriminator Architecture"/>
              <figcaption>Figure 2: CNN Architecture for the DCGAN Disciminator</figcaption>
              </figure>           
              <p>As can be seen, the image is downsampled by a factor of 2 after each convolution operation. In our case, we use a kernel of size 4 and a stride of 2. If we perform the first row of convolution for the 64x64 input image, we will get a output of length 1 + (64 - 4)/2 = 31&mdash;the "1" is the case where the kernel is placed at the top-left corner of the image and the "(64 - 4)/2" are the number of strides possible whilst remaining within the image. To get an output of length 32 (which is 1/2 the original size), we need to make one more stride; for a stride length of 2, we need to use padding=1 (one pixel on each side) to accomplish this. The same is true for all the remaining convolution layers as well, except for the "conv5" layer: here, to get a 1x1 image from a 4x4 one, we simply perform the convolution on the original input, without any padding (in other words, padding=0 for this layer).</p>
          </section>
          <section className="project-article">
              <h2>Generator</h2>
              <p>The Generator architecture is similar to the one for the Discriminator described above, except that the layers are in the reverse order, and deconvolution is performed instead of convolution to upsample the input. We also use 100 1x1 noise inputs as opposed to the single output of the discriminator. Finally, we add a deconv operation in the last layer of the Generator as the activation function; we use tanh here since the regular sigmoid function suffers from the problem of vanishing gradients.</p>
              <figure id="dcgan_gen">
              <img src={dcgan_generator} alt="DCGAN Generator Architecture"/>
              <figcaption>Figure 3: CNN Architecture for the DCGAN Generator</figcaption>
              </figure>           
          </section>
          <section className="project-article">
              <h2>Training Loop</h2>
              <p>With our Generator and Discriminator ready, we then trained our DCGAN. The steps for the same are listed below.</p>
              <ol>
              <li>Take m training examples from the dataset.</li>
              <li>Take m noise samples from the normal distribution.</li>
              <li>Pass the noise samples through the generator network to produce m fake images.</li>
              <li>Compute the discriminator loss and update its weights through backpropagation.</li>
              <li>Take m new noise samples from the normal distribution and generate fake images as before.</li>
              <li>Compute the generator loss and update its weights through backpropagation.</li>
              </ol>
              <p>The loss functions for the discriminator and generator are given below. In these equations, x denotes training examples and z, the noise samples.</p>
              <p class="eq_header">Discriminator Loss</p>
              <img class="eq" src={dcgan_d_loss} alt="DCGAN Discriminator Loss Equation"/>
              <p class="eq_header">Generator Loss</p>
              <img class="eq" src={dcgan_g_loss} alt="DCGAN Generator Loss Equation"/>
          </section>
          <section className="project-article" id="plots">
              <h2>Plots of Training Loss</h2>
              <article>
              <p class="eq_header">Discriminator Loss (Basic Augmentation)</p>
              <img src={dcgan_d_loss_basic} alt="Plot of DCGAN Discriminator Loss for Basic Augmentation"/>  
              </article>              
              <article>
              <p class="eq_header">Discriminator Loss (Deluxe Augmentation)</p>
              <img src={dcgan_d_loss_deluxe} alt="Plot of DCGAN Discriminator Loss for Deluxe Augmentation"/>
              </article>
              <article>
              <p class="eq_header">Generator Loss (Basic Augmentation)</p>
              <img src={dcgan_g_loss_basic} alt="Plot of DCGAN Generator Loss for Basic Augmentation"/>  
              </article>
              <article>
              <p class="eq_header">Generator Loss (Deluxe Augmentation)</p>
              <img src={dcgan_g_loss_deluxe} alt="Plot of DCGAN Generator Loss for Deluxe Augmentation"/>  
              </article>
              <p id='top'>In a GAN network, we train the discriminator and the generator alternately. At the start of training, both discriminator loss and generator loss are random (due to the random initialization of weights). As the generator gets better at producing cat images that trick the discriminator, the generator loss decreases but the discriminator loss increases. On the other hand, as the discriminator gets better at distinguishing real vs fake cat images, the discriminator loss decreases while the generator loss increases. Accordingly, the plot for these two losses should decrease for a while, increase back up and then decrease again, and so on. Over time though, as both the generator and discriminator get better, the peak losses decrease too. Both these points are in line with the plots obtained above.</p>
              <p>If we compare the results for the basic and deluxe augmentations, we see that the loss in the deluxe case decreases much faster than that in the basic one; the best example of this is the plots for the fake loss of discriminator&mdash; there are a lot more spikes in the plot for the basic case. It would also not be surprising if the magnitude of minimum loss achieved for the deluxe case were smaller than that of the basic one. This would be expected since the purpose of random crops and flips in the deluxe augmentation is, in fact, to make the CycleGAN more robust and, consequently, to be able to achieve a lower loss.</p>
          </section>
          <section className="project-article">
              <h2>Outputs</h2>
              <p>Below are example outputs of the DCGAN for the first few iterations of training; data augmentaton was set to "deluxe" to generate these results.</p>
              <figure id="dcgan_ini_out">
              <img src={dcgan_ini_output} alt="DCGAN Output"/>
              <figcaption>Figure 4: DCGAN Output Early in Training</figcaption>
              </figure>
              <p>As can be seen, the output starts off as noise, but slowly learns to generate cats as evident from the outputs after 400 and 600 iterations&mdash;faint outlines of cats are starting to become visible from wihin the noise. Let's take a look at the output much later in training, like after 10k iterations.</p>
              <figure id="dcgan_fin_out">
              <img src={dcgan_fin_output} alt="DCGAN Output"/>
              <figcaption>Figure 5: DCGAN Output Late in Training</figcaption>
              </figure>
              <p>The images now look a lot like real cats. There are still some problems with these images&mdash;like some noise at the edges of the images, the eyes of some cats are not aligned, the images are a bit blurry, etc.&mdash; but they are still great considering that they started off as random noise.</p>
              <p>Below is a visual of how the output of the DCGAN evolved over the course of training.</p>
              <figure class="gif">
              <img src={dcgan_cats} alt="DCGAN Output GIF"/>
              <figcaption>Figure 6: Evolution of DCGAN Output during Training on Cats Dataset</figcaption>
              </figure>
          </section>
          <section className="project-article">
              <h2>Testing on Another Dataset</h2>
              <p>In addition to the cat images, we also tried to use the DCGAN on images of fire pokemon. Examples of the input images are shown below.</p>
              <figure id="fire_pkmn">
              <img src={pkmn_train} alt="Fire Pokemon"/>
              <figcaption>Figure 7: Training Data&mdash;Images of Fire Pokemon</figcaption>
              </figure>
              <p>The outputs after training for around 10k iterations were as follows:</p>
              <figure id="dcgan_pkmn_out">
              <img src={dcgan_pkmn_output} alt="DCGAN Output for Fire Pokemon"/>
              <figcaption>Figure 8: DCGAN Output for Fire Pokemon Dataset</figcaption>
              </figure>
              <p>Clearly, the outputs are not as good as the cats in the previous section. One obvious reason is that the fire pokemon dataset contains images of pokemon having different shapes, sizes and colors. Due to this, the DCGAN is not able to learn exactly what a "fire pokemon" is&mdash;when it optimizes its loss function towards one pokemon example, the next example is so different that it essentially unlearns what it just did (this can be observed in the GIF below). But even though it doesn't produce good outputs, it is still able to understand the common characteristics of fire pokemon&mdash;mainly, the colors used (if you compare the ouputs to the input images above, you can see that most of the same colors are used). Perhaps if we used a dataset containing pokemon of a more similar shape, we might get much better results.</p>
              <figure class="gif">
              <img src={dcgan_pkmn} alt="DCGAN Pokemon Output GIF"/>
              <figcaption>Figure 9: Evolution of DCGAN Output during Training on Pokemon Dataset</figcaption>
              </figure>
          </section>
      </article>
      <article className="project-article">
          <h1>CycleGAN</h1>
          <p>CycleGANs are used for image-to-image translation&mdash;for e.g., converting a photo taken during the day to one taken at night. In this project, we shall attempt to transform grumpy cats into russian blue cats; examples of both are shown below. The discriminator is the same as the one used in DCGAN earlier, and so, only the generator architecture will be discussed in the following sections.</p>
          <figure id="cycle_data">
              <img src={cycle_train} alt="Training Examples for CycleGAN"/>
              <figcaption>Figure 10: Training Data for CycleGAN&mdash;Grumpy Cat (left) vs Russian Blue Cat (right)</figcaption>
          </figure>
          <section className="project-article">
              <h2>Generator</h2>
              <p>The generator architecture essentially comprises of an encoder network (a series of convolution layers), 1-3 residual blocks (that perform the domain transfer operation), and a decoder network (a series of deconvolution operations). Each of the residual blocks are essentially comprised of a convolution layer, where the input is added to the output of the convolution; this is done to ensure that the high-level characteristics of the output isn't too different from the input. The architecture diagram for the CycleGAN Generator used in this project is given below.</p>
              <figure id="cycle_gen">
              <img src={cyclegan_generator} alt="Architecture for CycleGAN Generator"/>
              <figcaption>Figure 11: Encoder-Decoder Architecture for CycleGAN</figcaption>
              </figure>
          </section>
          <section className="project-article">
              <h2>Training Loop</h2>
              <p>The steps for the training the CycleGAN are similar to that of DCGAB. Nevertheless, the entire sequence of events is listed below.</p>
              <ol>
              <li>Take m training examples from domain X (Russian Blue Cats).</li>
              <li>Take n training examples from domain Y (Grumpy Cats).</li>
              <li>Pass the training examples through the CycleGAN generator to produce translated images.</li>
              <li>Compute the discriminator loss on real and fake images.</li>
              <li>Update the weights of the X &amp; Y discriminators through backpropagation.</li>
              <li>Produce another set of translated images.</li>
              <li>Compute the "X to Y" and "Y to X" generator losses and update their weights through backpropagation.</li>
              </ol>
              <p>The loss functions for the discriminators and generators are given below.</p>
              <p class="eq_header">Discriminator Loss for Real Images</p>
              <img class="eq" src={cycle_dr_loss} alt="CycleGAN Discriminator Loss Equation for Real Images"/>
              <p class="eq_header">Discriminator Loss for Fake Images</p>
              <img class="eq" src={cycle_df_loss} alt="CycleGAN Discriminator Loss Equation for Fake Images"/>
              <p class="eq_header">Generator Loss for "Y to X" Translation</p>
              <img class="eq" src={cycle_gyx_loss} alt='CycleGAN Generator Loss Equation for "Y to X" Translation'/>
              <p class="eq_header">Generator Loss for "X to Y" Translation</p>
              <img class="eq bot" src={cycle_gxy_loss} alt='CycleGAN Generator Loss Equation for "X to Y" Translation'/>
              <p>The one thing in the above equations not mentioned earlier is the cycle-consistency loss, Jcycle. The idea here is that if we convert an image from domain X to Y and then back to domain X, the result should look similar to the input. Accordingly, we compute the L1 norm of the difference between the input image and the result of the cyclic transformation, and then try to minimize this error. The equation for this is given below.</p>
              <img class="eq bot" src={cycle_loss} alt="CycleGAN Cycle Consistency Loss Equation"/>
              <p>As seen in the generator loss equations earlier, we add this cycle-consistency loss with the mean-squared loss. However, we first multiply the cycle-consistency loss by a factor of lambda, allowing us to select the extent to which input characteristics should be mainintained in the output image.</p>
          </section>
          <section className="project-article">
              <h2>Outputs</h2>
              <p>We first ran the CycleGAN for 600 iterations without cycle-consistency loss. The results are shown below:</p>
              <figure id="no_cycle_cons">
              <img src={no_cycle_cons_600} alt="CycleGAN Output w/o Cycle-Consistency Loss"/>
              <figcaption>Figure 12: Output for CycleGAN w/o Cycle-Consistency Loss at 600 Iterations</figcaption>
              </figure>
              <p>And here's the output with cycle-consistency loss (using lambda=100):</p>
              <figure id="cycle_cons">
              <img src={cycle_cons_600} alt="CycleGAN Output w/ Cycle-Consistency Loss"/>
              <figcaption>Figure 13: Output for CycleGAN w/ Cycle-Consistency Loss at 600 Iterations</figcaption>
              </figure>
              <p>Let's do a side-by-side comparison to see the difference (only parts of the previous images are taken, so that they can be easily compared).</p>
              <figure id="cycle_cons_w_wo">
              <img src={cycle_cons_w_wo_600} alt="CycleGAN Output w/ and w/o Cycle-Consistency Loss"/>
              <figcaption>Figure 14: W/o Cycle-Consistency Loss (left) vs W/ Cycle-Consistency Loss (right)</figcaption>
              </figure>
              <p>As mentioned earlier, the purpose of cycle-consistency loss is to maintain input image characteristics in the output. The most obvious example of this effect is the bottom left cat image in the screenshots above. In the output without cycle-consistency loss, the cat appears roundish and the cat's mouth is right below its nose, just like in the grumpy cat images. On the other hand, when cycle-consistency loss is used, the cat's face structure is more like the input (russian blue) cat image; its mouth is also shifted to the position as in the input image. Additionally, if you see the other output images on the right, you can see a tint of green in the background (especially in the top-row images). This, although unintended, is due to the fact that the russian blue cat images in the top row have a green background. We used a value of 100 for lambda here but, depending on whether we increase or decrease it, we can control the extent to which the input characteristics are maintained. The reason for this is that the generator loss function is a sum of the mean-squared loss and the cycle-consistency loss; if we increase lambda, we force the algorithm to focus on minimizing the cycle-consistency loss more, in order to reduce the overall loss.</p>
              <p>Both models (with and without cycle-consistency loss) were trained once again, but for 10k iterations. The results are below:</p>
              <figure id="no_cycle_cons_10k" class="bot">
              <img src={no_cycle_cons_10k} alt="CycleGAN Output w/o Cycle-Consistency Loss"/>
              <figcaption>Figure 15: Output for CycleGAN w/o Cycle-Consistency Loss at 10K Iterations</figcaption>
              </figure>
              <figure id="cycle_cons_10k" class="bot">
              <img src={cycle_cons_10k} alt="CycleGAN Output w/ Cycle-Consistency Loss"/>
              <figcaption>Figure 16: Output for CycleGAN w/ Cycle-Consistency Loss at 10K Iterations</figcaption>
              </figure>
              <p>Just like it was at 600 iterations, the cats in the outputs without cycle-consistency loss have round-ish faces like the grumpy cat images, while the ones with cycle-consistency loss conform more to the face structure of cats in the input images. After 10k cycles, the outputs have certainly become more well-defined, however, there is a bit more noise in the cycle-consistency loss case. Upon checking the training log, it was noticed that the generator loss kept fluctuating between a small range of values (as did the discriminator losses). This means that as the generator tried to get better, the discriminator got worse; but when the discriminator tried to get better again, the increase in the generator loss was so high that the change simply had to be undone (to an extent). Perhaps the choice of lambda was too high and better results may be obtained by lowering the value.</p>
              <p>We end by providing visuals of the CycleGAN outputs over the course of 10k iterations:</p>
              <figure class="bot">
              <img class="center" src={cycle_nc_xy_cats} alt="CycleGAN w/o Cycle-Consistency Loss Output GIF"/>
              <img class="space-center" src={cycle_c_xy_cats} alt="CycleGAN w/ Cycle-Consistency Loss Output GIF"/>
              <figcaption>Figure 17: Evolution of CycleGAN Output&mdash;W/o Cycle-Consistency Loss (top) vs W/ Cycle-Consistency Loss (bottom)&mdash;X to Y Domain</figcaption>
              </figure>
              <figure class="bot">
              <img class="center" src={cycle_nc_yx_cats} alt="CycleGAN w/o Cycle-Consistency Loss Output GIF"/>
              <img class="space-center" src={cycle_c_yx_cats} alt="CycleGAN w/ Cycle-Consistency Loss Output GIF"/>
              <figcaption>Figure 18: Evolution of CycleGAN Output&mdash;W/o Cycle-Consistency Loss (top) vs W/ Cycle-Consistency Loss (bottom)&mdash;Y to X Domain</figcaption>
              </figure>
          </section>
      </article>
    </ProjectPage>
  )
}

export default GeneratingCatsPage

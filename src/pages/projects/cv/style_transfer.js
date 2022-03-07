import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'

import '../../../styles/app.css'

// Images

import example from '../../../images/cv/style_transfer/example.gif';
import cont from '../../../images/cv/style_transfer/cont.png';
import content_a_style_a from '../../../images/cv/style_transfer/content_a_style_a.png';
import content_a_style_b from '../../../images/cv/style_transfer/content_a_style_b.png';
import content_a from '../../../images/cv/style_transfer/content_a.png';
import content_b_style_a from '../../../images/cv/style_transfer/content_b_style_a.png';
import content_b_style_b from '../../../images/cv/style_transfer/content_b_style_b.png';
import content_b from '../../../images/cv/style_transfer/content_b.jpeg';
import ex_a1 from '../../../images/cv/style_transfer/ex_a1.jpg';
import ex_a2 from '../../../images/cv/style_transfer/ex_a2.jpg';
import ex_a3 from '../../../images/cv/style_transfer/ex_a3.png';
import ex_a18 from '../../../images/cv/style_transfer/ex_a18.jpg';
import ex_a38 from '../../../images/cv/style_transfer/ex_a38.png';
import ex_b1 from '../../../images/cv/style_transfer/ex_b1.jpg';
import ex_b2 from '../../../images/cv/style_transfer/ex_b2.jpg';
import ex_b3 from '../../../images/cv/style_transfer/ex_b3.png';
import ex_c1 from '../../../images/cv/style_transfer/ex_c1.jpg';
import ex_c2 from '../../../images/cv/style_transfer/ex_c2.jpg';
import ex_c3 from '../../../images/cv/style_transfer/ex_c3.png';
import nvc_c from '../../../images/cv/style_transfer/nvc_c.png';
import nvc_content from '../../../images/cv/style_transfer/nvc_content.png';
import nvc_n from '../../../images/cv/style_transfer/nvc_n.png';
import nvc_style from '../../../images/cv/style_transfer/nvc_style.jpeg';
import recon_1 from '../../../images/cv/style_transfer/recon_1.png';
import recon_2 from '../../../images/cv/style_transfer/recon_2.png';
import recon_3 from '../../../images/cv/style_transfer/recon_3.png';
import recon_4 from '../../../images/cv/style_transfer/recon_4.png';
import recon_5 from '../../../images/cv/style_transfer/recon_5.png';
import recon_a from '../../../images/cv/style_transfer/recon_a.jpg';
import recon_a1 from '../../../images/cv/style_transfer/recon_a1.png';
import recon_a2 from '../../../images/cv/style_transfer/recon_a2.png';
import recon_b from '../../../images/cv/style_transfer/recon_b.jpeg';
import recon_b1 from '../../../images/cv/style_transfer/recon_b1.png';
import recon_b2 from '../../../images/cv/style_transfer/recon_b2.png';
import recon_c from '../../../images/cv/style_transfer/recon_c.jpeg';
import recon_c1 from '../../../images/cv/style_transfer/recon_c1.png';
import recon_c2 from '../../../images/cv/style_transfer/recon_c2.png';
import st from '../../../images/cv/style_transfer/st.jpeg';
import style_a from '../../../images/cv/style_transfer/style_a.jpeg';
import style_b from '../../../images/cv/style_transfer/style_b.jpg';
import style_x_content from '../../../images/cv/style_transfer/style_x_content.png';
import texture_1_2 from '../../../images/cv/style_transfer/texture_1_2.png';
import texture_1 from '../../../images/cv/style_transfer/texture_1.png';
import texture_2 from '../../../images/cv/style_transfer/texture_2.png';
import texture_3 from '../../../images/cv/style_transfer/texture_3.png';
import texture_4 from '../../../images/cv/style_transfer/texture_4.png';
import texture_5 from '../../../images/cv/style_transfer/texture_5.png';
import texture_a from '../../../images/cv/style_transfer/texture_a.jpg';
import texture_a1 from '../../../images/cv/style_transfer/texture_a1.png';
import texture_a2 from '../../../images/cv/style_transfer/texture_a2.png';
import texture_b from '../../../images/cv/style_transfer/texture_b.jpg';
import texture_b1 from '../../../images/cv/style_transfer/texture_b1.png';
import texture_b2 from '../../../images/cv/style_transfer/texture_b2.png';
import texture_c from '../../../images/cv/style_transfer/texture_c.jpg';
import texture_c1 from '../../../images/cv/style_transfer/texture_c1.png';
import texture_c2 from '../../../images/cv/style_transfer/texture_c2.png';

const StyleTransferPage = () => {
  return (
    <ProjectPage image={ example } title="Applying Neural-based Style Transfer to Images" >    
      <article className="project-article">
          <h1>Task</h1>
          <p> The goal of this project was to implement neural style transfer; specifically, we attempted to recreate a certain content in a different art style. We did this by taking two input images&mdash;one for content and the other for style&mdash;and optimizing the corresponding content &amp;style losses against the network's output.</p>     
      </article>
      <article className="project-article">
          <h1>Content Reconstruction</h1>
          <p>For the initial setup, we implemented the content-space loss alone and studied the output of the Neural Net. The following image was used for the content reconstruction experiments.</p>
          <figure id="recon_input">
            <img src={cont} alt="Input Image"/>
            <figcaption>Figure 1: Input Image for Content Reconstruction</figcaption>
          </figure>      
          <section className="project-article">
            <h2>Defining Content loss</h2>
            <p>Content loss is used to measure the difference in content between two images; this is typically measured at a certain layer of the network. We define this loss as the mean-squared error (MSE) between the (corresponding layers of the) images. In our implementation, we used the MSELoss() function which is included in PyTorch's Neural Network (nn) module.</p>
          </section>
          <section className="project-article">
            <h2>Building the Neural Network</h2>
            <p>To build our model, we used the pre-trained <a href="https://arxiv.org/abs/1409.1556">VGG-19 net</a> model which is available within TorchVision's built-in models.</p>
            <p>We created our network's architecture by starting with a Normalization layer (converting pixel values into z-scores) and then added each layer from the VGG-19 net one at a time. After every convolution layer, we added a content-loss layer which simply computes the content-loss (as described earlier) during a forward pass of the network. Finally, we trimmed off all layers (ReLU, Normalization, etc.) after the last content-loss layer.</p>
          </section>
          <section className="project-article">
            <h2>Optimization</h2>
            <p>To optimize the pre-trained VGG-19 net with added Normalization and Style/Content Loss layers, we used the <a href="https://en.wikipedia.org/wiki/Limited-memory_BFGS">LBFGS optimizer</a>. We perform this optimization a number of times during a training run, which involves going through the following steps:</p>
            <ol>
              <li>Clamping the input image pixel values between 0 and 1</li>
              <li>Clearing the gradients by setting them to 0</li>
              <li>Passing the input image through the model</li>
              <li>Computing the weighted content loss and its gradient</li>
              <li>Returning the loss</li>
            </ol>
            <p>In addition to the steps mentioned above, we also print the (unweighted) content loss every 10 iterations and clamp the input image between 0 and 1 one last time at the end of the optimzation. Additionally, the output image is saved as a png file every 100 iterations.</p>
          </section>
          <section className="project-article">
            <h2>Experiments</h2>
            <p>As discussed earlier, content loss is applied at a specific layer of the network. Accordingly, we tried applying the content-loss function at each layer of the VGG-19 net model (5 in total). The results are shown below.</p>
            <figure id="content_recon">
              <div className="grid5">
                <img src={recon_1} alt="Layer 1 Reconstruction"/>
                <img src={recon_2} alt="Layer 2 Reconstruction"/>
                <img src={recon_3} alt="Layer 3 Reconstruction"/>
                <img src={recon_4} alt="Layer 4 Reconstruction"/>
                <img src={recon_5} alt="Layer 5 Reconstruction"/>
              </div>
              <figcaption>Figure 2: Content Reconstruction w/ Content Loss at Layer 1, 2, 3, 4 &amp;5 (from left to right)</figcaption>
            </figure> 
            <p>As seen above, the reconstructed image gets worse (more noisy) when it is applied to latter layers of the network; this is because the image output at those layers are more abstracted from the original input image. This is clear from the minimum content loss obtained for content reconstruction at each layer: 0.0, 0.000177, 0.109410, (these values are for a 300-step optimization). Accordingly, we chose to use content loss at the second layer (conv_2) since that's the deepest we can go without noticeable noise.</p>
            <p>Here are a few more examples of content reconstruction for different content images using 2 random-noise image inputs each trained for 300 steps:</p>
            <article className="project-article" id="cr_results">
              <h2>Original Image</h2>
              <h2>Reconstructed Image #1</h2>
              <h2>Reconstructed Image #2</h2>
              <img src={recon_a} alt="Original Input #1"/>
              <img src={recon_a1} alt="Reconstructed Image #1"/>
              <img src={recon_a2} alt="Reconstruction Image #1"/>
              <img src={recon_b} alt="Original Input #2"/>
              <img src={recon_b1} alt="Reconstructed Image #2"/>
              <img src={recon_b2} alt="Reconstruction Image #3"/>
              <img src={recon_c} alt="Original Input #3"/>
              <img src={recon_c1} alt="Reconstructed Image #3"/>
              <img src={recon_c2} alt="Reconstruction Image #3"/>
            </article>
            <p>As see above, the reconstructed images are slightly blurry, though quite similar to the original image. This may be due to the fact that content reconstruction was performed at layer 2, which is slighly abstracted away from the original image. Additionally, even though the two reconstructed images for each example started off as randomly-generated noise, they both look almost identical; this is because the minimum content loss obtained for either of these images was extremely small (around 0.0001). This shows that our content reconstruction operation is working as expected.</p>
          </section> 
      </article>
      <article className="project-article">
          <h1>Texture Synthesis</h1>
          <p>This time around, we focused on style-space loss; the steps were similar to those in the previous section. Below is the image used for the texture synthesis experiments; the image was (manually) reshaped to have the same dimensions as the content image (since they need to match so that pixel-by-pixel loss can be computed).</p>
          <figure id="texture_input">
            <img src={st} alt="Input Image"/>
            <figcaption>Figure 3: Input Image for Texture Synthesis</figcaption>
          </figure>      
          <section className="project-article">
            <h2>Defining Style loss</h2>
            <p>To compute the difference in styles between two images, we used the <a href="https://en.wikipedia.org/wiki/Gramian_matrix">Gram matrix</a> followed by the mean-squared error (MSE) function as in content-loss calculation.</p>
          </section>
          <section className="project-article">
            <h2>Adding Style-Loss Layers</h2>
            <p>In place of adding content-loss layers in the pre-trained VGG-19 net model, we now used style-loss layers; everything else is exactly as it was in the previous section.</p>
          </section>
          <section className="project-article">
            <h2>Optimization</h2>
            <p>Finally, we added the optimization step for style-space loss. Rather than creating a separate optimization function, we simply added two flags&mdash;use_content &amp;use_style&mdash;to select the right losses for calculation.</p>
          </section>
          <section className="project-article">
            <h2>Experiments</h2>
            <p>Just like with content loss, we tried applying the style-loss function at each layer of the VGG-19 net model. Results are shown below.</p>
            <figure id="text_synth">
              <div className="grid5">
                <img src={texture_1} alt="Layer 1 Texture Sythesis"/>
                <img src={texture_2} alt="Layer 2 Texture Sythesis"/>
                <img src={texture_3} alt="Layer 3 Texture Sythesis"/>
                <img src={texture_4} alt="Layer 4 Texture Sythesis"/>
                <img src={texture_5} alt="Layer 5 Texture Sythesis"/>
              </div>
              <figcaption>Figure 4: Texture Sythesis w/ Style Loss at Layer 1, 2, 3, 4 &amp;5 (from left to right)</figcaption>
            </figure> 
            <p>As seen above, applying style loss optimization to different layers of the VGG-19 net model results in different textures. Among these, the layer-2 optimization output seems to be the smoothest (the layer-1 output is a close second); there is a varying degree of noise in the other outputs. Accordingly, we decided to use style loss on layer 1 &amp;2. The result for this combined loss optimization is as follows:</p>
            <figure id="text_synth_final">
              <img src={texture_1_2} alt="Layer 1 &amp;2 Texture Sythesis"/>
              <figcaption>Figure 5: Texture Sythesis w/ Style Loss at Layers 1 &amp;2</figcaption>
            </figure>   
            <p>Below are a few more examples of texture synthesis for different style images using 2 random-noise image inputs each trained for 300 steps (layer 1 &amp;2 are used as before):</p>
            <article className="project-article" id="ts_results">
              <h2>Original Image</h2>
              <h2>Texture #1</h2>
              <h2>Texture #2</h2>
              <img src={texture_a} alt="Original Input #1"/>
              <img src={texture_a1} alt="Texture #1"/>
              <img src={texture_a2} alt="Texture #1"/>
              <img src={texture_b} alt="Original Input #2"/>
              <img src={texture_b1} alt="Texture #2"/>
              <img src={texture_b2} alt="Texture #3"/>
              <img src={texture_c} alt="Original Input #3"/>
              <img src={texture_c1} alt="Texture #3"/>
              <img src={texture_c2} alt="Texture #3"/>
            </article>
            <p>The textures generated resemble the colors in the original input images. Since random noise was used as the input, the two texture images generated for each example are different, though the patterns are quite similar. Accordingly, the texture synthesis step is also working as expected.</p>
          </section>
      </article>
      <article className="project-article">
          <h1>Style Transfer</h1>
          <p>After having tested both content-space loss and style-space loss independently, we now put them both together to perform style transfer. The results are included in this section.</p>
          <section className="project-article">
            <h2>Hyperparameters Used</h2>
            <p>The following values were used for generating the results in this section:</p>
            <ul class="dotted">
              <li>Content-Loss Layers: Layer 2</li>
              <li>Style-Loss Layers: Layer 1 &amp;2</li>
              <li>Content Weight: 1</li>
              <li>Style Weight: 1000000</li>
              <li>Input Image: White Noise</li>
              <li>Number of Optimization Steps: 1500 (sharper outputs may be obtained by training for longer)</li>
            </ul>
          </section>
          <section className="project-article">
            <h2>Content vs Style Grid</h2>
            <article className="project-article">
              <article className="project-article" id="st_results">
                <img src={style_x_content} alt=""/>
                <img src={style_a} alt="Style Input #1"/>
                <img src={style_b} alt="Style Input #2"/>
                <img src={content_a} alt="Content Input #1"/>
                <img src={content_a_style_a} alt="Content #1 + Style #1"/>
                <img src={content_a_style_b} alt="Content #1 + Style #2"/>
                <img src={content_b} alt="Content Input #2"/>
                <img src={content_b_style_a} alt="Content #2 + Style #1"/>
                <img src={content_b_style_b} alt="Content #2 + Style #2"/>
              </article>      
            </article>
          </section>
          <section className="project-article">
            <h2>Noise vs Content Image as Input</h2>
            <p>We also compared the difference between using the content image vs white noise as the input image (up till this point of the assignment, only white noise was used). Below are the content and style images used.</p>
            <figure id="nvc_1">
              <div className="grid2">
                <img src={nvc_content} alt="Content Image"/>
                <img src={nvc_style} alt="Style Image"/>
              </div>
              <figcaption>Figure 6: Content Image (left) and Style Image (right)</figcaption>
            </figure>
            <p>For both possible input images, we perform the style transfer operation for 100 optimization steps. Below are the outputs.</p>
            <figure id="nvc_2">
              <div className="grid2">
                <img src={nvc_n} alt="Noise Output"/>
                <img src={nvc_c} alt="Content Image Output"/>
              </div>
              <figcaption>Figure 7: Output using Noise as Input (left) vs Output using Content Image as Input (right)</figcaption>
            </figure>
            <p>The runtimes for the style transfer using noise vs content image as input were 93.78 and 102.66 seconds, respectively (these runtimes are large even for 100 steps since a CPU was used). Using the content image as the input makes the optimization step take slightly longer (though they are still comparable) but the output is a lot better than when using noise as the input. The left image looks very noisy as compared to the right since the Neural Net has not yet (at 100 steps) understood the content of the image; using the content as the input skips this step, making the output look smooth every early on in training.</p>
          </section>
          <section className="project-article">
            <h2>More Results</h2>
            <p>(Note: White noise was used as input in these images.)</p>
            <article className="project-article" id="ex_results">
              <h2>Content Image</h2>
              <h2>Style Image</h2>
              <h2>Output Image</h2>
              <img src={ex_a1} alt="Content #1"/>
              <img src={ex_a2} alt="Style #1"/>
              <img src={ex_a3} alt="Output #1"/>
              <img src={ex_b1} alt="Content #2"/>
              <img src={ex_b2} alt="Style #2"/>
              <img src={ex_b3} alt="Output #2"/>
              <img src={ex_c1} alt="Content #3"/>
              <img src={ex_c2} alt="Style #3"/>
              <img src={ex_c3} alt="Output #3"/>
            </article>      
          </section>
      </article>
    </ProjectPage>
  )
}

export default StyleTransferPage

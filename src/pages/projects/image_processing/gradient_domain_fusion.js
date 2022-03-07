import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'

import '../../../styles/app.css'

// Images

import example from '../../../images/image_processing/gradient_domain_fusion/example.png';
import beach_mask_lyc from '../../../images/image_processing/gradient_domain_fusion/beach_mask_lyc.png';
import beach_mask_pal from '../../../images/image_processing/gradient_domain_fusion/beach_mask_pal.png';
import beach from '../../../images/image_processing/gradient_domain_fusion/beach.jpg';
import bear_direct_blend from '../../../images/image_processing/gradient_domain_fusion/bear_direct_blend.png';
import bear_mask from '../../../images/image_processing/gradient_domain_fusion/bear_mask.jpg';
import bear_poisson_blend from '../../../images/image_processing/gradient_domain_fusion/bear_poisson_blend.png';
import bear from '../../../images/image_processing/gradient_domain_fusion/bear.jpg';
import capcat_source from '../../../images/image_processing/gradient_domain_fusion/capcat_source.png';
import capcat from '../../../images/image_processing/gradient_domain_fusion/capcat.jpg';
//import Figure 2021-03-09 220625 from '../../../images/image_processing/gradient_domain_fusion/Figure 2021-03-09 220625.png';
import jet from '../../../images/image_processing/gradient_domain_fusion/jet.jpg';
import lycanroc_source from '../../../images/image_processing/gradient_domain_fusion/lycanroc_source.png';
import lycanroc from '../../../images/image_processing/gradient_domain_fusion/lycanroc.png';
import mel_direct_blend from '../../../images/image_processing/gradient_domain_fusion/mel_direct_blend.png';
import mel_poisson_blend from '../../../images/image_processing/gradient_domain_fusion/mel_poisson_blend.png';
import mel_source from '../../../images/image_processing/gradient_domain_fusion/mel_source.png';
import mel from '../../../images/image_processing/gradient_domain_fusion/mel.png';
import mx_mixed_blend from '../../../images/image_processing/gradient_domain_fusion/mx_mixed_blend.png';
import mx_poisson_blend from '../../../images/image_processing/gradient_domain_fusion/mx_poisson_blend.png';
import null_reaper from '../../../images/image_processing/gradient_domain_fusion/null_reaper.png';
import palossand_source from '../../../images/image_processing/gradient_domain_fusion/palossand.png';
import palossand from '../../../images/image_processing/gradient_domain_fusion/mel.png';
import park_mask from '../../../images/image_processing/gradient_domain_fusion/park_mask.png';
import park from '../../../images/image_processing/gradient_domain_fusion/park.jpg';
import pb_direct_blend from '../../../images/image_processing/gradient_domain_fusion/pb_direct_blend.png';
import pb_fg from '../../../images/image_processing/gradient_domain_fusion/pb_fg.png';
import pb_mask from '../../../images/image_processing/gradient_domain_fusion/pb_mask.png';
import pb_poisson_blend from '../../../images/image_processing/gradient_domain_fusion/pb_poisson_blend.png';
import pkmn_direct_blend from '../../../images/image_processing/gradient_domain_fusion/pkmn_direct_blend.png';
import pkmn_poisson_blend from '../../../images/image_processing/gradient_domain_fusion/pkmn_poisson_blend.png';
import poisson from '../../../images/image_processing/gradient_domain_fusion/poisson.png';
import shark_direct_blend from '../../../images/image_processing/gradient_domain_fusion/shark_direct_blend.png';
import shark_poisson_blend from '../../../images/image_processing/gradient_domain_fusion/shark_poisson_blend.png';
import shark_source from '../../../images/image_processing/gradient_domain_fusion/shark_source.png';
import shark from '../../../images/image_processing/gradient_domain_fusion/shark.jpg';
import snowy_direct_blend from '../../../images/image_processing/gradient_domain_fusion/snowy_direct_blend.png';
import snowy_mask from '../../../images/image_processing/gradient_domain_fusion/snowy_mask.png';
import snowy_mountain from '../../../images/image_processing/gradient_domain_fusion/snowy_mountain.jpg';
import snowy_poisson_blend from '../../../images/image_processing/gradient_domain_fusion/snowy_poisson_blend.png';
import space_mask from '../../../images/image_processing/gradient_domain_fusion/space_mask.png';
import snowy from '../../../images/image_processing/gradient_domain_fusion/snowy.png';
import space from '../../../images/image_processing/gradient_domain_fusion/space.jpg';
import swimming_pool from '../../../images/image_processing/gradient_domain_fusion/swimming_pool.jpg';
import toy_input from '../../../images/image_processing/gradient_domain_fusion/toy_input.png';
import toy_objectives from '../../../images/image_processing/gradient_domain_fusion/toy_objectives.png';
import toy_output from '../../../images/image_processing/gradient_domain_fusion/toy_output.png';


const GDFPage = () => {
  return (
    <ProjectPage image={ example } title="Blending Objects from One Image into Another" >    
      <article className="project-article">
          <h1>Task</h1>
          <p> The main goal of this project is to explore gradient-domain processing; specifically, we are interested in using "Poisson Blending" to seamlessly combine multiple images. To achieve this, we shall formulate the Poisson objective function as a least squares problem and solve for the pixel values of the blended image.</p>
      </article>
      <article className="project-article">
        <h1>Approach</h1>
        <p>Before getting into the technical details of this project, let's first look at the inputs needed to run the code.</p>
        <ol>
          <li>Foreground Image: This is the image that will be overlayed on top of another. Instead of the complete image, only the object we plan to blend in another image is included; the rest of the image is black.</li>
          <li>Background Image: The object from the foreground image will be blended into a specific area of this image.</li>
          <li>Mask: The specific area of the background image where the foreground object will be overlayed is represented by the mask (as 1's and 0's).</li>
        </ol>
        <p>The Poisson objective function is given below:</p>
        <img id="poisson" src={poisson} alt="Poisson Objective Function"/>
        <p>In the equation above, "s" represents the source (foreground) image, "t" denotes the target (background) image, and "v" is the blended image we wish to solve for; the "i" denotes a specific pixel in the images, while "j" represents the four neighboring pixels of "i" (top, down, left and right). One thing that can be inferred from the equation is that the left summation only applicable when neighboring pixels (given by "j") are within the portion of the source image that is blended into the target image (which can be checked by looking the the pixel values of the mask); the right summation is applicable otherwise. Accordingly, we use "if...else" blocks (for each of the 4 neighboring pixels) to decide which summation constraint to use.</p>
        <p>To solve the objective function, we first rewrite it as a matrix product Av = b. Here, A is a sparse matrix representing which pixels in the image "v" are used in each constraint. Each row of A represents the left-hand side of one constraint; the right-hand side of the constraint is placed in the same row of vector b. (Note, to have each row represent a constraint equation, the 2D image is represented as a 1D vector).</p>
        <p>Once we build the sparse matrix A and vector b from the three inputs described earlier, we use the least squares solver function from the SciPy library (scipy.sparse.linalg.lsqr) to get the 1-D vector "v". We then reshape it into a 2-D image with the same dimensions as the target (backgroud) image.</p>
        <p>Finally, we build the final image by taking pixels from the target (background) image for the unmasked region and pixels from the blended image "v" for the masked region. We do this for all 3 color channels (RGB) separately, and return the resulting 3-color blended image.</p>
      </article>
      <article className="project-article">
        <h1>A Toy Problem</h1>
        <p>Before writing the code for the Poission Blending function described above, we first tested a simpler example. This was done in order to ensure that we were properly converting the objective function into a sparse matrix A and a vector b.</p>
        <p>For this problem, the following single-channel image was used as the input:</p>
        <figure id="toy_input">
          <img src={toy_input} alt="Greyscale Image from Toy Story"/>
          <figcaption>Figure 1: Toy Problem Input</figcaption>
        </figure>
        <p>A set of three simpler objective functions (given below) were used to perform this initial test. Our goal was to find the values of pixels in image "v" that minize these expressions.</p>
        <img id="toy_objectives" src={toy_objectives} alt="Objective Functions for Toy Problem"/>
        <p>The exact same procedure described in the previous section was followed here (the difference being the objective functions and the single-channel, instead of multi-channel, image). The objective functions given in this section define a simple identity operation (by looking at the equations, it is clear that the values of pixels in image "v" should be the same as those of image "s" for the objective funtions to be minimum, i.e. 0). The result obtained by running the implemented code is given below.</p>
        <figure id="toy_output">
          <img src={toy_output} alt="Identical Input and Output of Toy Problem"/>
          <figcaption>Figure 2: Toy Problem Input (Left) vs Output (Right)</figcaption>
        </figure>
        <p>As can be seen, the output image is identical to the input image. This means that our conversion from the constraint equations to the matrix-multiplication format is as we expect.</p>
      </article>
      <article className="project-article">
        <h1>Poisson Blending</h1>
        <p>Now, we get to the main portion of this project: the Poisson Blending task. To start things off, we select the two input images shown below.</p>
        <figure>
          <div className="grid2_3_2">
            <img src={jet} alt="Flying Jet Image"/>
            <img src={snowy_mountain} alt="Snowy Mountain Image"/>
          </div>
          <figcaption>Figure 3: Input Images for Poisson Blending</figcaption>
        </figure>
        <p>Our goal is to blend the flying jet image (foreground) into the sky of the snowy mountain image (background) on the right. To do this, we must first create a mask describing the region we want to blend the images together. We used the "masking_code.py" code (provided with the assignment) to get the following foreground image, background image, and mask, which we will use for our Poisson Blending function.</p>
        <figure>
          <div className="grid3">
            <img src={pb_fg} alt="Foreground Image"/>
            <img src={snowy_mountain} alt="Background Image"/>
            <img src={pb_mask} alt="Mask"/>
          </div>
          <figcaption>Figure 4: Foreground Image, Background Image, and Mask (from Left to Right)</figcaption>
        </figure>
        <p>If we simply copy the pixels in the masked region from the foreground image to the background one, we get the following result:</p>
        <figure id="pb_direct_blend">
          <img src={pb_direct_blend} alt="Imperfectly Blended Image"/>
          <figcaption>Figure 5: Direct Copy of Pixels from Foreground to Background Image</figcaption>
        </figure>
        <p>Clearly, this is not good enough; hence we need Poisson Blending. The implementation of the Poisson Blending function was exactly as discussed in the "Approach" section (no extra realignment or rotation was performed since the inputs were satisfactory as is.) The Poisson Blending function performed the blending operation for each of the three color channels, and the resulting blended image was as follows:</p>
        <figure id="pb_poisson_blend">
          <img src={pb_poisson_blend} alt="Poisson Blended Image"/>
          <figcaption>Figure 6: Poisson Blended Output</figcaption>
        </figure>
        <p>As can be seen above, the image obtained through Poisson Blending is clearly better than the simple "direct copy" method. Thus, we have successfully implemented the Poisson Blending function.</p>
      </article>
      <article className="project-article">
        <h1>More Examples of Poisson Blending</h1>
        <section className="project-article">
          <h2>Bear in the Pool</h2>
          <figure id="bear_inputs">
            <div className="grid3">
              <img src={bear} alt="Bear"/>
              <img src={swimming_pool} alt="Swimming Pool"/>
              <img src={bear_mask} alt="Bear Mask"/>
            </div>
            <figcaption>Figure 7: Foreground Image, Background Image, and Mask (from Left to Right)</figcaption>
          </figure>
          <figure>
            <div className="grid2">
              <img src={bear_direct_blend} alt="Imperfectly Blended Image"/>
              <img src={bear_poisson_blend} alt="Poisson Blended Image"/>
            </div>
            <figcaption>Figure 8: Direct Blend (Left) vs Poission Blend (Right)</figcaption>
          </figure>
        </section>
        <section className="project-article">
          <h2>Snowy Cat</h2>
          <figure id="snowcat_input">
            <div className="grid2">
              <img src={capcat} alt="Image of Cat Wearing a Cap"/>
              <img src={snowy} alt="Image of Snowy Mountain"/>
            </div>
            <figcaption>Figure 9: Input Images</figcaption>
          </figure>
          <figure id="snowcat_inputs">
            <div className="grid3">    
              <img src={capcat_source} alt="Aligned Image of Cat Wearing a Cap"/>
              <img src={snowy} alt="Image of Snowy Mountain"/>
              <img src={snowy_mask} alt="Cat in Snowy Montain Image Mask"/>
            </div>
            <figcaption>Figure 10: Foreground Image, Background Image, and Mask (from Left to Right)</figcaption>
          </figure>
          <figure id="snowcat_blends">
            <div className="grid2">
              <img src={snowy_direct_blend} alt="Imperfectly Blended Image"/>
              <img src={snowy_poisson_blend} alt="Poisson Blended Image"/>
            </div>
            <figcaption>Figure 11: Direct Blend (Left) vs Poission Blend (Right)</figcaption>
          </figure>
        </section>
        <section className="project-article">
          <h2>Space Shark</h2>
          <figure id="shark_input">
            <div className="grid2">
              <img src={shark} alt="Image of Shark Underwater"/>
              <img src={space} alt="Image of Planet in Space"/>
            </div>
            <figcaption>Figure 12: Input Images</figcaption>
          </figure>
          <figure id="shark_inputs">
            <div className="grid3">
              <img src={shark_source} alt="Aligned Image of Shark in Space"/>
              <img src={space} alt="Image of Planet in Space"/>
              <img src={space_mask} alt="Shark in Space Mask"/>
            </div>
            <figcaption>Figure 13: Foreground Image, Background Image, and Mask (from Left to Right)</figcaption>
          </figure>
          <figure id="shark_blends">
            <div className="grid2">
              <img src={shark_direct_blend} alt="Imperfectly Blended Image"/>
              <img src={shark_poisson_blend} alt="Poisson Blended Image"/>
            </div>
            <figcaption>Figure 14: Direct Blend (Left) vs Poission Blend (Right)</figcaption>
          </figure>
        </section>
        <section className="project-article">
          <h2>Meloetta in the Park</h2>
          <figure id="mel_input">
            <div className="grid2">
              <img src={mel} alt="Image of Meloetta"/>
              <img src={park} alt="Image of a Park"/>
            </div>
            <figcaption>Figure 15: Input Images</figcaption>
          </figure>
          <figure id="mel_inputs">
            <div className="grid3">
              <img src={mel_source} alt="Aligned Image of Meloetta in the Park"/>
              <img src={park} alt="Image of a Park"/>
              <img src={park_mask} alt="Meloetta in the Park Mask"/>
            </div>
            <figcaption>Figure 16: Foreground Image, Background Image, and Mask (from Left to Right)</figcaption>
          </figure>
          <figure id="mel_blends">
            <div className="grid2">
              <img src={mel_direct_blend} alt="Imperfectly Blended Image"/>
              <img src={mel_poisson_blend} alt="Poisson Blended Image"/>
            </div>
            <figcaption>Figure 17: Direct Blend (Left) vs Poission Blend (Right)</figcaption>
          </figure>
        </section>
        <section className="project-article">
          <h2>Pokemon Battle on the Beach</h2>
          <figure id="pkmn_input">
            <div className="grid3">
              <img src={lycanroc} alt="Image of Lycanroc"/>
              <img src={palossand} alt="Image of Palossand"/>
              <img src={beach} alt="Image of a Beach"/>
            </div>
            <figcaption>Figure 18: Input Images</figcaption>
          </figure>
          <figure id="pkmn_inputs">
            <div className="grid2">
              <img id="lyc" src={lycanroc_source} alt="Aligned Image of Lycanroc on the Beach"/>
              <img src={beach_mask_lyc} alt="Mask for Lycanroc"/>
            </div>
            <div className="grid2 gg1">
              <img id="pal" src={palossand_source} alt="Aligned Image of Palossand on the Beach"/>
              <img src={beach_mask_pal} alt="Mask for Palossand"/>
            </div>
            <img id="beach" src={beach} alt="Image of a Beach"/>
            <figcaption>Figure 19: Lycanroc Foreground Image &amp; Mask (First Row), <i class="black">Palossand Foreground Image &amp; Mask (Second Row),</i><i class="black">Background Image (Last Row)</i></figcaption>
          </figure>
          <figure id="pkmn_blends">
            <div className="grid2">      
              <img src={pkmn_direct_blend} alt="Imperfectly Blended Image"/>
              <img src={pkmn_poisson_blend} alt="Poisson Blended Image"/>
            </div>
            <figcaption>Figure 20: Direct Blend (Left) vs Poission Blend (Right)</figcaption>
          </figure>
        </section>
      </article>
      <article className="project-article">
        <h1>Problems Encountered</h1>
        <p>One of the main issues with our least squares approach is that the solution obtained using SciPy's lsqr function does not restrict values to a fixed range. In our implementation, we used float pixel values ranging from 0.0 to 1.0, however, some of the values in the solution image "v" were less than 0.0 or greater than 1.0. Without clipping the values of "v" (setting anything less than 0.0 to 0.0 and anything greater than 1.0 to 1.0), the exported image file looked distorted (only in the masked image).</p> 
        <p>Another problem with Poisson Blending is that it does not work well when the foreground object and the background image have very different color palettes. This was not an issue for the "jet flying over the snowy mountain" example in the "Poisson Blending" section, however, the "bear in the pool" case didn't turn out so great&mdash;since the brown bear is being blended into blue waters, the bear in the poisson-blended output looks darker and bluish. The best way to fix this (if we want to use the same Poisson Blending function) is to select inputs that have similar color palettes. Alternatively, we can manually modify the colors in our input images to make the Poisson Blending result look better&mdash;the background color for the Pokemon images were manually added by selecting a color similar to the target image (though this strategy isn't always an option)</p>
      </article>
      <article className="project-article" id="bells">
        <h1>Mixed Gradients (Bells &amp; Whistles)</h1>
        <p>Another approach to blending images is to use the gradient in the source or target image that is larger (instead of simply using the gradient in the source image as we did in regular Poisson Blending). This is helpful when we want to retain some of the gradient of the target image&mdash;like if we want to blend something with a uniform/transparent background into another image. For example, if we want to take text written on a plain background and imprint it onto a wall image, a regular Poisson Blend operation would produce the following result:</p>
        <figure id="pb_poisson_blend">
          <img src={mx_poisson_blend} alt="Regular Poisson Blended Image"/>
          <figcaption>Figure 21: Output of Regular Poisson Blend</figcaption>
        </figure>
        <p>The result using mixed gradients is shown below (the implementation simply modifies the Poisson Blending function to add a "max()" operation for selecting the larger gradient).</p>
        <figure id="pb_poisson_blend">
          <img src={mx_mixed_blend} alt="Mixed Gradients Image"/>
          <figcaption>Figure 22: Output of Poisson Blend w/ Mixed Gradients</figcaption>
        </figure>
        <p>Clearly, this is much better than the result of the regular Poisson Blending operation. This justifies the need to use mixed gradients for cases like the one discussed.</p>
      </article>
    </ProjectPage>
  )
}

export default GDFPage

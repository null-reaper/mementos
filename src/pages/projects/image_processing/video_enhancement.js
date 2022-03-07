import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'

import '../../../styles/app.css'

// Images

import approach from '../../../images/image_processing/video_enhancement/approach.png';
import bb from '../../../images/image_processing/video_enhancement/bb.png';
import blurred from '../../../images/image_processing/video_enhancement/blurred.png';
import contrast from '../../../images/image_processing/video_enhancement/contrast.png';
import dims from '../../../images/image_processing/video_enhancement/dims.png';
import disp from '../../../images/image_processing/video_enhancement/disp.png';
import edges from '../../../images/image_processing/video_enhancement/edges.png';
import example from '../../../images/image_processing/video_enhancement/example.png';
import gauss from '../../../images/image_processing/video_enhancement/gauss.png';
import med_filter from '../../../images/image_processing/video_enhancement/med_filter.png';
import no_bb from '../../../images/image_processing/video_enhancement/no_bb.png';
import no_scratch from '../../../images/image_processing/video_enhancement/no_scratch.png';
import orig_movie from '../../../images/image_processing/video_enhancement/orig_movie.png';
import reference_movie from '../../../images/image_processing/video_enhancement/reference_movie.png';
import scratch_plot from '../../../images/image_processing/video_enhancement/scratch_plot.png';
import sharpened from '../../../images/image_processing/video_enhancement/sharpened.png';

const VideoEnhancementPage = () => {
  return (
    <ProjectPage image={ example } title="Improving Quality of Old Movie Footage" >    
      <article className="project-article">
        <h1>Task</h1>
        <p>Image Enhancement is a family of techniques or methods that works to improve upon images. This could mean anything from improving contrast to reducing noise. Any or all methods used to improve images will fall under this branch. The goal of image enhancement, especially in this case, it is to improve the image to provide a more subjectively pleasing experience for human viewing. The goal of this project was to take a clip from an old movie and to make repairs and enhancements, thereby making it look as good as possible.</p>
        <p>The project was done in various steps in order to achieve these goals. The first task was to identify what was wrong with the movie, and what would need great improvement. The chosen methods to fix the old movie were decided based on what methods were taught in class. After the creation of the different filters and their application in a designated order, the movie was able to be seen with great improvements.</p>
      </article>
      <article className="project-article">
        <h1>A First Look at the Movie</h1>
        <p>After a first glance at the movie, several observations were made. The movie has several problems associated with it. Some of these are listed below:</p>
        <ol>
          <li>The movie is very blurry</li>
          <li>Several random white lines pop up in different places</li>
          <li>The movie shakes a lot (especially in the up and down motion)</li>
          <li>The image frames are just not clear</li>
        </ol>
        <p>At first glance, it was much more difficult to tell what the exact problems were. It took a few times of replaying the movie to understand how to break down the problems associated with it. For example, the blurriness of the movie could be reduced by improving the sharpness of the movie. In the image below, it can be seen how the movie has random white lines and dots appearing all over. The movie is also very shaky as the image keeps moving up and down.</p>
        <iframe id="orig_movie" src="https://www.youtube.com/embed/EeOPkGiuOFA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </article>
      <article className="project-article">
        <h1>Approach</h1>
        <p>As discussed previously, there were several issues with the provided video, many of which could be tackled using techniques in image enhancement. Among the many issues, our team tackled issues with stabilization, edge enhancement, impulse noise reduction, contrast improvement and scratch removal.</p>
        <p>The most observable issue was the shaking of the video and, hence, image stabilization was the most crucial. To do this, the motion had to be analyzed to recognize the displacement in each dimension. Upon doing so, each frame had to be shifted to counteract the appropriate displacement in the dimensions. Furthermore, the frame shifting results in an overlap of pixels and hence, appropriate cropping was necessary to have the output include only the valid pixels in all frames.</p>
        <p>	To tackle the issues of blurriness, the image required sharpening. The edge enhancement was successfully done through using the unmasking method described in detail in the “Edge Enhancement” section. Furthermore, histogram equalization was applied to improve contrast while the median filter was used to reduce impulse noise.	The final issue tackled in the project was the scratch removal. In the provided image, there is a clear disruption in the image as a line passes through the image vertically. Through selecting the appropriate regions, the noise in the column is removed and interpolation of the accurate data is used to replace the corrupted section of data.</p>
        <figure id="ip_approach">
          <img src={ approach } alt="Approach Illustration" />
          <figcaption>Figure 1: Illustration of Enhancements Performed</figcaption>
        </figure>
      </article>
      <article className="project-article">
        <h1>Image Stabilization</h1>
        <section className="project-article">
          <h2>Step #1: Creating a Reference Movie</h2>
          <p>To compute the y &amp; x displacements of each movie frame, the first frame of the movie was used as the "reference" image. Accordingly, in order to speed up the computation, a reference "movie" (3D matrix) was created by taking the first frame of the movie and duplicating it as many times as there are frames in the original movie.</p>
          <figure id="ref_movie">
            <img src={ reference_movie } alt="Reference Movie Screenshot" />
            <figcaption>Figure 2: Reference Movie (Formed by Duplicating Frame #1 N Times)</figcaption>
          </figure>
        </section>
        <section className="project-article">
          <h2>Step #2: Getting the Relevant Sub-Region for all Movie Frames</h2>
          <p>To perform the Image Stabilization process, a region smaller than the actual size of the image frames in the movie must be selected. Accordingly, the entire movie was cropped to the following region: ymin = 35, ymax = 940, xmin = 35, xmax = 1465. To perform this computation faster, a 3D crop function "crop3d()" was created that crops the entire movie (3D matrix) in one go.</p>
          <figure id="movie_dims">
            <img src={ dims } alt="Movie Dimensions" />
            <figcaption>Figure 3: Original Movie Frame &amp; Relevant Sub-Region Dimensions</figcaption>
          </figure>
        </section>
        <section className="project-article">
          <h2>Step #3: Computing the Displacement Vector</h2>
          <p>In a loop, a certain region of the reference movie (of the same size as that of the region) was cropped and then subtracted from the cropped original movie to compute the error. The y &amp; x displacements having the minimum error for each movie frame were stored in a displacement vector. The range of displacements taken under consideration were y = -27:6 and x = -15:1. These values were selected as the maximum and minimum y &amp; x displacements obtained by running the stabilization function for all possible values were y = -26 &amp; 5 and x = -14 &amp; 0.</p>
          <figure id="movie_disp">
            <img src={ disp } alt="Movie Displacement Vector" />
            <figcaption>Figure 4: Computing the Displacement Vector</figcaption>
          </figure>
        </section>
        <section className="project-article">
          <h2>Step #4: Shifting the Movie Frames</h2>
          <p>Having obtained the displacement vector, each of the image frames of the original movie were shifted by the appropriate amount as given in the displacement vector. To do this, a separate function shiftVideo() was implemented. This function takes in the original movie and the displacement vector and shifts each frame using the shiftImg() function created. This function zero pads the portion of the frame outside the original image, leaving a black border in some places (see the bottom edge of the screenshot below).</p>
          <figure id="movie_bb">
            <img src={ bb } alt="Displaced Movie" />
            <figcaption>Figure 5: Image Frame with Black Border</figcaption>
          </figure>
        </section>
        <section className="project-article">
          <h2>Step #5: Cropping the Final Movie</h2>
          <p>The final movie was cropped using ymin = 35, ymax = 940, xmin = 35, xmax = 1465. This effectively removed the black borders formed in the previous step. Compare the following screenshot with the previous one.</p>
          <figure id="movie_crop">
            <img src={ no_bb } alt="Cropped Movie" />
            <figcaption>Figure 6: Image Frame with Black Border Removed</figcaption>
          </figure>
          <p>On running the stabilization operation on the entire movie, the average execution time achieved was approximately 35 minutes.</p>
        </section>
      </article>
      <article className="project-article">
        <h1>Edge Enhancement (Sharpening)</h1>
        <section className="project-article">
          <h2>Step #1: Defining the Gaussian Point Spread Function</h2>
          <p>To create a gaussian psf, the "fspecial('gaussian',hsize,sigma)" MATLAB function was used. The radius parameter 'R' inputted to the sharpening function was used to define the gaussian psf. Additionally, the gaussian matrix was zero padded to be the same size as the image frames in the video.</p>
          <figure id="ee_1">
            <img src={ gauss } alt="Gaussian Function" />
            <figcaption>Figure 7: Gaussian Function</figcaption>
          </figure>
        </section>
        <section className="project-article">
          <h2>Step #2: Obtaining a Low-Pass (Blurred) Image</h2>
          <p>Having the gaussian psf ready, it is now convolved with the original image to obtain the blurred version of the image. This was done by first computing the fourier transform of the gaussian psf &amp; the original image using the "fft2()" MATLAB function, multiplying all elements in the two matrices, and then taking the inverse fourier transform of it (using the "ifft2()" MATLAB function). A screenshot of the blurred version of an image frame from the video (using R = 5) is given below:</p>
          <figure id="ee_2">
            <img src={ blurred } alt="Blurred" />
            <figcaption>Figure 8: Original Image (Left), Low-Pass (Blurred) Version of the Image (Right)</figcaption>
          </figure>
        </section>
        <section className="project-article">
          <h2>Step #3: Obtaining the High-Pass Version of the Image</h2>
          <p>Next, the high-pass version of the image is obtained by subtracting the low-pass image from the original image. A screenshot of the high-pass version of the image frame used in the previous example is given below:</p>
          <figure id="ee_3">
            <img src={ edges } alt="" />
            <figcaption>Figure 9: Original Image (Left), High-Pass Version of the Image (Right)</figcaption>
          </figure>
        </section>
        <section className="project-article">
          <h2>Step #4: Sharpening the Image</h2>
          <p>Finally, the high-pass version of the image is multiplied by the parameter λ (using λ = 1) and then added to the original image. A screenshot of the final, sharpened image is given below:</p>
          <figure id="ee_4">
            <img src={ sharpened } alt="" />
            <figcaption>Figure 10: Original Image (Left), Sharpened Image (Right)</figcaption>
          </figure>
          <p>On running the sharpening operation on the entire movie, the average execution time achieved was approximately 75 seconds.</p>
        </section>
      </article>
      <article className="project-article">
        <h1>Impulse Noise Reduction</h1>
        <p>For the removal of the impulse noise, a median filter was implemented. Due to the 3D aspect of the filter, three for loops were required. As seen in the code attached, the three for loops allow for the sorting of values in each dimension pixel by pixel. The median is then calculated using MATLAB's in-built median function. Through replacing values by the median of its neighboring values in each dimension, the impulse noises are removed. Figure (18) demonstrates the sample result.</p>
        <p>While the median filter does not remove large patches of noise, it successfully removes the small patches. This is because the median filter's process accounts for the preservation of edges and corners and large patches of noise are recognized as such because of the significant changes in value.</p>
        <figure id="med_fil">
          <img src={ med_filter } alt="Noise-Reduced" />
          <figcaption>Figure 11: After Median Filter Application</figcaption>
        </figure>
      </article>
      <article className="project-article">
        <h1>Scratch Removal</h1>
        <section className="project-article">
          <h2>Step #1: Identifying Region of Scratch</h2>
          <p>	To identify the region that we were interested in, we analyzed the average of the column values to observe the exaggerated peak caused by the noise and identified the values of interest. Through analyzing the output and observing the peak's changes through different time frames, we selected the frame of the video that had the maximum peak (n= frame= 20, selected). Similarly, analyzing Figure (20. a) through MATLAB's cursor tool allowed us to narrow the affected columns and hence, allowed us to select the regions for removal and replacement.</p>
          <figure id="sr_1">
            <img src={ scratch_plot } alt="Scratch Plots" />
            <figcaption>Figure 12: Plot w/ Scratch (Left) vs Plot w/o Scratch (Right)</figcaption>
          </figure>
        </section>
        <section className="project-article">
          <h2>Step #2: Remove &amp; Replace w/ Patch</h2>
          <p>	Upon recognizing the set of corrupted values, the values in these regions are removed. Through interpolating the data before and after the removed section, the output includes an estimated set of accurate data to replace the scratch.</p>
          <p>	The peak was analyzed for over multiple time frames and the frame with the maximum observable peak was selected for scratch removal. However, since different time frames of the video have varying levels of noise, the scratch still appears in some frames of the movie.</p>
          <figure id="sr_2">
            <img src={ no_scratch } alt="No Scratch" />
            <figcaption>Figure 13: Scratch Removed</figcaption>
          </figure>
        </section>
      </article>
      <article className="project-article">
        <h1>Contrast Improvement</h1>
        <p>For this part of the code, in order to improve or manipulate the contrast of the image, histogram equalization was used. Rather than using the function that is already in Matlab, a version of it was created by writing out the function. This was done by first loading the data into the new function created called histogrameq. The loaded data is in the form of a x b x c and the data needs to be in an a x b format (2D image format). This was done by using the squeeze function. From here, the rows and columns were established as well as creating arrays for the frequency, pdf, cdf, cumulative, and outpic. Then, a for loop was created with increasing the frequency and the pixels. This loop was tracing the rows and columns of the image. The intensity level wanted is 256-1 so that's why the intensity level is initialized to 255. A second for loop was created for the cumulative function as well as a third for loop for the final result. The second loop is for the pdf and cdf of this histogram, while the third loop traces the final rows and columns of the image after the pdf and cdf is used. The final part of the code was moving the a x b format back into the a x b x c format so that it could be displayed as a movie rather than a single image. The code was tested using a single image (the first image) to see how the result looks. In reality, the squeeze function would be for the whole f.mat file and the concat at the end would uncompress all the images back into the full movie. The code takes approximately a minute to run.</p>
        <figure id="contrast">
          <img src={ contrast } alt="Image w/ Contrast Increased" />
          <figcaption>Figure 14: Increased Contrast w/ Histogram Normalization</figcaption>
        </figure>
      </article>
      <article className="project-article">
        <h1>The Final Movie</h1>
        <p>	After all the code has been created, the final movie can be seen with great improvements. The final movie overall is much more pleasing to the human eye. It no longer has problems of blurriness, random white lines/dots popping up, and the shakiness of the movie moving up and down has been fixed. The improvements can be seen in the image below.</p>
        <iframe id="finalMovie" src="https://www.youtube.com/embed/C9d4NN67VmQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </article>

    </ProjectPage>
  )
}

export default VideoEnhancementPage

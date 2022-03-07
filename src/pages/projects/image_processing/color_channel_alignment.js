import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'

import '../../../styles/app.css'

// Images

import a01100_01122a_aligned from '../../../images/image_processing/color_channel_alignment/01100-01122a_aligned.png';
import a01300_01363a_aligned from '../../../images/image_processing/color_channel_alignment/01300-01363a_aligned.png';
import a01800_01806a_aligned from '../../../images/image_processing/color_channel_alignment/01800-01806a_aligned.png';
import a01800_01864a_aligned from '../../../images/image_processing/color_channel_alignment/01800-01864a_aligned.png';
import cathedral_aligned from '../../../images/image_processing/color_channel_alignment/cathedral_aligned.png';
import cathedral_r from '../../../images/image_processing/color_channel_alignment/cathedral_r.png';
import cathedral_rb from '../../../images/image_processing/color_channel_alignment/cathedral_rb.png';
import emir_aligned from '../../../images/image_processing/color_channel_alignment/emir_aligned.png';
import emir_b from '../../../images/image_processing/color_channel_alignment/emir_b.png';
import emir_bad_align from '../../../images/image_processing/color_channel_alignment/emir_bad_align.png';
import emir_be from '../../../images/image_processing/color_channel_alignment/emir_be.png';
import emir_bg from '../../../images/image_processing/color_channel_alignment/emir_bg.png';
import emir_g from '../../../images/image_processing/color_channel_alignment/emir_g.png';
import emir_ge from '../../../images/image_processing/color_channel_alignment/emir_ge.png';
import emir_gg from '../../../images/image_processing/color_channel_alignment/emir_gg.png';
import emir_r from '../../../images/image_processing/color_channel_alignment/emir_r.png';
import emir_r1x from '../../../images/image_processing/color_channel_alignment/emir_r1x.png';
import emir_r2x from '../../../images/image_processing/color_channel_alignment/emir_r2x.png';
import emir_r4x from '../../../images/image_processing/color_channel_alignment/emir_r4x.png';
import emir_r8x from '../../../images/image_processing/color_channel_alignment/emir_r8x.png';
import emir_r16x from '../../../images/image_processing/color_channel_alignment/emir_r16x.png';
import emir_re from '../../../images/image_processing/color_channel_alignment/emir_re.png';
import emir_rg from '../../../images/image_processing/color_channel_alignment/emir_rg.png';
import emir from '../../../images/image_processing/color_channel_alignment/emir.jpg';
import example from '../../../images/image_processing/color_channel_alignment/example.png';
import gaussian from '../../../images/image_processing/color_channel_alignment/gaussian.png';
import harvesters_aligned from '../../../images/image_processing/color_channel_alignment/harvesters_aligned.png';
import icon_aligned from '../../../images/image_processing/color_channel_alignment/icon_aligned.png';
import lady_aligned_better from '../../../images/image_processing/color_channel_alignment/lady_aligned_better.png';
import lady_aligned from '../../../images/image_processing/color_channel_alignment/lady_aligned.png';
import lady_be from '../../../images/image_processing/color_channel_alignment/lady_be.png';
import lady_ge from '../../../images/image_processing/color_channel_alignment/lady_ge.png';
import lady_re from '../../../images/image_processing/color_channel_alignment/lady_re.png';
import self_portrait_aligned_best from '../../../images/image_processing/color_channel_alignment/self_portrait_aligned_best.png';
import self_portrait_aligned_better from '../../../images/image_processing/color_channel_alignment/self_portrait_aligned_better.png';
import self_portrait_aligned from '../../../images/image_processing/color_channel_alignment/self_portrait_aligned.png';
import sobel_x from '../../../images/image_processing/color_channel_alignment/sobel_x.png';
import sobel_y from '../../../images/image_processing/color_channel_alignment/sobel_y.png';
import three_generations_aligned from '../../../images/image_processing/color_channel_alignment/three_generations_aligned.png';
import train_aligned from '../../../images/image_processing/color_channel_alignment/train_aligned.png';
import turkmen_aligned from '../../../images/image_processing/color_channel_alignment/turkmen_aligned.png';
import village_aligned from '../../../images/image_processing/color_channel_alignment/village_aligned.png';

const CCAlignmentPage = () => {
  return (
    <ProjectPage image={ example } title="Colorizing the Prokudin-Gorskii Photo Collection" >    
      <article className="project-article">
          <h1>Task</h1>
          <p> For this project, we are given 3 color channel images and the objective is to place them on top of each other, and align them so that they form a single RGB color image. The original assignment can be found <a href="https://learning-image-synthesis.github.io/assignments/hw1">here</a>.</p>
      </article>
      <article className="project-article">
        <h1>Preliminary Discussion</h1>
        <p>For the purpose of this project report, we shall focus on the 'emir.tif' image which is shown below. As can be seen, the image comprises of three separate color channels (red, green and blue from bottom to top).</p>
        <figure id="emir">
          <img src={ emir } alt="Emir Glass Plate" />
          <figcaption>Figure 1: Emir Original Glass Plate Image</figcaption>
        </figure>

        <p>Before we get to the main portion of this project, we first split the 3 color channel images into separate pytorch tensors. This was done by dividing the image into 3 equal parts vertically. The result is the 3 images shown below.</p>
        <figure>
          <div className="grid3">
            <img src={ emir_r } alt="Emir Red Channel" />
            <img src={ emir_g } alt="Emir Green Channel" />
            <img src={ emir_b } alt="Emir Blue Channel" />
          </div>
          <figcaption>Figure 2: Emir Image 3 Channels (red, green and blue from left to right)</figcaption>
        </figure>
      </article>
      <article className="project-article">
        <h1>Differing Brightness Issue</h1>
        <p>One thing that may be apparent at this point is that the 3 color channel images do not have the same level of brightness. This is clear from Figure 2 where clothing in the red channel image looks dark whereas the clothing in the blu color channel image looks light. Accordingly, if we simply try to align the color channels as is (using a metric like the "Sum of Squared Differences, i.e. SSD, distance"), we would not expect to get the best alignment. In fact, Figure 3 below shows the result of such an operation. Clearly, we need to use a smarter feature than simply using pixel values.</p>
        <figure id="emir_bad_align">
          <img src={ emir_bad_align } alt="Emir Misaligned" />
          <figcaption>Figure 3: Aligned Emir Channels using SSD on Raw Pixel Values</figcaption>
        </figure>
      </article>
      <article className="project-article">
        <h1>Edge Detection</h1>
        <p>To resolve the differing brightness issue, we shall first perform edge detection on the 3 color channels and then align these edges instead of the pixel values in the original images. We will start by applying a Gaussian blur on the 3 channel images. This was done to reduce the number of edges in the image, thus making it easier to highlight the more relevant edges (this idea was taken from <a href="https://web.stanford.edu/class/cs315b/assignment1.html">here</a>). The 3x3 Gaussian filter shown below (Figure 4) was convolved with the 3 channel images to obtain the blurred versions of these images.</p>
        <figure id="gaussian">
          <img src={ gaussian } alt="Gaussian Kernel" />
          <figcaption>Figure 4: 3x3 Gaussian Kernel</figcaption>
        </figure>
        <p>A set of custom convolution functions were implemented to perform this operation. In these functions, the 3 color channel images were first stacked together and then vectorized to have the windows overlapping with the kernel in separate columns. This 3D tensor was then multiplied with the Gaussian kernel and the columns were summed up to get the values for the convolved image. Finally, the 3 color channels were separated and devectorized into 2D images. (Note: This method was used because the initial implementation of the convolution function using "for" loops was too slow.) The result of the blurring operation is shown below (Figure 5).</p>
        <figure>
          <div className="grid3">
            <img src={ emir_rg } alt="Emir Red Channel Blurred" />
            <img src={ emir_gg } alt="Emir Green Channel Blurred" />
            <img src={ emir_bg } alt="Emir Blue Channel Blurred" />
          </div>
          <figcaption>Figure 5: Emir Image 3 Channels w/ Gaussian Blur (red, green and blue from left to right)</figcaption>
        </figure>
        <p>The effect of the blurring may not be clear in the Emir images since the image resolution is over 3000 pixels while the kernel is only 3 pixels wide. The image below (Figure 6) shows a more noticeable effect of this blurring option.</p>
        <figure>
          <div className="grid2">
            <img src={ cathedral_r } alt="Cathedral Red Channel Original" />
            <img src={ cathedral_rb } alt="Cathedral Red Channel Blurred" />
          </div>
          <figcaption>Figure 6: Cathedral Red Channel Original Image (left) vs Blurred Image (right)</figcaption>
        </figure>
        <p>Now, we get to the edge detection task. We use the following 3x3 Sobel filters (Figure 7) for this (one for detecting horizontal edges and the other for verticle edges).</p>
        <figure id="sobel">
          <div className="grid2">
            <img src={ sobel_x } alt="Sobel Horizontal Edge Detection Filter" />
            <img src={ sobel_y } alt="Sobel Verticle Edge Detection Filter" />
          </div>
          <figcaption>Figure 7: Sobel Edge Detection Filters &mdash; Horizontal (left) and Verticle (right)</figcaption>
        </figure>
        <p>We use the same convolution functions mentioned in the Gaussian blurring section, however, here we perform 2 convolutions (in the horizontal and verticle directions) and then take the RMS value for each pixel in the convolved images. The resulting edge-detected images for the 3 color channels are shown below (Figure 8).</p>
        <figure>
          <div className="grid3">
            <img src={ emir_re } alt="Emir Red Channel Edges" />
            <img src={ emir_ge } alt="Emir Green Channel Edges" />
            <img src={ emir_be } alt="Emir Blue Channel Edges" />
          </div>
          <figcaption>Figure 8: Emir Image 3 Channels w/ Edge Detection (red, green and blue from left to right)</figcaption>
        </figure>
      </article>
      <article className="project-article">
        <h1>Alignment</h1>
        <p>Finally, we can now align the edges in the 3 color channel images; here, we will align the red and green channel images to the blue channel image (using SSD). We could do an exhaustive search within a fixed window (for e.g. -15 to +15), but this would be an extremely slow operation, especially if the window is too large (as we will will see later, the best y-alignment for the red channel of the Emir image is around 107&mdash;this would require a very large window to search exhaustively). Accordingly, a pyramid search was performed to speed up the process. Here, we first scale the original channel images by a factor of 2, 4, 8 and so on (Figure 9), and start by aligning at the smallest resolution.</p>
        <figure>
          <div className="grid5">
            <img src={ emir_r1x } alt="Emir 1x Resolution" />
            <img src={emir_r2x } alt="Emir 2x Resolution" />
            <img src={ emir_r4x } alt="Emir 4x Resolution" />
            <img src={ emir_r8x } alt="Emir 8x Resolution" />
            <img src={ emir_r16x } alt="Emir 16x Resolution" />
          </div>
          <figcaption>Figure 9: Emir Edge Detected Red Channel at Different Resolutions (from left to right 1x, 2x, 4x, 8x and 16x)</figcaption>
        </figure>
        <p>Once we are back up to the original resolution, we add up the smaller alignments (by multiplying them with the appropriate factor of 2) to obtain the best alignment for each of the 3 color channel images. With these, we shift the original red and green color channel images (not the edge detected ones) by the obtained displacements. The final result for the Emir image is given in Figure 10.</p>
        <figure>
          <img src={ emir_aligned } alt="Emir Aligned" />
          <figcaption>Figure 10: Aligned Emir Channels using Pyramid Search w/ SSD on Edge Detected Images 
            <i>&mdash; Green Channel Displacement &#8594; X = 23, Y = 49 &mdash;</i><b>&mdash; Red Channel Displacement &#8594; X = 40, Y = 107 &mdash;</b></figcaption>
        </figure>
      </article>
      <article className="project-article grid2">
        <h1 className="full-row">Results for All Images within Project</h1>
        <figure>
          <img src={ cathedral_aligned } alt="cathedral.jpg aligned" />
          <figcaption><u>cathedral.jpg</u>
            <i>&mdash; Green Channel Displacement &#8594; X = -1, Y = 6 &mdash;</i><b>&mdash; Red Channel Displacement &#8594; X = -1, Y = 13 &mdash;</b>
          </figcaption>
        </figure>
        <figure>
          <img src={ emir_aligned } alt="emir.tif aligned" />
          <figcaption><u>emir.tif</u>
            <i>&mdash; Green Channel Displacement &#8594; X = 23, Y = 49 &mdash;</i><b>&mdash; Red Channel Displacement &#8594; X = 40, Y = 107 &mdash;</b>
          </figcaption>
        </figure>
        <figure>
          <img src={ harvesters_aligned } alt="harvesters.tif aligned" />
          <figcaption><u>harvesters.tif</u>
            <i>&mdash; Green Channel Displacement &#8594; X = -6, Y = 70 &mdash;</i><b>&mdash; Red Channel Displacement &#8594; X = 4, Y = 123 &mdash;</b>
          </figcaption>
        </figure>
        <figure>
          <img src={ icon_aligned } alt="icon.tif aligned" />
          <figcaption><u>icon.tif</u>
            <i>&mdash; Green Channel Displacement &#8594; X = 17, Y = 42 &mdash;</i><b>&mdash; Red Channel Displacement &#8594; X = 23, Y = 90 &mdash;</b>
          </figcaption>
        </figure>
        <figure>
          <img src={ lady_aligned } alt="lady.tif aligned" />
          <figcaption><u>lady.tif</u>
            <i>&mdash; Green Channel Displacement &#8594; X = -10, Y = -22 &mdash;</i><b>&mdash; Red Channel Displacement &#8594; X = -21, Y = -10 &mdash;</b>
          </figcaption>
        </figure>
        <figure>
          <img src={ self_portrait_aligned } alt="self_portrait.tif aligned" />
          <figcaption><u>self_portrait.tif</u>
            <i>&mdash; Green Channel Displacement &#8594; X = -3, Y = 79 &mdash;</i><b>&mdash; Red Channel Displacement &#8594; X = -2, Y = 117 &mdash;</b>
          </figcaption>
        </figure>
        <figure>
          <img src={ three_generations_aligned } alt="three_generations.tif aligned" />
          <figcaption><u>three_generations.tif</u>
            <i>&mdash; Green Channel Displacement &#8594; X = 0, Y = 54 &mdash;</i><b>&mdash; Red Channel Displacement &#8594; X = 7, Y = 107 &mdash;</b>
          </figcaption>
        </figure>
        <figure>
          <img src={ train_aligned } alt="train.tif aligned" />
          <figcaption><u>train.tif</u>
            <i>&mdash; Green Channel Displacement &#8594; X = 1, Y = 41 &mdash;</i><b>&mdash; Red Channel Displacement &#8594; X = 29, Y = 85 &mdash;</b>
          </figcaption>
        </figure>
        <figure>
          <img src={ turkmen_aligned } alt="turkmen.tif aligned" />
          <figcaption><u>turkmen.tif</u>
            <i>&mdash; Green Channel Displacement &#8594; X = 21, Y = 56 &mdash;</i><b>&mdash; Red Channel Displacement &#8594; X = 27, Y = 117 &mdash;</b>
          </figcaption>
        </figure>
        <figure>
          <img src={ village_aligned } alt="village.tif aligned" />
          <figcaption><u>village.tif</u>
            <i>&mdash; Green Channel Displacement &#8594; X = -9, Y = 63 &mdash;</i><b>&mdash; Red Channel Displacement &#8594; X = -15, Y = 115 &mdash;</b>
          </figcaption>
        </figure>
      </article>
      <article className="project-article">
        <h1>Discussion on Results</h1>
        <p>As can be seen in the previous section, most of the output images look pretty good; the exceptions are "lady.tif" and "self_portrait.tif." Upon further inspection, it was discovered that the problem lied in the edge detection step. Take a look at the edge-detected color channels for the "lady.tif" image (Figure 11).</p>
        <figure>
          <div className="grid3">
            <img src={ lady_re } alt="Lady Red Channel Edges" />
            <img src={ lady_ge } alt="Lady Green Channel Edges" />
            <img src={ lady_be } alt="Lady Blue Channel Edges" />
          </div>
          <figcaption>Figure 11: Lady Image 3 Channels w/ Edge Detection (red, green and blue from left to right)</figcaption>
        </figure>
        <p>The thing one may notice is that there are hardly any edges in the above images as compared to the ones in the "Edge Detection" section earlier (this may be because the image doesn't have many sharp edges). The same was noted in the edge-detected color channels of 'self_portrait.tif.' To resolve this issue, the gaussian blurring step was skipped (to prevent the code from reducing the number of edges in the image). The results are given below (Figure 12 &amp; 13).</p>
        <figure>
          <div className="grid2">
            <img src={ lady_aligned } alt="Lady Image Original Alignment" />
            <img src={ lady_aligned_better } alt="Lady Image Alignment w/o Gaussian Blurring" />  
          </div>
          <figcaption>Figure 12: Lady Image Original Alignment (left) vs Alignment w/o Gaussian Blurring (right)</figcaption>
        </figure>
        <figure>
          <div className="grid2">
            <img src={ self_portrait_aligned } alt="Self Portrait Image Original Alignment" />
            <img src={ self_portrait_aligned_better } alt="Self Portrait Image Alignment w/o Gaussian Blurring" />
          </div>
          <figcaption>Figure 13: Self Portrait Image Original Alignment (left) vs Alignment w/o Gaussian Blurring (right)</figcaption>
        </figure>
        <p className="mt2">We see that the "lady.tif" image (Figure 12, right image) looks much better than earlier (though not perfect). However, the "self_portrait.tif" image hasn't changed much. Fixing this may require a more sophisticated edge-detection implementation. Instead, we completely bypass the edge-detection step and directly perform pyramid alignment on raw pixel values. The result now is much better than earlier (see Figure 14).</p>
        <figure>
          <img src={ self_portrait_aligned_best } alt="Self Portrait Image Alignment w/ Raw Pixel Values" />
          <figcaption>Figure 14: Self Portrait Image Alignment w/ Raw Pixel Values</figcaption>
        </figure>
      </article>
      <article className="project-article grid2">
        <h1 className="full-row">Results for Example Online Images</h1>
        <figure>
          <img src={ a01100_01122a_aligned } alt="01100-01122a.tif aligned" />
          <figcaption><u>01100-01122a.tif</u>
            <i>&mdash; Green Channel Displacement &#8594; X = 48, Y = 47 &mdash;</i><b>&mdash; Red Channel Displacement &#8594; X = 95, Y = 100 &mdash;</b>
          </figcaption>
        </figure>
        <figure>
          <img src={ a01300_01363a_aligned } alt="01300-01363a.tif aligned" />
          <figcaption><u>01300-01363a.tif</u>
            <i>&mdash; Green Channel Displacement &#8594; X = 54, Y = 33 &mdash;</i><b>&mdash; Red Channel Displacement &#8594; X = 92, Y = 90 &mdash;</b>
          </figcaption>
        </figure>
        <figure>
          <img src={ a01800_01806a_aligned } alt="01800-01806a.tif aligned" />
          <figcaption><u>01800-01806a.tif</u>
            <i>&mdash; Green Channel Displacement &#8594; X = 17, Y = 65 &mdash;</i><b>&mdash; Red Channel Displacement &#8594; X = 38, Y = 135 &mdash;</b>
          </figcaption>
        </figure>
        <figure>
          <img src={ a01800_01864a_aligned } alt="01800-01864a.tif aligned" />
          <figcaption><u>01800-01864a.tif</u>
            <i>&mdash; Green Channel Displacement &#8594; X = 7, Y = 52 &mdash;</i><b>&mdash; Red Channel Displacement &#8594; X = 13, Y = 111 &mdash;</b>
          </figcaption>
        </figure>
      </article>

    </ProjectPage>
  )
}

export default CCAlignmentPage

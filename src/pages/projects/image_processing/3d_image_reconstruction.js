import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'

import '../../../styles/app.css'

// Images

import axial from '../../../images/image_processing/3d_image_reconstruction/axial.png';
import cor from '../../../images/image_processing/3d_image_reconstruction/cor.png';
import example from '../../../images/image_processing/3d_image_reconstruction/example.png';
import head_3d from '../../../images/image_processing/3d_image_reconstruction/head_3d.png';
import orig_to_sino from '../../../images/image_processing/3d_image_reconstruction/orig_to_sino.png';
import rec_plot from '../../../images/image_processing/3d_image_reconstruction/rec_plot.png';
import rec_w from '../../../images/image_processing/3d_image_reconstruction/rec_w.png';
import rec from '../../../images/image_processing/3d_image_reconstruction/rec.png';
import render_400 from '../../../images/image_processing/3d_image_reconstruction/render_400.png';
import render_2000 from '../../../images/image_processing/3d_image_reconstruction/render_2000.png';
import sag_cor from '../../../images/image_processing/3d_image_reconstruction/sag_cor.png';
import sag from '../../../images/image_processing/3d_image_reconstruction/sag.png';

const ImReconPage = () => {
  return (
    <ProjectPage image={ example } title="Generating 3D Views from CT Scans of a Human Head" >    
      <article className="project-article">
        <h1>Task</h1>
        <p>The main objective of this project is to explore image reconstruction and visualization using CT scans of a human head. Overall goals included:</p>
        <ol>
          <li>Writing code to compute projections of sinograms to simulate the workings of a CT scanner</li>
          <li>Writing code to perform image reconstruction by filtered back projection (FBP)</li>
          <li>Exploring the behavior of FBP when noise is present</li>
          <li>Stacking image slices to form a 3D array and reslicing the scan in different directions</li>
          <li>Viewing surface renderings of isosurfaces to see different components of the head</li>
        </ol>
      </article>
      <article className="project-article">
        <h1>Sinogram Projections</h1>
        <p>For this part of the project, 2 MATLAB files were created: (1) the MATLAB script to display the sinogram ('part1.m'); and (2) the  function to compute the projections ('projection.m').</p>
        <p>Through computing the projection to simulate a CT scanner's functionality, the sinogram in Figure (1) was obtained. The sinogram matches expected results since the x-rays are defined to be travelling from the bottom of the image to the top and, hence, parallel-beam.</p>
        <figure id="img_to_sino">
          <img src={ orig_to_sino } alt="Original Image vs Projected Sinogram" />
          <figcaption>Figure 1: Original Image (Top) vs Projected Sinogram (Bottom)</figcaption>
        </figure>
      </article>
      <article className="project-article">
        <h1>Image Reconstruction using Filtered Back Projection</h1>
        <p>To perform image reconstruction, the Matlab function fhat = fbp481(p,w) was written to reconstruct a N×N sinogram by using FBP with smoothing parameter w=0. The Fast Fourier Transform and Inverse Of Fast Fourier Transform functions in MATLAB were used to apply a filter (reconfilter) to each row of the sinogram, thus returning the reconstructed image. As one would expect, the fhat image obtained is identical to the original image used to create the sinogram projections in the previous step.</p>
        <figure id="rec">
          <img src={ rec } alt="Reconstructed" />
          <figcaption>Figure 2: Reconstructed Image</figcaption>
        </figure>
      </article>
      <article className="project-article">
        <h1>Effect of Noise</h1>      
        <p>The goal of this task was to study the effects of noise using the previously implemented function (fhat = fbp481(p,w)) to reconstruct an NxN image from an NxN sinogram by using FBP w/ smoothing parameter w. In this part of the project part3.m was used to find the images and graph.</p>
        <p>Before performing the task, it was expected that higher values of w would result in more accurate reconstructions of the image. If a graph of mse vs. w were to be created, the graph would have an exponential curve.</p>
        <p>To test these predictions, values of w = 10, 50, 100, 150, 200, 250, 300, 400, 600 and 800 were tried. The best value of w was found to be from w=300 to w=800. At this value (as displayed in the figure below), the image looks best and the quality is roughly the same even for higher values of w. Reconstructed images for all the considered values of w can be seen below (in consecutive order).</p>
        <figure id="rec_w">
          <img src={ rec_w } alt="Reconstructed Images at different values of w" />
          <figcaption>Figure 3: Reconstructed Image w/ w = 10, 50, 100, 150, 200, 250, 300, 400, 600 and 800 (from left to right)</figcaption>
        </figure>
        <p>A plot of MSE (Mean Squarred Error) vs. w was also plotted, which can be seen below.</p>
        <figure id="rec_plot">
          <img src={ rec_plot } alt="Plot of MSE vs w" />
          <figcaption>Figure 4: Plot of MSE vs w</figcaption>
        </figure>
        <p>The shape of this curve is exponential, which is in line with the initial prediction. Based on the graph, the optimal value of w is also around 300. This is because, around 300, the plot levels off and stays approximately the same for the rest of the values; so any increase in w does not sufficiently change the output.</p>
      </article>
      <article className="project-article">
        <h1>Stacking Image Slices</h1>
        <p>Now we move on to the CT scans of the human head. The sinogram project function as well as the FBP function created in the previous tasks will be used here. In addition, 3 MATLAB files were created specifically for this task: (1) the MATLAB script to create the 3D head array ('part4.m'); (2) a function to display a specific coronal slice of the head ('coronalSlice.m'); and (3) a function to display a specific sagittal slice of the head ('sagittalSlice.m'). Additionally, the provided function 'sliceviewer.m' was used to view various slices simultaneously.</p>
        <p>After creating the 3D head array by applying the fbp481(f,w) to all sinograms in the given 'head_sino' array (using w = 0), the following 3D plot was obtained using the 'headRender.m' function for a value of 500 &amp;opacity 1:</p>
        <figure id="head_3d">
          <img src={ head_3d } alt="3D Human Head" />
          <figcaption>Figure 5: 3D Plot of a Human Head from CT Scans</figcaption>
        </figure>
        <p>Next, the following sagittal &amp;coronal slices were obtained using slice # 300 for each of the two sections:</p>
        <figure id="sag_cor">
          <img src={ sag_cor } alt="Sagittal and Coronal Slices" />
          <figcaption>Figure 6: Sagittal Slice #300 (top) &amp;Coronal Slice #300 (bottom) of the Head</figcaption>
        </figure>
        <p>Finally, the 'sliceviewer.m' function was used to view a range of 'axial,' 'sagittal,' and 'coronal' slices of the 3D head:</p>
        <figure id="axial">
          <img src={ axial } alt="Axial Slices" />
          <figcaption>Figure 7: Multiple Axial Slices of the Head</figcaption>
        </figure>
        <figure id="sag">
          <img src={ sag } alt="Sagittal Slices" />
          <figcaption>Figure 8: Multiple Sagittal Slices of the Head</figcaption>
        </figure>
        <figure id="cor">
          <img src={ cor } alt="Coronal Slices" />
          <figcaption>Figure 9: Multiple Coronal Slices of the Head</figcaption>
        </figure>
      </article>
      <article className="project-article">
        <h1>Viewing Surface Renderings of Isosurfaces</h1>
        <p>The goal of this part of the project was to see how the 3D volumes that were created can be used to visualize surfaces of the body. The important part was viewing surface renderings of isosurfaces (points of constant value within a volume).</p>
        <p>The output of headRender for value=2000: </p>
        <figure id="rend_2000">
          <img src={ render_2000 } alt="3D Head w/ Surface Rendering" />
          <figcaption>Figure 10: Results using input “headRender(head, 2000, 0.5);”</figcaption>
        </figure>
        <p>The output of headRender for value = 400 oriented so that the ear canal on the inside of the head is visible.  One of the ear canals are circled to show that it was found:</p>
        <figure id="rend_400">
          <img src={ render_400 } alt="3D Head w/ Surface Rendering (Top View)" />
          <figcaption>Figure 11: Results using input “headRender(head, 400, 0.5);” with one of the ear canals circled
          </figcaption>
        </figure>
      </article>

    </ProjectPage>
  )
}

export default ImReconPage

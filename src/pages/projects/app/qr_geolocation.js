import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'

import '../../../styles/app.css'

// Images

import example from '../../../images/app/qr_geolocation/example.png';
import area_map from '../../../images/app/qr_geolocation/area_map.png';
import pocket_shelter from '../../../images/app/qr_geolocation/pocket_shelter.jpg';
import prototype from '../../../images/app/qr_geolocation/prototype.jpg';
import qr from '../../../images/app/qr_geolocation/qr.png';

const QRGeoPage = () => {
  return (
    <ProjectPage image={ example } title="Aiding Offline Navigation to Tsunami Evacuation Sites" >    
      <article className="project-article">
        <h1>Task</h1>
        <p>This project was done as part of a Summer Project Course that took place in Osaka, Japan during the Summer of 2019. The main goal of this course was to research tsunami safety measures in Osaka and to come up with ideas to improve tsunami preparedness and prevention; the ideas were later presented to the Osaka Government. One of the main ideas included wad a QR Geolocation feature that can be included in the form of an anroid app. A discussion on this idea has been provided in this online report. The code for the prototype app can be found <a href="https://github.com/null-reaper/qr-geolocation">here</a>.</p>
      </article>
      <article className="project-article">
        <h1>Overview</h1>
        <p>During or after a major natural disaster, it is typically necessary to move to an appropriate evacuation site. To accomplish this, most people rely on a navigation aid, expecting it to get them there quickly and easily. However, mobile networks are never their best post disaster.</p>
        <p>According to the study done by Yamamura et al., there were many challenges with communication devices after the Great East Japan Earthquake of 2011. From the day of the earthquake to two days after, over 80% of surveyed mobile phone users reported poor levels of satisfaction with their phones, meaning they were having serious problems using their phone. Those with satellite phones were less affected, with only about 50% of them having poor satisfaction in the same time frame. The main reason cited for having poor satisfaction with mobile phones was due to disconnections from the network and poor reception; for satellite phones users referenced the inability to send large amounts of data and the fact that they only allowed for voice communication. The discontinued services peaked two days after the earthquake, thought to be affected by the tsunami. While the possibility of remaining connected during and after a disaster has increased since 2011, with more mobile phones that can connect to the internet, the possibility of relying on offline navigation is still large enough to consider.</p>
      </article>
      <article className="project-article">
        <h1>The PocketShelter App</h1>
        <p>PocketShelter, a navigation service application, enables the user to search addresses on maps and navigate to their destination while offline! The creative interface shows the location of the nearest evacuation sites, earthquake resistant structures, facilities, and more, to inform the user when disaster strikes. It also features early earthquake warnings along with guidelines on how to react.</p>
        <figure id="pocket_shelter">
          <img src={pocket_shelter} alt="PocketShelter App"/>
          <figcaption>Figure 1: Evacuation sites displayed in the PocketShelter App</figcaption>
        </figure>
        <p>Although the app does a pretty good job at providing offline navigation, the major drawback is that it requires the user to pre-download area maps for the regions they wish to navigate offline. The size of these varies from 31 MB for Osaka Prefecture up to about 1 GB for all of Japan. This requirement of storage space could discourage foreign tourists from storing these area maps on their device, or even from downloading the app itself. During a disaster, if there is no internet and if the user has not downloaded an area map beforehand, the app shows a blank screen, which isn't very helpful. To remedy this situation, the following two ideas are proposed.</p>
      </article>
      <article className="project-article">
        <h1>QR Navigation</h1>
        <p>The first suggestion involves the use of QR codes to aid the offline navigation process. The main need for having pre-downloaded area maps arises due to the fact that the app requiressome sort of data to work with. This data includes the physical layout of the areas, buildings, streets, intersections, and so on, which the app then uses to ascertain the best navigation route from the user's current location to a nearby evacuation site. In some cases, however, bare minimum of such information can prove to be sufficiently useful for the user to get to their destination. As such, this minimal information can be embedded in a QR code, which can then be placed at major streets or near train/subway stations such that users can quickly scan them and acquire the navigation route to their destination.</p>
        <figure id="qr">
          <img src={qr} alt="QR Code w/ Nav. Info."/>
          <figcaption>Figure 2: QR code containing latitude/longitude data for a route (Created using www.qr-code-generator.com)</figcaption>
        </figure>
        <p>The simplest way of achieving this is to store the navigation route from the location where the QR code is placed to the nearest evacuation center in the form of a list of latitudes and longitudes. This data can then be used to plot the route against a blank background while also clearly highlighting the source and the destination. The app can then access the user's GPS information to display the user's real-time location with respect to the route. Supplementary features can be added to assist the user, such as a compass, distance to the evacuation center, and possibly step by step directions, which can be computed in the app using the latitude/longitude data.</p>
        <figure id="prototype">
          <img src={prototype} alt="Prototype App"/>
          <figcaption>Figure 3: Offline navigation using latitude/longitude data embedded in QR code (Screenshot of Prototype App)</figcaption>
        </figure>
        <p>The method described above is a very simplistic model of how this idea could be implemented. Apart from route information, additional safety information could be embedded in the QR code. This could include basic instruction on tsunami safety (such as “Find shelter on higher ground&mdash;Look for buildings 4 stories high or taller.”), route-specific information, or even text-based directions to the evacuation site. If space permits, the QR code could hold navigation information for multiple routes, which could benefit the user in the event that one of the routes is blocked by debris after a major earthquake. This could be complemented with the PocketShelter app's “Footprint” feature which helps the user trace back any route they have taken.</p>
      </article>
      <article className="project-article">
        <h1>Alert-based Area Map Download</h1>
        <p>Another approach to deal with the issue of offline navigation without pre-downloaded area maps is to draw on the benefits of the “Emergency Warning” feature of the app. When the device receives an alert regarding an impending natural disaster, the app can trigger the download of an area map for the user's current whereabouts. Note, however, that this area map isn't of the entire city/prefecture, but of the region encompassed within a fixed radius around the user. The app can determine the user's location by accessing the device's GPS information. In the event that the device's GPS service is not enabled, the app can take the user's last known location as reference. Assuming the process described above is completed successfully, this area map can now be used in the app exactly as before, even if cell service is no longer available.</p>
        <figure id="area_map">
          <img src={area_map} alt="Sample Area Map"/>
          <figcaption>Figure 4: Sample area map encompassing a fixed radius around the user's current location (Screenshot from PocketShelter app)</figcaption>
        </figure>
        <p>To add a bit of perspective, consider the area map for Osaka Prefecture, which requires roughly 31 MB of storage space. The approximate area of the entire prefecture is 1,905.14 km 2 (735.58 sq mi). Now, if we were to divide up the prefecture into tiny regions about 1 km 2 in size, the average storage space required for any of these regions would be approximately 20 KB (not accounting for regional differences), which is small enough that it's space requirements can be considered as negligible, and can be downloaded even when the cell service is sparse.</p>
      </article>
      <article className="project-article">
        <h1>Conclusion</h1>
        <p>In case of a natural disaster, internet connection may be slow or disconnected, which makes offline navigation to evacuation sites crucial. While some apps, such as PocketShelter, do offer offline navigation, they require the user to download the map in advance. This project explored two possible solutions to minimize these download requirements. The first involves embedding route information in a QR code which could be placed on signage in high-tourists density areas. The second idea takes advantage of the advance warning system of Japan; as soon as a notice is issued, a small map&mdash;containing the user's local surroundings&mdash;can be automatically downloaded by the app, which can then be used to navigate to the nearest evacuation site. 
        </p>
      </article>
    </ProjectPage>
  )
}

export default QRGeoPage

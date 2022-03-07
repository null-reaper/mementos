import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'
import ReactAudioPlayer from 'react-audio-player';

import '../../../styles/app.css'

// Images

import example from '../../../images/speech/synthesis/example.jpg';

// Audio

import clock_1 from '../../../audio/speech/synthesis/clock_1.wav';
import clock_2 from '../../../audio/speech/synthesis/clock_2.wav';
import clock_3 from '../../../audio/speech/synthesis/clock_3.wav';
import clock_4 from '../../../audio/speech/synthesis/clock_4.wav';
import clock_5 from '../../../audio/speech/synthesis/clock_5.wav';
import cluster_1 from '../../../audio/speech/synthesis/cluster_1.wav';
import cluster_2 from '../../../audio/speech/synthesis/cluster_2.wav';
import cluster_3 from '../../../audio/speech/synthesis/cluster_3.wav';
import cluster_4 from '../../../audio/speech/synthesis/cluster_4.wav';
import cluster_5 from '../../../audio/speech/synthesis/cluster_5.wav';

const SpeechSynthPage = () => {
  return (
    <ProjectPage image={ example } title="Speech Synthesis w/ Festival" >    
      <article className="project-article">
        <h1>Task</h1>
        <p>This project involves building two basic speech synthesizers&mdash;a talking clock and a clustergen (general-purpose) voice&mdash;using the Festival toolkit. In this article, I shall briefly describe what I did and provide 5 examples of errors made by each of the two systems.</p>
      </article>
      <article className="project-article">
        <h1>Approach</h1>
        <p>For both the talking clock and the clustergen voice, steps in the assignment (<a href="http://tts.speech.cs.cmu.edu/courses/11492/homework/tts/tts.html">view documentation here</a>) were followed. I recorded all my voice samples (24 for talking clock and 100 for the clustergen voice) using the Festival command provided. After executing all commands from the write-up correctly, I started up Festival with my voice and tried various inputs. The next two sections describe my observations. More specifically, I have selected examples where the system failed to provide the right synthesis and provided a possible explanation for the errors. (Note: There weren't really any major errors in the ClusterGen voice, besides the fact that the audio sounded muffled.)</p>
        <section className="project-article">
          <h1>Talking Clock</h1>
          <p>In terms of fluency, the talking clock was pretty good. And it sounded exactly like me. However, I did find a few errors, all of which were related to insertion / deletions / substitutions and not because of the quality of the recordings; I believe the reason for all these errors is just the lack of sufficient recordings (since I only have 24 wav files), but it does great given that I could record audio and build the system in under half an hour (see the “clock_*.wav” files).</p>
          <ReactAudioPlayer
            src={ clock_1 }
            controls
          />
          <div className='code_block'>
            <p><b>Command:</b> festival&#62; (saythistime "03:00")</p>
            <p className='mb0'><b>What it said:</b> “The time is now exactly three in the afternoon morning”</p>
          </div>
          <p className='mt2'>Here, it says “afternoon” and “morning” both. I don’t think this is an issue due to the recordings since I never say afternoon and morning in the same sentence. My best guess is that the system wasn’t sure whether I meant 3 am or 3 pm, though I don't know why it only gets it wrong for 03:00 and not for 04:00, 05:00, etc.</p>
          <ReactAudioPlayer
            src={ clock_2 }
            controls
          />
          <div className='code_block'>
            <p><b>Command:</b> festival&#62; (saythistime "14:01")</p>
            <p className='mb0'><b>What it said:</b> The time is now just after two in the m”</p>
          </div>
          <p className='mt2'>It says “in the m” (starts saying morning, but cuts off) instead of “in the afternoon. The same thing happens with 13:01 and 16:01, but not with 15:01 (this it gets right). Maybe the audio for the word “the” it used in this sentence was from a sample that was about morning (which is why it had the “m” sound attached to it and couldn’t easily switch to the “ah” sound in “afternoon”).</p>
          <ReactAudioPlayer
            src={ clock_3 }
            controls
          />
          <div className='code_block'>
            <p><b>Command:</b> festival&#62; (saythistime "19:10")</p>
            <p className='mb0'><b>What it said:</b> The time is now exactly ten past seven in in the evening”</p>
          </div>
          <p className='mt2'>This time, it says the word “in” twice. Other than that, the audio is perfect. This error might be because the system tried to patch together the audio for “seven in” from one audio and “in the evening” from another one.</p>
          <ReactAudioPlayer
            src={ clock_4 }
            controls
          />
          <div className='code_block'>
            <p><b>Command:</b> festival&#62; (saythistime "13:59")</p>
            <p className='mb0'><b>What it said:</b> The time is now exactly two in the m”</p>
          </div>
          <p className='mt2'>Apart from the same mistake as before (the “in the m” part), it also says “exactly two” instead of “almost two”. Though, I’m not sure if this is actually an error or just a system decision. Personally, I would think “almost two” is more appropriate.</p>
          <ReactAudioPlayer
            src={ clock_5 }
            controls
          />
          <div className='code_block'>
            <p><b>Command:</b> festival&#62; (saythistime "19:55")</p>
            <p className='mb0'><b>What it said:</b> "The time is now exactly five to eight in thening"</p>
          </div>
          <p className='mt2'>In this final one, the words “the” and “evening” were blended together, which sounded like “thening”. Just like in the third recording, I believe this error was due to the system incorrectly stitching together words from different audio recordings.</p>
        </section>
        <section className="project-article">
          <h1>ClusterGen Voice</h1>
          <p>In this case, the fluency is terrible (it sounds like a fusion of me and a robot). The sentences sound muffled and weird, but you can somewhat make out that it is saying the correct words (this is expected since I only recorded 100 sentences; of course, it can’t say everything). I randomly picked 5 examples (since pretty much everything the system says has the muffledness issue, but are technically saying the correct thing--couldn’t find any glaring errors). Check the cluster_*.wav files.</p>
          <ReactAudioPlayer className='mt3'
            src={ cluster_1 }
            controls
          />
          <div className='code_block'>
            <p><b>Text:</b> “Will we ever forget it?”</p>
            <p className='mb0'><b>Says:</b> Exactly as above (but muffled)</p>
          </div>
          <ReactAudioPlayer className='mt3'
            src={ cluster_2 }
            controls
          />
          <div className='code_block'>
            <p><b>Text:</b> “This costs $100 dollars”</p>
            <p className='mb0'><b>Says:</b> “This costs one hundred dollars.” (muffled)</p>
          </div>
          <ReactAudioPlayer className='mt3'
            src={ cluster_3 }
            controls
          />
          <div className='code_block'>
            <p><b>Text:</b> “I was born in 1998.”</p>
            <p className='mb0'><b>Says:</b> “I was born in nineteen ninety eight..” (but muffled)</p>
          </div>
          <ReactAudioPlayer className='mt3'
            src={ cluster_4 }
            controls
          />
          <div className='code_block'>
            <p><b>Text:</b> “For my project, I had to project my slides on the screen.”</p>
            <p className='mb0'><b>Says:</b> Exactly as above (but muffled)</p>
          </div>
          <ReactAudioPlayer className='mt3'
            src={ cluster_5 }
            controls
          />
          <div className='code_block'>
            <p><b>Text:</b> “supercalifragilisticexpialidocious”</p>
            <p className='mb0'><b>Says:</b> Almost as above (which I didn’t expect, but again muffled)</p>
          </div>
        </section>
      </article>
    </ProjectPage>
  )
}

export default SpeechSynthPage

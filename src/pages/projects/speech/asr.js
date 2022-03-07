import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'

import '../../../styles/app.css'

// Images

import example from '../../../images/speech/asr/example.png';
import initial from '../../../images/speech/asr/initial.png';
import obs1 from '../../../images/speech/asr/obs1.png';
import obs2 from '../../../images/speech/asr/obs2.png';
import obs3 from '../../../images/speech/asr/obs3.png';

const ASRPage = () => {
  return (
    <ProjectPage image={ example } title="Automatic Speech Recognition w/ Kaldi" >    
      <article className="project-article">
        <h1>Task</h1>
        <p>The goal of this project was to explore the Kaldi toolkit for Automatic Speech Recognition (ASR). Note, however, that the objective was not to get a very low WER, but rather, to get the WER as low as possible by only modifying the Language Model (LM) and the Pronounciation Lexicon of the starter code (no other modifications were allowed).</p>
      </article>
      <article className="project-article">
        <h1>Pre-Assignment Testing</h1>
        <p>Before making any changes, I first ran the given script and checked the original WER (shown below):</p>
        <p className='code_block'>%WER 95.78 [ 499 / 521, 9 ins, 70 del, 420 sub ] exp/tri2b/decode/wer_17_0.5</p>
        <p>Clearly, this is terrible! I also looked at some of the output transcriptions with this initial system. Here’s an example:</p>
        <div className='code_block'>
          <p><b>Ground Truth →</b> I WANT A SMALL PIZZA WITH TOMATOES GREEN OLIVES ONIONS AND HAM</p>
          <p className='mb0'><b>Transcription →</b> WHAT ONE EAST GULF OF DIXON WITH MANHATTAN+S RADAR LONS ARE ON AND FLINT HAVE</p>
        </div>
        <p className='mt2'>Only the word “WITH” is shared between the original and transcribed text (which could just be random).</p>
      </article>
      <article className="project-article">
        <h1>Initial Approach</h1>
        <p>The first thing I did was to create all the necessary files required to build the Language Model. This included the following:</p>
        <ul>
          <li>“lexicon.txt” → I downloaded CMU_DICT and added an "&#60;OOV&#62;" to it.</li>
          <li>“nonsilence_phones.txt” → These were the phones from CMU_DICT (I removed SIL from it).</li>
          <li>“silence_phones.txt” → I put the SIL here (with SPN for &#60;OOV&#62;).</li>
          <li>“optional_silence.txt” → Just SIL.</li>
        </ul>
        <p>Next, I generated sentences to build my “corpus.txt” file. For this, I used a python script to generate all possible combinations of words given the rules in the assignment (start/end phrases, pizza w/ or w/o sizes, 0 or more toppings). To put an upper bound on the size of this file, I limited the maximum number of toppings in a single sentence to 5. This resulted in a corpus containing around 43,172,283 sentences and the final size of “corpus.txt” was 3.48GB (which is why it was not included with this submission).</p>
        <p>Below are 5 sentences randomly sampled from this corpus:</p>
        <div className='code_block'>
          <p>‘GIMME A PIZZA WITH GREEN OLIVES PEPPERONI SAUSAGE AND PINEAPPLE FOR PICKUP’</p>
          <p>‘I'D LIKE A SMALL PIZZA WITH GREEN PEPPERS GREEN OLIVES SAUSAGE HAM AND BLACK OLIVES FOR DELIVERY"</p>
          <p>‘I WANNA SMALL PIZZA WITH EXTRA CHEESE SPINACH ANCHOVIES PEPPERONI AND BACON FOR DELIVERY'</p>
          <p>‘I WANT TO ORDER A LARGE PIZZA WITH MUSHROOMS ANCHOVIES SPINACH PINEAPPLE AND EXTRA CHEESE'</p>
          <p className='mb0'>‘MEDIUM PIZZA WITH HAM ONIONS BACON BROCCOLI AND BLACK OLIVES FOR DELIVERY'</p>
        </div>
        <p className='mt2'>With that, all required data was ready.</p>
        <p>After this, I modified the run.sh file to build the LM, which I’ll describe next. (Note: These next steps involved adding code BEFORE the steps/decode.sh line in run.sh.)</p>
        <p>First, I used utils/prepare_lang.sh to compile my lexicon dictionary and related files. Then, I used the ngram-count program from the SRILM library (which I installed from kaldi/tools) to generate my .arpa model (this took around 8-10 mins since my corpus.txt was huge). I followed this up by calling the arpa2fst program and generated the G.fst model file. Finally, I used the utils/mkgraph.sh program to build the decoding graph with my LM.</p>
        <p>I ran my script and checked the exp/tri2b/decode/ directory. The following WER was noted:</p>
        <p className='code_block'>%WER 84.45 [ 440 / 521, 11 ins, 231 del, 198 sub ] exp/tri2b/decode/wer_17_0.0</p>
        <p className='mt2'>This is a 95.78 - 84.45 = 11.33% improvement!</p>
        <p>I also checked the transcription outputs. Here’s the same example shown earlier:</p>
        <div className='code_block'>
          <p><b>Ground Truth →</b> I WANT A SMALL PIZZA WITH TOMATOES GREEN OLIVES ONIONS AND HAM</p>
          <p className='mb0'><b>Transcription →</b> SAUSAGE ONIONS GREEN OLIVES EXTRA CHEESE FOR PICKUP</p>
        </div>
        <p className='mt2'>The exp/tri2b/decode/wer_details/per_utt file shows the alignment of this output:</p>
        <img src={initial} alt="Initial Alignment"/> 
        <p>Compared to before, all the words in the output are related to our Pizza Delivery system (thanks to our LM), but it’s still not doing a great job; only “GREEN OLIVES” and “ONIONS” are right (though the order is flipped).</p>
      </article>
      <article className="project-article">
        <h1>Observations from Audio Files &amp; How Might One Reduce the Error</h1>
        <p>Next, I took a look at the wav files and compared it with the transcriptions in exp/tri2b/decode/wer_details/per_utt. Here are some of the things I noticed:</p>
        <img src={obs1} alt="Observation #1 Alignment"/> 
        <p>When I listened to the air_004.wav file, I noticed a very audible click sound right at the start of the recording (most air_*.wav files have this issue). This may explain why the ASR predicted “GIVE” instead of “I” as the click sound was kinda like a “G”. The “ME A” that followed almost certainly came from the LM (since those follow the word “GIVE” with 1.0 probability).</p>
        <p>I also noticed a long pause after ”HOT PEPPERS”, which may explain the ASR missed the words in the middle and transcribed the final sound of “AND” as “HAM”, followed by the correct transcription “SAUSAGE”.</p>
        <p><b>Solution:</b> To address the starting click (or clicks in other places), the obvious answer is to clean the audio files to eliminate such issues. An alternate approach would be to define an additional special token &#60;CLICK&#62; and redo our transcriptions. Pauses can also be handled by a special token.</p>
        <img src={obs2} alt="Observation #2 Alignment"/> 
        <p>In air_014.wav, the speaker actually says “ I   WANNA  ORDER  A  LARGE  PIZZA  WITH  HOT  PEPPERS… UH.. GREEN …”. As the “UH” is not part of our LM vocabulary, it confused our ASR system.</p>
        <p><b>Solution:</b> We can treat words like “UH” as silence or an OOV word, and reflect that in the transcriptions.</p>
        <img src={obs3} alt="Observation #3 Alignment"/> 
        <p>In this audio, there is a very audible gasp followed by a pause and then “I WANNA ...”. The gasp may have given the “G” sound in “GREEN”, the “OLIVES” came from the LM (and perhaps partially due to the “OW” sound in “WANNA”), and the “AND” from the latter sound in “WANNA”.</p>
        <p><b>Solution:</b> As before, proper data cleaning and use of special tokens can solve this issue.</p>
      </article>
      <article className="project-article">
        <h1>A Side Observation</h1>
        <p>When I checked the exp/tri2b/decode/wer_details/ops file,  I noticed that it was counting things like “(bdl_004)”, “(art_010)” as deletions. A part of the file is shown below:</p>
        <div className='code_block'>
          <p>deletion      (art_010)          ***     1</p>
          <p>deletion      (bdl_004)          ***     1</p>
          <p>deletion      (dah_002)          ***     1</p>
          <p>deletion      (dah_016)          ***     1</p>
          <p>deletion      (iah_002)          ***     1</p>
          <p>deletion      (iah_006)          ***     1</p>
          <p className='mb0'>deletion      (iah_016)          ***     1</p>
        </div>
        <p className='mt2'>This is not really what we want (I went to the wav/ directory and listened to the audio for these entries and, as expected, the file name is not spoken). However, this probably won’t make that big of a difference since these are all OOV words and taking them out would lower the number of deletions, but also lower the total number of words; so the WER may not change much (I actually tested my theory and, surprisingly, the WER increased slightly, to 84.82%, since the number of words decreased by 60, but the number of deletions only decreased by 11&mdash;i.e., other deletions were happening).</p>
      </article>
      <article className="project-article">
        <h1>Other Observations and Subsequent Modification</h1>
        <p>Simply looking at the transcriptions in exp/tri2b/decode/wer_details/per_utt, I noticed a few things. First, the current ASR seems to predict a topping as the first word in a majority of cases. This was most likely since I added all combinations of topping up to 5. Due to this, the ASR was wrong for the start of most sentences.</p>
        <p>The max number of toppings on a single pizza was around 3; I had assumed 5 in my corpus.</p>
        <p>Another thing I noticed was that, whenever my ASR system got the word “PIZZA” in the output, it always missed the size. </p>
        <p>Lastly (the last I shall mention), I didn’t have any examples of “FOR DELIVERY” or “FOR PICKUP” as whole utterances in my corpus (since I didn’t expect these without at least a pizza or topping mentioned before it).</p>
        <p>Based on these (and a few other) observations, I created a new corpus. I also played around with different n-gram sizes and smoothing options and reran the script. The best WER I was able to obtain (through several trials) was as follows:</p>
        <p className='code_block'>%WER 83.52 [ 436 / 522, 9 ins, 217 del, 210 sub ] exp/tri2b/decode/wer_14_1.0</p>
        <p>Another ~1% improvement in WER. While this was not as much as I expected, this is the lowest I could get by making changes to the corpus (and, consequently, the LM) alone.</p>
      </article>
      <article className="project-article">
        <h1>Conclusion</h1>
        <p>To end, I mention a few other simple things that could be tried (but weren’t due to lack of time) to improve the WER.</p>
        <p>One way to further improve the WER is to re-transcribe all the files taking into account the issues mentioned in the section on audio files.</p>
        <p>We may also try to train different acoustic models and compare results. So, instead of the triphone tri2b model, we could experiment with tri1, mono, and other models.</p>
        <p>Finally, I noticed some transcriptions had the right words (just 2-3, but still), though not aligned properly; so we can try improving the alignment script (though I’m not exactly sure how).</p>
      </article>
    </ProjectPage>
  )
}

export default ASRPage

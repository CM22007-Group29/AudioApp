import whisperx
import gc


class SpeachToText():
    def __init__(self):
        device = "cpu" 
        self.device = device
        # audio_file = "audio.mp3"
        # batch_size = 4 # reduce if low on GPU mem
        compute_type = "int8" # change to "int8" if low on GPU mem (may reduce accuracy)

        # 1. Transcribe with original whisper (batched)
        self.model = whisperx.load_model("distil-large-v3", device, compute_type=compute_type)

    def transcribe(self, audioPath):
        audio = whisperx.load_audio(audioPath)
        result = self.model.transcribe(audio, verbose=True)
        print(result)
        model_a, metadata = whisperx.load_align_model(language_code=result["language"], device=self.device)
        result = whisperx.align(result["segments"], model_a, metadata, audio, self.device, return_char_alignments=False)

        output = (result["segments"]) # after alignment
        time_tuples = []
        words = []
        scores = []

        for segment in output:
            if "words" in segment:
                for word_data in segment["words"]:
                    start = word_data.get("start")
                    end = word_data.get("end")
                    score = word_data.get("score") 
                    word = word_data.get("word")
                    if start is not None and end is not None:
                        time_tuples.append((start * 1000 , end * 1000))
                    if word is not None:
                        words.append(word)
                    if score is not None:
                        scores.append(score)

        print(time_tuples)
        print(words)
        return time_tuples, words, scores
    
import whisper
from faster_whisper import WhisperModel
import time


model = whisper.load_model("turbo")
model2 = WhisperModel("distil-large-v3",cpu_threads=8)
totaltime1 = 0
totaltime2 = 0
for i in range(1, 4):
    time1 = time.time()
    result = model.transcribe("tests/audio_extended{0}.mp3".format(i),verbose=True)
    time2 = time.time()
    segs, _ = model2.transcribe("tests/audio_extended{0}.mp3".format(i),language="en")    
    time3 = time.time()
    print("Time for turbo: ", time2 - time1)
    print("Time for faster: ", time3 - time2)
    totaltime1 += time2 - time1
    totaltime2 += time3 - time2
    for seg in segs:
        print(seg)
print("Total time for turbo: ", totaltime1)
print("Total time for faster: ", totaltime2)

# save model to local path (optional)
# model_dir = "/path/"
# model = whisperx.load_model("large-v2", device, compute_type=compute_type, download_root=model_dir)



# delete model if low on GPU resources
# import gc; gc.collect(); torch.cuda.empty_cache(); del model

# 2. Align whisper output


# delete model if low on GPU resources
# import gc; gc.collect(); torch.cuda.empty_cache(); del model_a

# 3. Assign speaker labels
# diarize_model = whisperx.DiarizationPipeline(use_auth_token=YOUR_HF_TOKEN, device=device)

# # add min/max number of speakers if known
# diarize_segments = diarize_model(audio)
# # diarize_model(audio, min_speakers=min_speakers, max_speakers=max_speakers)

# result = whisperx.assign_word_speakers(diarize_segments, result)
# print(diarize_segments)
# print(result["segments"]) # segments are now assigned
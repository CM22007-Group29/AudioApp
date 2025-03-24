
from faster_whisper import WhisperModel

class SpeachToText():
    def __init__(self):
        device = "cpu" 
        self.device = "auto"
        # audio_file = "audio.mp3"
        # batch_size = 4 # reduce if low on GPU mem

        # 1. Transcribe with original whisper (batched)
        self.model = WhisperModel("distil-large-v3", device=device)

    def transcribe(self, audioPath):
        segs, _ = self.model.transcribe(audioPath, language="en", word_timestamps=True)
        time_tuples = []
        words = []
        scores = []

        for segment in segs:
            print(segment)
            for word in segment.words:
                print("[%.2fs -> %.2fs] %s" % (word.start, word.end, word.word))
        return time_tuples, words, scores
    
import time


# model = whisper.load_model("turbo", device="cuda")
model = SpeachToText()
totaltime2 = 0
for i in range(1, 4):
    time2 = time.time()
    segs = model.transcribe("tests/audio_extended{0}.mp3".format(i))    
    time3 = time.time()
    print("Time for faster: ", time3 - time2)
    totaltime2 += time3 - time2
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
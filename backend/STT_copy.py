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
        result = self.model.transcribe(audio)
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

        print("Time tuples:", time_tuples)
        print("Words:", words)
        print("Scores:", scores)
        return time_tuples, words, scores
    
import word_removal

stt = SpeachToText()
time, words, scores = stt.transcribe("tests/audio_input.mp3")

remover = word_removal.WordRemover()
times = remover.roided_remove(words,time,time[-1][-1])
print(times)
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
import whisperx
import whisperx

class SpeachToText():
    def __init__(self):
        device = "cpu" 
        self.device = device
        # audio_file = "audio.mp3"
        compute_type = "float32" # change to "int8" if low on GPU mem (may reduce accuracy)

        # 1. Transcribe with original whisper (batched)
        self.model = whisperx.load_model("distil-large-v3",device=device, compute_type=compute_type,language="en")
        device = "cpu" 
        self.device = device
        # audio_file = "audio.mp3"
        compute_type = "float32" # change to "int8" if low on GPU mem (may reduce accuracy)

        # 1. Transcribe with original whisper (batched)
        self.model = whisperx.load_model("distil-large-v3",device=device, compute_type=compute_type,language="en")

    def transcribe(self, audioPath):
        audio = whisperx.load_audio(audioPath)
        result = self.model.transcribe(audio,language="en")

        model_a, metadata = whisperx.load_align_model(language_code=result["language"], device=self.device)
        result = whisperx.align(result["segments"], model_a, metadata, audio, self.device, return_char_alignments=False)
        audio = whisperx.load_audio(audioPath)
        result = self.model.transcribe(audio,language="en")

        model_a, metadata = whisperx.load_align_model(language_code=result["language"], device=self.device)
        result = whisperx.align(result["segments"], model_a, metadata, audio, self.device, return_char_alignments=False)

        output = (result["segments"]) # after alignment
        time_tuples = []
        output = (result["segments"]) # after alignment
        time_tuples = []
        words = []
        scores = []
        scores = []

        for segment in output:
            nextFlag = False
            if "words" in segment:
                for word_data in segment["words"]:
                    start = word_data.get("start")
                    end = word_data.get("end")
                    score = word_data.get("score") 
                    word = word_data.get("word")
                    if start is not None and end is not None and  word is not None and score is not None:
                        if nextFlag:
                            time_tuples.append((int(time_tuples[-1][1]) * 0.9 + int(start * 1000) * 0.1 , int(start * 1000) * 0.7 + int(time_tuples[-1][1]) * 0.3))
                            words.append("*...*")
                            scores.append(1)
                            nextFlag = False
                        time_tuples.append((int(start * 1000) , int(end * 1000)))
                        words.append(word)
                        scores.append(score)
                        if "..." in word:
                            nextFlag = True


        return time_tuples, words, scores

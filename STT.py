
import whisper_timestamped
import json
class SpeachToText():
    def __init__(self):
        self.model = model = whisper_timestamped.load_model("small", device="cpu")

    def transcribe(self, audioPath):
        audio = whisper_timestamped.load_audio(audioPath)
        output = self.parse(whisper_timestamped.transcribe(self.model, audio, language="en"))
        return output
    
    def parse(self, result):
        json_str = json.dumps(result, indent = 2, ensure_ascii = False)
        data = json.loads(json_str)

        sentences = []
        sentence_times = []
        words = []
        word_times = []

        for segment in data.get('segments', []):
            
            sentence_text = segment.get('text', '').strip()
            sentences.append(sentence_text)
            
            
            sentence_times.append((segment.get('start'), segment.get('end')))
            
            
            for word_info in segment.get('words', []):
                word_text = word_info.get('text', '').strip()
                words.append(word_text)
                word_times.append((word_info.get('start'), word_info.get('end')))

        # print("Sentences:", sentences)
        # print("Sentence Times:", sentence_times)
        # print("Words:", words)
        # print("Word Times:", word_times)
        return(sentences, sentence_times, words, word_times)

model = SpeachToText()
output = model.transcribe("Recording.m4a")
print(output[2:])
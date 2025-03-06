
import whisper_timestamped
import json
class SpeachToText():
    def __init__(self):
        self.model = model = whisper_timestamped.load_model("turbo", device="cpu")

    def transcribe(self, audioPath):
        audio = whisper_timestamped.load_audio(audioPath)
        output = self.parse(whisper_timestamped.transcribe(self.model, audio, language="en", detect_disfluencies=True))
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
                buffer = 50
                word_times.append((word_info.get('start') * 1000 - buffer, word_info.get('end')* 1000 + buffer))

        # print("Sentences:", sentences)
        # print("Sentence Times:", sentence_times)
        # print("Words:", words)
        # print("Word Times:", word_times)
        return(words, word_times)
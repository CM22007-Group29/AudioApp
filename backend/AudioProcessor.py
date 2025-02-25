from word_removal import WordRemover
from STT import SpeachToText
from pydub import AudioSegment, effects, silence

from AudioFile import Audio

class AudioProcessingService:
    def __init__(self, audioFile):
        # Load the audio and store its type for later export.
        self.audio = audioFile.loadFile()
        self.fileType = audioFile.getFileType()
        self.audio_file = audioFile
        self.whisper = SpeachToText()
        self.word_remover = WordRemover()

    def cutAudio(self, timestamps):
        """
        Remove segments from the audio between the provided timestamps.
        timestamps: list of tuples (start, end) in milliseconds.
        The function assumes that the timestamps are non-overlapping.
        """
        # First, sort the timestamps to process them in order.
        timestamps = sorted(timestamps, key=lambda x: x[0])
        new_audio = AudioSegment.empty()
        last_index = 0
        
        # Loop over each (start, end) tuple and build the new audio.
        for start, end in timestamps:
            # Append the segment before the cut.
            new_audio += self.audio[last_index:start]
            # Update the last index to the end of the removed segment.
            last_index = end
        
        # Append any remaining audio after the last removed segment.
        new_audio += self.audio[last_index:]
        self.audio = new_audio
        return self.audio
    
    def getTimestamps(self):
        words, timestamps = self.whisper.transcribe(self.audio_file.getFilePath())
        cutStamps = self.word_remover.remove(words, timestamps)
        print(cutStamps)
        return cutStamps

    def normalizeAudio(self):
        """
        Normalise the audio volume
        """
        return effects.normalize(self.audio)
    
    def removeSilences(self, min_sil_len_sec, silence_threshold):
        """
        Remove overlong silences in the audio
        min_sil_len_sec: int for the minimum length a silence must be to be removed (in seconds)
        """
        min_sil_len_ms = min_sil_len_sec * 1000

        timestamps = silence.detect_silence(self.audio, min_sil_len_ms, silence_threshold, 1)
        
        # Now use cut audio function to remove these timestamps
        return self.cutAudio(timestamps)

    def processAudio(self, timestamps=[], normalize=False, silence_length = -1, silence_threshold=-40):
        """
        Process the audio based on the provided timestamps.
        Carry out other processing steps here. (e.g., noise reduction, volume normalization)
        normalize: bool that determines whether normalization happens
        silence_length: int for minimum length of silence to be removed (in seconds)
        silence_threshold: int for the maximum level of decibels audio can be to be considered silence
        """
        
        if timestamps:
            self.audio = self.cutAudio(timestamps)
        
        if silence_length > 0:
            self.audio = self.removeSilences(silence_length, silence_threshold)
        
        # Normalisation makes sense as last step
        if normalize:
            self.audio = self.normalizeAudio()
        
        return self.audio

    def saveFile(self, outputFilePath):
        """
        Exports the processed audio to a file.
        """
        self.audio.export(outputFilePath, format=self.fileType)
from pydub import AudioSegment
from word_removal import WordRemover
from STT import SpeachToText
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
    
    def getTimestampes(self):
        words, timestamps = self.whisper.transcribe(self.audio_file.getFilePath())
        cutStamps = self.word_remover.remove(words, timestamps)
        print(cutStamps)
        return cutStamps


    def processAudio(self, timestamps=[]):
        """
        Process the audio based on the provided timestamps.
        Carry out other processing steps here. (e.g., noise reduction, volume normalization)
        """
        if timestamps:
            return self.cutAudio(timestamps)
        return self.audio

    def saveFile(self, outputFilePath):
        """
        Exports the processed audio to a file.
        """
        self.audio.export(outputFilePath, format=self.fileType)
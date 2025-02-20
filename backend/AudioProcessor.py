from pydub import AudioSegment, effects

class AudioProcessingService:
    def __init__(self, audioFile):
        # Load the audio and store its type for later export.
        self.audio = audioFile.loadFile()
        self.fileType = audioFile.getFileType()

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
    
    def normalizeAudio(self):
        """
        Normalise the audio volume using pydub built in function
        """
        return effects.normalize(self.audio)

    def processAudio(self, timestamps=[], normalize=False):
        """
        Process the audio based on the provided timestamps.
        Carry out other processing steps here. (e.g., noise reduction, volume normalization)
        normalise: bool that determines whether normalization happens
        """
        if timestamps:
            if normalize:
                self.audio = self.normalizeAudio()
            return self.cutAudio(timestamps)
        return self.audio

    def saveFile(self, outputFilePath):
        """
        Exports the processed audio to a file.
        """
        self.audio.export(outputFilePath, format=self.fileType)
from pydub import AudioSegment, effects

from AudioFile import Audio

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
    
    def removeSilences(self, threshold=0.0):
        """
        Remove background noise in the audio, determined by a threshold given by the user
        threshold: the threshold set by the user as a float between 0 and 1 where lower means more background noise removed
        """
        audio_length_s = self.audio.duration_seconds
        audio_length_ms = audio_length_s * 1000

        # Pydub uses a relative scaling for its volume
        # So get the maxium possible volume of the audio
        max_vol = self.audio.max_dBFS

        # Dbfs gives decibels relative to full scale
        # 0 is the loudest possible volume in the sample
        # It then decreases logarithmically from there (-10 Dbfs is 1/10 of full volume)

        # Maximum level for background noise removal will be half of max possible volume
        max_threshold = max_vol / 2

        # Then scale this by users threshold setting using log base 10


        # Run through the audio clip and get a list of timestamps for silences
        # In format [(start,end), ...]
        timestamps = []

        start = 0
        end = 0
        background = False
        while end < audio_length_ms:
            
            # print(self.audio[end].dBFS)
            if self.audio[end].dBFS <= threshold:
                if not background:
                    background = True
                    start = end
            else:
                if background:
                    # Add this section to timestamp list
                    timestamps.append((start, end))
                    background = False
            end += 1
        
        print(timestamps)
        return timestamps

    def processAudio(self, timestamps=[], normalize=False):
        """
        Process the audio based on the provided timestamps.
        Carry out other processing steps here. (e.g., noise reduction, volume normalization)
        normalise: bool that determines whether normalization happens
        """
        
        if timestamps:
            return self.cutAudio(timestamps)
        
        # Normalisation makes sense as last step
        if normalize:
            self.audio = self.normalizeAudio()
        
        return self.audio

    def saveFile(self, outputFilePath):
        """
        Exports the processed audio to a file.
        """
        self.audio.export(outputFilePath, format=self.fileType)


if __name__ == "__main__":
    # path = 'backend/tests/audio_input.mp3'
    path = 'backend/tests/audio_input.mp3'

    audioFile = Audio(path)
    
    # Create the processing service instance
    processor = AudioProcessingService(audioFile)
    
    # Process the audio (cutting it as specified)
    processor.removeSilences()

    # Save the processed audio using the processor's method
    # processor.saveFile('backendtests/test_processed1.mp3')
    processor.saveFile('backend/tests/test_background_noise.mp3')
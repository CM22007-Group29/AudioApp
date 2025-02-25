import sys
import os

# Add the parent directory to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from AudioFile import Audio
from AudioProcessor import AudioProcessingService

def test():
    path = 'backend/tests/test2.mp3'
    # Create an Audio instance
    audioFile = Audio(path)
    print("Input file duration: ", audioFile.getDuration())
    
    # Create the processing service instance
    processor = AudioProcessingService(audioFile)
    
    # Process the audio (cutting it as specified)
    cutStamps = processor.getTimestampes()
    processor.processAudio(cutStamps)
    print("Processed file duration: ", processor.audio.duration_seconds)

    # Save the processed audio using the processor's method
    processor.saveFile('backend/tests/test_processed1.mp3')

test()
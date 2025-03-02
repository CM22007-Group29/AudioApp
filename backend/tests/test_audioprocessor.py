import sys
import os

# Add the parent directory to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from AudioFile import Audio
from AudioProcessor import AudioProcessingService

def test_audioprocessor():
    # path = 'backend/tests/audio_input.mp3'
    path = 'tests/audio_input.mp3'
    # Create an Audio instance
    audioFile = Audio(path)
    print("Input file duration: ", audioFile.getDuration())
    
    # Create the processing service instance
    processor = AudioProcessingService(audioFile)
    
    # Process the audio (cutting it as specified)
    processor.processAudio([(2020, 3020)])
    print("Processed file duration: ", processor.audio.duration_seconds)

    # Save the processed audio using the processor's method
    # processor.saveFile('backendtests/test_processed1.mp3')
    processor.saveFile('tests/test_processed1.mp3')

def test_normalization():
    # path = 'backend/tests/audio_input.mp3'
    path = 'tests/audio_input.mp3'
    # Create an Audio instance
    audioFile = Audio(path)
    print("Input file duration: ", audioFile.getDuration())
    
    # Create the processing service instance
    processor = AudioProcessingService(audioFile)
    
    # Process the audio (cutting it as specified)
    # And run with normalization this time
    processor.processAudio([(2020, 3020)], True)
    print("Processed file duration: ", processor.audio.duration_seconds)

    # Save the processed audio using the processor's method
    # processor.saveFile('backendtests/test_processed1.mp3')
    processor.saveFile('tests/test_processed_normalized.mp3')

def test_silence_removal():
    """
    Test for silence removal by looking at duration of clip.
    """
    # path = 'backend/tests/audio_input.mp3'
    path = 'tests/audio_input.mp3'
    # Create an Audio instance
    audioFile = Audio(path)

    # Create the processing service instance
    processor = AudioProcessingService(audioFile)

    # Get duration before silence removal
    original_duration = processor.audio.duration_seconds
    
    # Process the audio (with a silence length of 0.5 and a low threshold)
    processor.processAudio(silence_length=1, silence_threshold=-16)

    # Get duration after silence removal
    silenced_duration = processor.audio.duration_seconds

    # Save the processed audio using the processor's method to check if difference can be heard
    processor.saveFile('tests/test_silence_removal')

    # If successful silenced audio duration less than or equal to length
    assert original_duration <= silenced_duration
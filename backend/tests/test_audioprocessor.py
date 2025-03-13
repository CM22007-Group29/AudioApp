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
    processor.processAudio([(2400, 2700)])
    print("Processed file duration: ", processor.audio.duration_seconds)

    # Save the processed audio using the processor's method
    # processor.saveFile('backendtests/test_processed1.mp3')
    processor.saveFile('tests/test_processed1.mp3')
    assert processor.audio.duration_seconds < audioFile.getDuration()

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

def test_STT():
    output = []
    for i in range(1, 5):
        path = 'tests/audio_extended{0}.mp3'.format(i)
        # Create an Audio instance
        audioFile = Audio(path)
        print("Input file duration: ", audioFile.getDuration())
        
        # Create the processing service instance
        processor = AudioProcessingService(audioFile)
        
        # Process the audio (cutting it as specified)
        cutStamps = processor.getTimestamps(betterVersion=True)
        print(cutStamps)
        processor.processAudio(cutStamps)
        print("Processed file duration: ", processor.audio.duration_seconds)

        # Save the processed audio using the processor's method
        processor.saveFile("tests/test_processed{0}.mp3".format(i))
        outputFile = Audio("tests/test_processed{0}.mp3".format(i))
        processor = AudioProcessingService(outputFile)
        cutStamps = processor.getTimestamps(betterVersion=True)
        output.append(cutStamps)
    assert len(output) == 0

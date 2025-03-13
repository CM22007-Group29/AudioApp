from backend.AudioFile import Audio
from backend.AudioProcessor import AudioProcessingService

from tests import give_app_context

@give_app_context
def test_audioprocessor():
    # path = 'backend/tests/audio_input.mp3' # local path
    path = 'tests/audio_input.mp3' # docker path
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
    assert processor.audio.duration_seconds < audioFile.getDuration()

@give_app_context
def test_normalization():
    """
    Test for normalization by looking at peak amplitude before and after.
    """
    # path = 'backend/tests/audio_input.mp3' #local path
    path = 'tests/audio_input.mp3' #docker path
    # Create an Audio instance
    audioFile = Audio(path)

    # Create the processing service instance
    processor = AudioProcessingService(audioFile)

    # Get peak before normalizing
    original_peak = processor.audio.max_dBFS
    
    # Process the audio (with normalization enabled)
    # And run with normalization this time
    processor.processAudio(normalize=True)

    # Get peak after normalizing
    normalized_peak = processor.audio.max_dBFS

    # Save the processed audio using the processor's method to check if difference can be heard
    processor.saveFile('tests/test_processed_normalized.mp3')

    # If successful normalized peak should be greater than original
    assert normalized_peak > original_peak

@give_app_context
def test_STT():
    path = 'tests/test2.mp3'
    # Create an Audio instance
    audioFile = Audio(path)
    print("Input file duration: ", audioFile.getDuration())
    
    # Create the processing service instance
    processor = AudioProcessingService(audioFile)
    
    # Process the audio (cutting it as specified)
    cutStamps = processor.getTimestamps()
    processor.processAudio(cutStamps)
    print("Processed file duration: ", processor.audio.duration_seconds)

    # Save the processed audio using the processor's method
    processor.saveFile('tests/test_processed1.mp3')
    outputFile = Audio('tests/test_processed1.mp3')
    processor = AudioProcessingService(outputFile)
    cutStamps = processor.getTimestamps()
    assert len(cutStamps) == 0

@give_app_context
def test_silence_removal():
    """
    Test for silence removal by looking at duration of clip.
    """
    # path = 'backend/tests/audio_input.mp3' #local path
    path = 'tests/audio_input.mp3' #docker path
    # Create an Audio instance
    audioFile = Audio(path)

    # Create the processing service instance
    processor = AudioProcessingService(audioFile)

    # Get duration before silence removal
    original_duration = processor.audio.duration_seconds
    
    # Process the audio (with a silence length of 0.5 and a low threshold)
    processor.processAudio(silence_length=1, silence_threshold=-40)

    # Get duration after silence removal
    silenced_duration = processor.audio.duration_seconds

    # Save the processed audio using the processor's method to check if difference can be heard
    processor.saveFile('tests/test_silence_removal')

    # If successful silenced audio duration less than or equal to original
    assert silenced_duration <= original_duration


# if __name__ == '__main__':
#     test_audioprocessor()
#     test_normalization()
#     test_STT()
#     test_silence_removal()
#     print("All tests passed!")
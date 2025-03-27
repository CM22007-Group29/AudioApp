from backend.AudioFile import Audio
from backend.AudioProcessor import AudioProcessingService


def test_audioprocessor():
    path = 'backend/tests/audio_input.mp3' # local path
    # path = 'tests/audio_input.mp3' # docker path
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
    processor.saveFile('backend/tests/test_processed.mp3')
    assert processor.audio.duration_seconds < audioFile.getDuration()


def test_normalization():
    """
    Test for normalization by looking at peak amplitude before and after.
    """
    path = 'backend/tests/audio_input.mp3' #local path
    # path = 'tests/audio_input.mp3' #docker path
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
    processor.saveFile('backend/tests/test_processed_normalized.mp3')

    # If successful normalized peak should be greater than original
    assert normalized_peak > original_peak


def test_STT():
    output = []
    import time
    totalTime = 0
    #change to 1,5 if you wanna test the other audio files
    for i in range(4,5):
        time1 = time.time()
        path = 'backend/tests/audio_extended{0}.mp3'.format(i)
        # Create an Audio instance
        audioFile = Audio(path)
        print("Input file duration: ", audioFile.getDuration())
        
        # Create the processing service instance
        processor = AudioProcessingService(audioFile)
        
        # Process the audio (cutting it as specified)
        cutStamps = processor.getCutstamps()
        print(cutStamps)
        processor.processAudio(cutStamps)
        print("Processed file duration: ", processor.audio.duration_seconds)

        # Save the processed audio using the processor's method
        processor.saveFile("backend/tests/test_processed{0}.mp3".format(i))
        outputFile = Audio("backend/tests/test_processed{0}.mp3".format(i))
        time2 = time.time()
        totalTime += time2 - time1
        processor = AudioProcessingService(outputFile)
        cutStamps = processor.getCutstamps(test=True)
        if len(cutStamps) > 0:
            output.append(cutStamps)
    print("Time for processing: ", totalTime)
    print(output)
    assert len(output) == 0
    
def test_silence_removal():
    """
    Test for silence removal by looking at duration of clip.
    """
    path = 'backend/tests/audio_input.mp3' #local path
    # path = 'tests/audio_input.mp3' #docker path
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
    processor.saveFile('backend/tests/test_silence_removal.mp3')

    # If successful silenced audio duration less than or equal to original
    assert silenced_duration <= original_duration

def test_word_timestamps():
    for i in range(1,5):
        path = 'backend/tests/audio_extended{0}.mp3'.format(i)
        
        audioFile = Audio(path)
        
        processor = AudioProcessingService(audioFile)
        
        word_timesamps = processor.getWordsTimestamps()
        print(word_timesamps)
        assert len(word_timesamps) > 0
        assert len(word_timesamps[0]) == 3
        assert len(word_timesamps[0][1]) == 2
        assert isinstance(word_timesamps[0][2],bool)

if __name__ == '__main__':
    test_word_timestamps()
    # test_audioprocessor()
    # test_normalization()
    # test_STT()
    # test_silence_removal()
    print("All tests passed!")
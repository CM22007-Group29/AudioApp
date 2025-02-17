import AudioFile
import AudioProcessor

def test():
    path = 'backend/test1.mp3'
    audioFile = AudioFile.AudioFile(path)
    
    # Create the processing service instance
    processor = AudioProcessor.AudioProcessingService(audioFile)
    
    # Process the audio (cutting it as specified)
    processor.processAudio([(2020, 3020)])
    
    # Save the processed audio using the processor's method
    processor.saveFile('backend/test_processed.mp3')

test()
import os
from backend import create_app, db
from backend.models import UserPreferences  # Import your models as needed
from AudioFile import Audio
from AudioProcessor import AudioProcessingService

def get_user_preferences(user_id):
    """
    Fetch the user's audio editing preferences from the database.
    """
    prefs = UserPreferences.query.filter_by(user_id=user_id).first()
    if not prefs:
        raise ValueError(f"No preferences found for user with id {user_id}")
    return prefs

def process_audio_for_user(user_id, audio_file_path):
    """
    Process the audio file based on the user's editing preferences:
    - Fetch preferences from the database.
    - Transcribe the audio to get words and timestamps.
    - Remove segments based on forbidden words (or extra words) in the preferences.
    - Apply additional processing such as silence removal or normalization.
    - Save the processed audio to a new file.
    """
    # Fetch user preferences from the database.
    prefs = get_user_preferences(user_id)

    # Update word remover if extra words are provided.
    if prefs.extra_words:
        processor.word_remover.update_words(prefs.extra_words)

    # Create an Audio instance.
    audio_obj = Audio(audio_file_path)

    # Instantiate the processing service.
    processor = AudioProcessingService(audio_obj)

    # Use the STT (Speech-to-Text) to get words and timestamps and then
    # determine the cut points based on the user's forbidden words and swears.
    cut_timestamps = processor.getTimestamps()

    # Extract processing parameters from user preferences.
    # - prefs.normalise is a Boolean whether to normalize audio.
    # - prefs.silence_length is an int (in seconds) for minimum silence length to remove.
    # - prefs.silence_threshold is an int (in dB) threshold for silence.
    normalize = prefs.normalise
    silence_length = prefs.silence_length if prefs.silence_length is not None else -1
    silence_threshold = prefs.silence_threshold if prefs.silence_threshold is not None else -40

    # Process the audio: cut out segments, remove silences, and normalize if required.
    processor.processAudio(timestamps=cut_timestamps,
                             normalize=normalize,
                             silence_length=silence_length,
                             silence_threshold=silence_threshold)

    # Define an output file path.
    output_path = os.path.join(os.path.dirname(audio_file_path), f"processed_output.{audio_obj.getFileType()}")

    # Save the processed audio.
    processor.saveFile(output_path)

    return output_path

if __name__ == '__main__':
    # Create the Flask application and push an app context.
    app = create_app()
    with app.app_context():
        # Specify the user id (this might come from a task queue or parameter)
        user_id = 1
        # Specify the audio file path to process.
        audio_file_path = "tests/test1.mp3"  # Adjust as necessary

        try:
            output_file = process_audio_for_user(user_id, audio_file_path)
            print(f"Processed audio saved to: {output_file}")
        except Exception as e:
            print("Error during audio processing:", e)
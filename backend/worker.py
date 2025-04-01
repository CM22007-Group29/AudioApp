import os
from .app.models import UserPreferences 
from .AudioFile import Audio
from .AudioProcessor import AudioProcessingService

class WorkerProcess():
    def __init__(self, userid, audiopath):
        self.user_id = userid 
        self.audio_file_path = audiopath
        self.audio_obj = Audio(self.audio_file_path)
        self.processor = AudioProcessingService(self.audio_obj)


    def get_user_preferences(self, user_id):
        """
        Fetch the user's audio editing preferences from the database.
        """
        prefs = UserPreferences.query.filter_by(user_id=user_id).first()
        if not prefs:
            raise ValueError(f"No preferences found for user with id {user_id}")
        return prefs
    
    def get_word_timestamps(self):
        """
        Get the words and timestamps from the audio file.
        """
        return self.processor.getWordsTimestamps()

    def process_audio_for_user(self, cut_timestamps=None):
        """
        Process the audio file based on the user's editing preferences:
        - Fetch preferences from the database.
        - Transcribe the audio to get words and timestamps.
        - Remove segments based on forbidden words (or extra words) in the preferences.
        - Apply additional processing such as silence removal or normalization.
        - Save the processed audio to a new file.
        """
        # Fetch user preferences from the database.
        prefs = self.get_user_preferences(self.user_id)


        # Update word remover if extra words are provided.
        if prefs.extra_words:
            self.processor.word_remover.update_words(prefs.extra_words)

        # Use the STT (Speech-to-Text) to get words and timestamps and then
        # determine the cut points based on the user's forbidden words and swears.
        if cut_timestamps is None:
            self.cut_timestamps = self.processor.getCutstamps()
        else:
            self.cut_timestamps = cut_timestamps

        # Extract processing parameters from user preferences.
        # - prefs.normalise is a Boolean whether to normalize audio.
        # - prefs.silence_length is an int (in seconds) for minimum silence length to remove.
        # - prefs.silence_threshold is an int (in dB) threshold for silence.
        normalize = prefs.normalise
        silence_length = prefs.silence_length if prefs.silence_length is not None else -1
        silence_threshold = prefs.silence_threshold if prefs.silence_threshold is not None else -40

        # Process the audio: cut out segments, remove silences, and normalize if required.
        self.processor.processAudio(timestamps=self.cut_timestamps,
                                normalize=normalize,
                                silence_length=silence_length,
                                silence_threshold=silence_threshold)

        # Define an output file path.
        output_path = os.path.join(os.path.dirname(self.audio_file_path), f"processed_output.{self.audio_obj.getFileType()}")

        # Save the processed audio.
        self.processor.saveFile(output_path)
        print(f"Processed audio saved to {output_path}")

        return output_path, self.cut_timestamps
    
    # def process_audio_for_user(self,cut_timestamps):
    #     """
    #     Process the audio file based on the user's editing preferences:
    #     - Fetch preferences from the database.
    #     - Transcribe the audio to get words and timestamps.
    #     - Remove segments based on forbidden words (or extra words) in the preferences.
    #     - Apply additional processing such as silence removal or normalization.
    #     - Save the processed audio to a new file.
    #     """
    #     # Fetch user preferences from the database.
    #     prefs = self.get_user_preferences(self.user_id)

    #     # Extract processing parameters from user preferences.
    #     # - prefs.normalise is a Boolean whether to normalize audio.
    #     # - prefs.silence_length is an int (in seconds) for minimum silence length to remove.
    #     # - prefs.silence_threshold is an int (in dB) threshold for silence.
    #     normalize = prefs.normalise
    #     silence_length = prefs.silence_length if prefs.silence_length is not None else -1
    #     silence_threshold = prefs.silence_threshold if prefs.silence_threshold is not None else -40

    #     # Process the audio: cut out segments, remove silences, and normalize if required.
    #     self.processor.processAudio(timestamps=cut_timestamps,
    #                             normalize=normalize,
    #                             silence_length=silence_length,
    #                             silence_threshold=silence_threshold)

    #     # Define an output file path.
    #     output_path = os.path.join(os.path.dirname(self.audio_file_path), f"processed_output.{self.audio_obj.getFileType()}")

    #     # Save the processed audio.
    #     self.processor.saveFile(output_path)
    #     print(f"Processed audio saved to {output_path}")

    #     return output_path, cut_timestamps
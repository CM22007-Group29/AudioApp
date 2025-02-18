class WordRemover():
    def __init__(self, words = []):
        self.words = words
        self.swears = set(["fuck","shit","bitch"])

    def remove(self, words, timestamps):
        times_to_remove = []
        for i, word in enumerate(self.words + self.swears):
            if word in self.swears:
                times_to_remove.append(timestamps[i])
        return times_to_remove

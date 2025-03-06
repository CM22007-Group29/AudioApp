import re
class WordRemover():
    def __init__(self, words = []):
        self.words = set(words)
        self.swears = set(["fuck","shit","bitch","fucking","shitting"])

    def remove(self, words, timestamps):
        times_to_remove = []
        for i, word in enumerate(words):
            print(word)
            if re.sub(r'[^a-zA-Z0-9]', '', word.lower()) in self.words.union(self.swears):
                times_to_remove.append(timestamps[i])
        return times_to_remove

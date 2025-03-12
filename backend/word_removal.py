import re
class WordRemover():
    def __init__(self, score = 0.5, words = []):
        self.words = set(words)
        self.swears = set(["fuck","shit","bitch","fucking","shitting"])
        self.score = score
        self.linInterpolation = 0.5

    def remove(self, words, timestamps):
        times_to_remove = []
        for i, word in enumerate(words):
            print(word)
            if re.sub(r'[^a-zA-Z0-9]', '', word.lower()) in self.words.union(self.swears):
                times_to_remove.append(timestamps[i])
        return times_to_remove
    
    def roided_remove(self, words, timestamps,audioLength = None):
        if not audioLength:
            audioLength = timestamps[-1][-1]
        times_to_remove = []
        if re.sub(r'[^a-zA-Z0-9]', '', words[0].lower()) in self.words.union(self.swears):
            times_to_remove.append(0,timestamps[1][0])
        if re.sub(r'[^a-zA-Z0-9]', '', words[-1].lower()) in self.words.union(self.swears):
            times_to_remove.append(timestamps[-2][1],audioLength)
        for i, word in enumerate(words[1:-1]):
            if re.sub(r'[^a-zA-Z0-9]', '', word.lower()) in self.words.union(self.swears):
                print(word)
                l_i_left = self.linInterpolation
                l_i_right = 1 - l_i_left
                times_to_remove.append((timestamps[i][1] * l_i_left + timestamps[i+1][0] * l_i_right, timestamps[i+1][0] * l_i_left + timestamps[i+2][0] * l_i_right ))
        return times_to_remove

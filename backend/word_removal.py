import re
class WordRemover():
    def __init__(self, score = 0.5, words = []):
        self.words = set(words)
        self.swears = set(["fuck","shit","bitch","fucking","shitting","um","uh", "ass",])
        self.score = score
        self.linInterpolation = 0.5

    def update_words(self, add):
        list_add = add.split(" ")
        for x in list_add:
            self.swears.add(x)
    
    def remove(self, words, timestamps,audioLength = None):
        if not audioLength:
            audioLength = timestamps[-1][-1]
        times_to_remove = []
        if re.sub(r'[^a-zA-Z0-9]', '', words[0].lower()) in self.words.union(self.swears):
            times_to_remove.append((0,timestamps[1][0]))
        if re.sub(r'[^a-zA-Z0-9]', '', words[-1].lower()) in self.words.union(self.swears):
            times_to_remove.append((timestamps[-2][1],audioLength))
        for i, word in enumerate(words[1:-1]):
            i += 1
            if re.sub(r'[^a-zA-Z0-9]', '', word.lower()) in self.words.union(self.swears):
                times_to_remove.append((int(timestamps[i-1][1] * 0.8 + timestamps[i][0] * 0.2), int(timestamps[i][1] * 0.25 + timestamps[i+1][0] * 0.75 )))
            if "..." in word:
                times_to_remove.append((int(timestamps[i][1] * 0.8 + timestamps[i+1][0] * 0.2), int(timestamps[i][0] * 0.25 + timestamps[i+1][0] * 0.75)))
        return times_to_remove

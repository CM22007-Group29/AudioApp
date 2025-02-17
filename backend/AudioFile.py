import os
from pydub import AudioSegment

class AudioFile:
    def __init__(self, filePath):
        self.filePath = filePath
        self.fileType = filePath.split('.')[-1].lower()
        self.fileName = filePath.split('/')[-1]
        self.fileSize = os.path.getsize(filePath)

    def loadFile(self):
        return AudioSegment.from_file(self.filePath)
    
    def saveFile(self, outputFilePath):
        # This method saves the original file.
        self.loadFile().export(outputFilePath, format=self.fileType)
        return outputFilePath
    
    def getFilePath(self):
        return self.filePath
    
    def getFileType(self):
        return self.fileType
    
    def validateFormat(self):
        return self.fileType in ['mp3', 'wav']
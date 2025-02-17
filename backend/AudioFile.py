import os
from pydub import AudioSegment

class Audio:
    def __init__(self, filePath):
        self.filePath = filePath
        self.fileType = filePath.split('.')[-1].lower()
        self.fileName = filePath.split('/')[-1]
        self.fileSize = os.path.getsize(filePath)
        if not self.validateFormat():
            raise ValueError('Invalid file format. Please provide a .mp3 or .wav file.')

    def loadFile(self):
        return AudioSegment.from_file(self.filePath)
    
    def getDuration(self):
        return self.loadFile().duration_seconds
    
    def saveFile(self, outputFilePath):
        self.loadFile().export(outputFilePath, format=self.fileType)
        return outputFilePath
    
    def getFilePath(self):
        return self.filePath
    
    def getFileType(self):
        return self.fileType
    
    def validateFormat(self):
        return self.fileType in ['mp3', 'wav']
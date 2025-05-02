import { useAudioContext } from '../AudioContext';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { getProcessedAudio, processAudio } from '../../services/audioService';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

function Download() {
  const { user } = useAuth();
  const audioContext = useAudioContext();
  // const audioSource = audioContext?.source;
  const [ downloaded, setDownloaded ] = useState(false);
  const [ url, setUrl ] = useState("");

  const download = () => {
    if (audioContext) {
      processAudio(user.id, audioContext.wordData).then(() => {
        getProcessedAudio(user.id).then((blob) => {
          const downloadUrl = window.URL.createObjectURL(blob);
          setDownloaded(true);
          setUrl(downloadUrl); 
        });
      });
    }
  }

  useEffect(() => {
    download();
  }, [])

  return (
    <Box
      sx={{
        textAlign: 'center',
        mt: 4,
        color: 'white'
      }}
    >
      {downloaded ? (
        <Button
          variant="contained"
          color="primary"
          component="a"
          href={url}
          download="edited_audio.mp3"
          sx={{ color: 'black' , backgroundColor: 'white' }}
        >
          Download Audio
        </Button>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
}

export default Download;
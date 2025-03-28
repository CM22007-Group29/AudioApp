import { useAudioContext } from '../AudioProvider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function Download() {
  const audioContext = useAudioContext();
  const audioSource = audioContext?.source;

  return (
    <Box
      sx={{
        textAlign: 'center',
        mt: 4,
        color: 'white'
      }}
    >
      {audioSource ? (
        <Button
          variant="contained"
          color="primary"
          component="a"
          href={audioSource}
          download="edited_audio.mp3"
          sx={{ color: 'black' , backgroundColor: 'white' }}
        >
          Download Audio
        </Button>
      ) : (
        <p>No edited audio available for download.</p>
      )}
    </Box>
  );
}

export default Download;
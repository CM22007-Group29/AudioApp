import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import FolderIcon from '@mui/icons-material/Folder';
import { useAuth } from '../../../context/AuthContext';
import { getAudio } from '../../../services/audioService';
import { useAudioContext } from '../../AudioContext';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload({ setFileUploaded }: { setFileUploaded: (uploaded: boolean) => void }) {
  const { user } = useAuth();
  const userId = user?.id;
  const audioContext = useAudioContext();

  if (!userId) {
    throw new Error("User ID not found");
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("audio", file);

    try {
      const response = await fetch(`http://127.0.0.1:4040/api/audio/${userId}`, {
        method: "POST",
        body: formData
      });
      if (response.ok) {
        setFileUploaded(true);
        getAudio(user.id)
          .then((audioBlob) => {
            console.log("Audio Blob received:", audioBlob);
            console.log("Is it a Blob?", audioBlob instanceof Blob);
            const url = URL.createObjectURL(audioBlob);
            if (!audioContext) {
              throw new Error("Audio context not found");
            }
            audioContext.setAudioContext(prev => ({
              ...prev,
              source: url
            }));
            
            // Create a temporary HTMLAudioElement and play it:
            // const audioPlayer = new Audio(url);
            // audioPlayer.play().catch((err) => console.error("Playback error:", err));
          })
          .catch((error) => {
            console.error("Error retrieving audio:", error);
          });
      } else {
        console.error("Upload failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<FolderIcon />}
      sx={{ backgroundColor: "black" }}
    >
      Upload files
      <VisuallyHiddenInput
        type="file"
        accept="audio/*"
        onChange={handleFileUpload}
      />
    </Button>
  );
}



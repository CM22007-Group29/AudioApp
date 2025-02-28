import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import FolderIcon from '@mui/icons-material/Folder';

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
        onChange={(event) => {
          if (event.target.files && event.target.files.length > 0) {
            setFileUploaded(true)
          }
        }}
      />
    </Button>
  );
}

import Button from '@mui/material/Button';
import LinkIcon from '@mui/icons-material/Link';


export default function LinkUpload() {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<LinkIcon />}
      sx={{ backgroundColor: "black"}}
    >
      Link
    </Button>
  );
}
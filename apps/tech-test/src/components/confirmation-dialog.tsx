import React from 'react';
import {
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { Close } from '@mui/icons-material';

type TConfirmationDialogProps = {
  text: string;
  open: boolean;
  onOk: () => void;
  onClose: () => void;
}

export default function ConfirmationDialog(props: TConfirmationDialogProps) {
  const { text, open, onOk, onClose } = props;

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
    >
      <DialogContent>
        <Typography variant="h6" component="span">
          {text}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}
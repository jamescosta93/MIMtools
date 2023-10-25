import React, { useState } from "react";
import { Snackbar } from "@mui/material";
import { Button, Icon, IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const CopyToClipboardButton = ({ dataToCopy }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(dataToCopy);
  };

  return (
    <>
      <Button onClick={handleClick}>
        <ContentCopyIcon size="large" variant="contained" color="success" />
      </Button>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={2000}
        message="Copied to clipboard"
      />
    </>
  );
};

export default CopyToClipboardButton;

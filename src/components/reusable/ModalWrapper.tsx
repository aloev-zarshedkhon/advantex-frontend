import React, { ReactElement } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import { CancelIcon } from "@/assets/icons";
import { Stack } from "@mui/material";
import { FlexBox } from "@/utils/globalStyles";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        margin: 0,
        padding: "0 10px",
        ...FlexBox,
        justifyContent: children ? "space-between" : "right",
      }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
            marginBottom: "10px",
          }}
        >
          <CancelIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

type Props = {
  open: boolean;
  setOpen: () => void;
  title?: string;
  content: ReactElement;
  actions?: ReactElement;
};

export default function ModalWrapper({
  open,
  setOpen,
  title,
  content,
  actions,
}: Props) {
  return (
    <Stack sx={{ width: "100px" }}>
      <BootstrapDialog
        onClose={setOpen}
        aria-labelledby="customized-dialog-title2"
        open={Boolean(open)}
        maxWidth="md"
      >
        <BootstrapDialogTitle id="customized-dialog-title2" onClose={setOpen}>
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>{content}</DialogContent>
        {actions && <DialogActions>{actions}</DialogActions>}
      </BootstrapDialog>
    </Stack>
  );
}

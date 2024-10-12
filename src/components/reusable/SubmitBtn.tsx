import { Colors } from "@/utils/consts";
import { FlexBox } from "@/utils/globalStyles";
import { Box, CircularProgress } from "@mui/material";
import { ReactElement } from "react";

type Props = {
  text: string;
  loading?: boolean;
};

const SubmitBtn = ({ text, loading }: Props): ReactElement => {
  return (
    <Box
      component="button"
      type="submit"
      disabled={loading}
      sx={{
        padding: {
          xs: "7px 10px",
          sm: "9px 10px",
          md: "10px 17px",
          lg: "12px 20px",
        },
        borderRadius: "5px",
        background: Colors.orange,
        color: "white",
        "&:hover": {
          background: Colors.orangeHover,
        },
        border: "none",
        outline: "none",
        cursor: "pointer",
        fontSize: { xs: "12px", sm: "14px", md: "16px" },
        fontWeight: 600,
        textTransform: "uppercase",
        ...FlexBox,
      }}
    >
      {text}
      {loading && (
        <CircularProgress
          color="inherit"
          sx={{ marginLeft: "10px" }}
          size={18}
        />
      )}
    </Box>
  );
};

export default SubmitBtn;

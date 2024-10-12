import { AuthContext } from "@/context";
import { Colors } from "@/utils/consts";
import { translate } from "@/utils/functions";
import { FlexBox } from "@/utils/globalStyles";
import { CircularProgress, Typography } from "@mui/material";
import { ReactElement, useContext } from "react";

type Props = {
  setPage: () => void;
  loading?: boolean;
};

const ShoweMoreBtn = ({ setPage, loading }: Props): ReactElement => {
  const { lang } = useContext(AuthContext);
  return (
    <Typography
      sx={{
        ...FlexBox,
        textAlign: "center",
        padding: "7px 10px",
        color: "white",
        background: Colors.orange,
        margin: "20px auto",
        borderRadius: "10px",
        cursor: "pointer",
      }}
      onClick={setPage}
    >
      {translate("btn.more", lang)}
      {loading && (
        <CircularProgress
          color="inherit"
          sx={{ marginLeft: "10px" }}
          size={18}
        />
      )}
    </Typography>
  );
};

export default ShoweMoreBtn;

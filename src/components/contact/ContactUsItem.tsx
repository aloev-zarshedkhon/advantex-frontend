import { Colors } from "@/utils/consts";
import { Grid, Typography } from "@mui/material";
import Link from "next/link";
import { ReactElement } from "react";

type Props = {
  icon: ReactElement;
  url: string;
  label: string;
  content: string;
};

const ContactUsItem = ({ icon, url, label, content }: Props): ReactElement => {
  return (
    <Grid
      container
      sx={{
        width: {
          xs: "100%",
          lg: "80%",
        },
        background: "#ffffff",
        marginBottom: "11px",
        WebkitBoxShadow: "0px 8px 35px 10px #E8E8E8",
        boxShadow: "0px 8px 35px 10px #E8E8E8",
        padding: { xs: "10px", sm: "10px 25px" },
        borderRadius: "10px",
      }}
    >
      <Grid
        item
        xs={1}
        sx={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          "& svg": {
            width: "25px",
            height: "25px",
          },
        }}
      >
        {icon}
      </Grid>
      <Grid item xs={10}>
        <Typography sx={{ color: Colors.headerBorder }}>{label}</Typography>
        <Typography
          sx={{
            "& a": {
              textDecoration: "none",
              fontSize: "16px",
              fontFamily: '"Muli", sans-serif',
              color: "#636363",
              fontWeight: 400,
              lineHeight: "26px",
            },
          }}
        >
          <Link href={url}>{content}</Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ContactUsItem;

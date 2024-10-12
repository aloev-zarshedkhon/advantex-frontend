import { Grid, SxProps } from "@mui/material";
import { ReactElement } from "react";

type Props = {
  sx?: SxProps;
  children?: React.ReactNode;
  md?: number;
  lg?: number;
};

const GridWrapper = ({ sx, children, md, lg }: Props): ReactElement => {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={md ?? 4}
      lg={lg ?? 4}
      sx={{
        padding: { xs: "10px", md: "20px 10px" },
        margin: { xs: "0 auto", sm: 0 },
        ...sx,
      }}
    >
      {children}
    </Grid>
  );
};

export default GridWrapper;

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import { SxProps } from "@mui/material";

type Props = {
  sx?: SxProps;
};

function CardSkeleton({ sx }: Props) {
  return (
    <Card sx={{ maxWidth: { xs: "100%", sm: 350 }, m: 2, ...sx }}>
      <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      <CardContent>
        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={10} width="80%" />
      </CardContent>
    </Card>
  );
}

export default CardSkeleton;

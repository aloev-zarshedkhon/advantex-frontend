import * as React from "react";
import Card from "@mui/material/Card";
import Skeleton from "@mui/material/Skeleton";
import { CardHeader, SxProps } from "@mui/material";

type Props = {
  sx?: SxProps;
};

function ProfileSkeleton({ sx }: Props) {
  return (
    <Card sx={{ maxWidth: "100%", m: 2, ...sx }}>
      <CardHeader
        avatar={
          <Skeleton
            animation="wave"
            variant="circular"
            width={150}
            height={150}
          />
        }
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />
    </Card>
  );
}

export default ProfileSkeleton;

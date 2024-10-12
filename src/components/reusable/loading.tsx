import CircularProgress from "@mui/material/CircularProgress";
import { Stack, SxProps } from "@mui/material";

type Props = {
  sx?: SxProps;
};

export default function Loading({ sx }: Props) {
  return (
    <Stack sx={{ margin: "200px auto", ...sx }}>
      <CircularProgress />
    </Stack>
  );
}

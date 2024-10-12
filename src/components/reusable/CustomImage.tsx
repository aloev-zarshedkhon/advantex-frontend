import { Colors } from "@/utils/consts";
import { Stack, SxProps } from "@mui/system";
import Image from "next/image";
import { CSSProperties, useState } from "react";

interface HeroProps {
  sx?: SxProps;
  alt?: string;
  src: string;
  width?: number;
  height?: number;
  imageStyle?: CSSProperties;
  disableSpin?: boolean;
}

export default function CustomImage({
  sx,
  alt,
  src,
  width,
  height,
  imageStyle,
  disableSpin,
}: HeroProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = "/images/default.png";
  };

  return (
    <Stack
      sx={{
        zIndex: 0,
        ...sx,
      }}
    >
      <Image
        src={src}
        alt={alt || "this is picture"}
        width={width || 100}
        height={height || 100}
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          backgroundImage: loading
            ? disableSpin
              ? `url('https://i.stack.imgur.com/kOnzy.gif') center/100px 100px no-repeat`
              : `url(${Colors.headerBorder}) center/cover no-repeat`
            : "none",
          ...imageStyle,
        }}
        priority
        unoptimized
        onError={handleImageError}
        onLoadingComplete={() => setLoading(false)}
      />
    </Stack>
  );
}

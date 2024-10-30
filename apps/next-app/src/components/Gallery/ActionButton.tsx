import { Button } from "@mui/material";

interface Props {
  onClick: () => void;
  text: string;
  bgColor?: string;
  color?: string;
  hoverBgColor?: string;
}

export function ActionButton({
  onClick,
  text,
  bgColor,
  color,
  hoverBgColor,
}: Props) {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      sx={{
        m: {xs:1, md:2},
        backgroundColor: bgColor,
        color: color,
        "&:hover": { backgroundColor: hoverBgColor },
      }}
    >
      {text}
    </Button>
  );
}

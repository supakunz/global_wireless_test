import { Button } from "@mui/material";

const ChartLegend = ({ active, label, color, onHandleClick }) => {
  return (
    <Button
      variant={active ? "contained" : "text"}
      size="small"
      onClick={() => onHandleClick(label.toLowerCase())}
      color={color}
      sx={{ minWidth: "auto" }}
    >
      {label}
    </Button>
  );
};

export default ChartLegend;

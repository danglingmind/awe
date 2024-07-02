import { CSSProperties } from "react";

export const containerStyle: CSSProperties = {
  margin: 0,
  padding: 0,
  // width: "80vw",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, 250px)",
  gridAutoRows: "10px",
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  justifyContent: "center",
  // backgroundColor: "black",
};

export const cardStyles: { [key: string]: CSSProperties } = {
  card: {
    position: "relative",
    margin: "15px 10px",
    padding: "1rem",
    // overflow: "hidden",
    borderRadius: "8px",
    // boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.5)",
  },
  xsmall: {
    gridRowEnd: "span 22",
  },
  small: {
    gridRowEnd: "span 26",
  },
  medium: {
    gridRowEnd: "span 38",
  },
  large: {
    gridRowEnd: "span 45",
  },
};

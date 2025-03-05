import React, { ReactNode } from "react";
import { COLORS } from "../../constants";

const Title = ({ children, custom }: { children: ReactNode; custom?: any }) => {
  return (
    <h1
      className={`py-3 text-6xl text-center ${custom}`}
      style={{ color: COLORS.Yellow }}
    >
      {children}
    </h1>
  );
};

export default Title;

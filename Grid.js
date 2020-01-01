import React from "react";
import styled from "@emotion/styled";

const Grid = props => (
  <div className="container">
    <div className="grid-row">{props.children}</div>
  </div>
);
export default Grid;

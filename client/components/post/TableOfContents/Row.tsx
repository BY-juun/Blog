import React from "react";
import styles from "./styles.module.scss";
import classnames from "classnames";
interface RowProps {
  onClick: (topic: HTMLElement) => () => void;
  tocElement: HTMLElement;
  idx: number;
  isActive: boolean;
}

function Row({ onClick, tocElement, idx, isActive }: RowProps) {
  return (
    <nav
      id={String(idx)}
      className={classnames(
        styles.Row,
        isActive ? [styles.activeToc] : [styles.inActiveToc]
      )}
      style={RowMarginLeftStyle[tocElement.tagName]}
      onClick={onClick(tocElement)}
    >
      {tocElement?.innerText}
    </nav>
  );
}

interface RowMarginLeftStyleInterface {
  [key: string]: { marginLeft: string };
}

const RowMarginLeftStyle: RowMarginLeftStyleInterface = {
  H1: { marginLeft: "0" },
  H2: { marginLeft: "25px" },
  H3: { marginLeft: "25px" },
};

export default Row;

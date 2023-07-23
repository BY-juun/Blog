import React, { ReactNode } from "react";

interface Props<Case extends string> {
  caseBy: Partial<Record<Case, ReactNode | null>>;
  value: Case;
  defaultComponent?: JSX.Element | null;
}

const SwitchCase = <Case extends string>({
  value,
  caseBy,
  defaultComponent: defaultComponent = null,
}: Props<Case>) => {
  if (value == null) {
    return defaultComponent;
  }

  return caseBy[value] ?? defaultComponent;
};

export default SwitchCase;

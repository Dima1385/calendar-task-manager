import React, { useState } from "react";
import { Holiday } from "../../types/index.js";
import { HolidayBadgeWrapper } from "./styles.js";

interface Props {
  holiday: Holiday;
}

export const HolidayBadge: React.FC<Props> = ({ holiday }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <HolidayBadgeWrapper
      $expanded={expanded}
      onClick={() => setExpanded((prev) => !prev)}
      title={expanded ? "" : holiday.name}
    >
      {holiday.localName}
    </HolidayBadgeWrapper>
  );
};

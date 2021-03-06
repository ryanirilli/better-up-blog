// @flow

import { css } from "emotion";

export const BASE_SPACING_UNIT = 4;
export const MAX_WIDTH = 1440;

const BREAKPOINTS = {
  small: 0,
  medium: 768,
  large: 1024,
  xLarge: MAX_WIDTH
};

export const getBreakpointNameFromWidth = (width: number): string => {
  if (width < BREAKPOINTS.medium) {
    return "small";
  }
  if (width < BREAKPOINTS.large) {
    return "medium";
  }
  if (width < BREAKPOINTS.xLarge) {
    return "large";
  }
  return "xLarge";
};

export const MQ = Object.keys(BREAKPOINTS).reduce((accumulator, label) => {
  accumulator[label] = (style: string): string =>
    css`
      @media (min-width: ${BREAKPOINTS[label]}px) {
        ${style};
      }
    `;
  return accumulator;
}, {});

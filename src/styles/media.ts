import { CSSProp, css } from 'styled-components';

type MediaQueryProps = {
  mobile: number;
  tablet: number;
  desktop: number;
};

const sizes: MediaQueryProps = {
  mobile: 600,
  tablet: 768,
  desktop: 1284,
};

type BackQuoteArgs = string[];

// literals로 css 속성 받아 CSSProp값으로 리턴한다.
const media = {
  mobile: (literals: TemplateStringsArray, ...args: BackQuoteArgs): CSSProp =>
    css`
      @media only screen and (max-width: ${sizes.mobile}px) {
        ${css(literals, ...args)}
      }
    `,
  tablet: (literals: TemplateStringsArray, ...args: BackQuoteArgs): CSSProp =>
    css`
      @media only screen and (max-width: ${sizes.tablet}px) {
        ${css(literals, ...args)}
      }
    `,
  desktop: (literals: TemplateStringsArray, ...args: BackQuoteArgs): CSSProp =>
    css`
      @media only screen and (max-width: ${sizes.desktop}px) {
        ${css(literals, ...args)}
      }
    `,
} as Record<
  keyof typeof sizes,
  (l: TemplateStringsArray, ...p: BackQuoteArgs) => CSSProp
>;

export default media;

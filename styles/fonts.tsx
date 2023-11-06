const CSS_FONTS = `@import url(/fonts/Gilroy/font.css);
body {
font-family: Gilroy;
}`;

/*
, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
 */
export const Fonts = (): JSX.Element => <style>{CSS_FONTS}</style>;

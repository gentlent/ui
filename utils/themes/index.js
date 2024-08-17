import { colors } from './vars';

const themes = {
  light: {
    // TODO: Include most colors used on sites
    // TODO: Include most sizes used on sites
    primary: colors.black,
    secondary: colors['blue-400'],
    borderColor: colors['gray-200'],

    navBackground: colors.white,
    navTextColor: colors.black,
    footerBackground: colors.black,
    footerTextColor: colors.white,
    backgroundColor: colors.white,
    secondaryBackgroundColor: colors['gray-100'],
    textColor: colors['gray-800'],
    linkColor: colors['blue-600'],

    sidebarBackground: colors.white,
    sidebarHoverBackground: colors['gray-100'],
    sidebarActiveBackground: colors['gray-200'],
    sidebarActivePressedBackground: colors['gray-300'],
    sidebarBorderColor: colors['gray-100'],
    sidebarPageBackground: colors.white,
    sidebarTextColor: colors.black,

    baseSize: 64,
    baseSpacingSize: 8,
    baseFontSize: 15 / 16, // 14px or 15px?
    baseLineHeight: 1.5,
    baseBorderRadius: 8,
    baseBorderRadiusSmall: 6,
  },
};

themes.default = themes.light;

export default themes;

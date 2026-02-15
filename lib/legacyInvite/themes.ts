type SvgColor = `#${string}` | `rgb(${string})` | `rgba(${string})` | string;
export const InviteThemeKeys = ["light", "dark"] as const;
export type InviteThemes = typeof InviteThemeKeys[number];

export interface Theme {
  background: SvgColor;
  textPrimary: SvgColor;
  textSecondary: SvgColor;
  dotOnline: SvgColor;
  dotMembers: SvgColor;
  iconBackground: SvgColor;
  acronymText: SvgColor;
  buttonBackground: SvgColor;
  buttonText: SvgColor;
  badge: {
    flowerStar: SvgColor;
    icon: SvgColor;
  }
}

export const Themes: Record<InviteThemes, Theme> = {
  dark: {
    background: "#2F3136",
    textPrimary: "#FFFFFF",
    textSecondary: "#B9BBBE",
    dotOnline: "#3BA55C",
    dotMembers: "#767F8C",
    iconBackground: "#3B3E43",
    acronymText: "#DCDDDE",
    buttonText: "#FFFFFF",
    buttonBackground: "#3BA55C",
    badge: {
      flowerStar: "#FFFFFF",
      icon: "#4E5058",
    }
  },
  light: {
    background: "#F2F3F5",
    textPrimary: "#060607",
    textSecondary: "#4F5660",
    dotOnline: "#3BA55C",
    dotMembers: "#767F8C",
    iconBackground: "#FFFFFF",
    acronymText: "#2E3338",
    buttonText: "#FFFFFF",
    buttonBackground: "#3BA55C",
    badge: {
      flowerStar: "#4E5058",
      icon: "#FFFFFF",
    }
  },
}
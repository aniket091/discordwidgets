type SvgColor = `#${string}` | `rgb(${string})` | `rgba(${string})` | string;
export const InviteThemeKeys = ["light", "dark", "ash", "onyx"] as const;
export type InviteThemes = typeof InviteThemeKeys[number];

export interface Theme {
  stroke: SvgColor;  
  background: SvgColor;
  textPrimary: SvgColor;
  textSecondary: SvgColor;
  iconStroke: SvgColor;
  iconBackground: SvgColor;
  acronymText: SvgColor;
  dotOnline: SvgColor;
  dotMembers: SvgColor;
  tagStroke: SvgColor;
  tagBackground: SvgColor;
  buttonText: SvgColor;
  buttonStroke: SvgColor;
  buttonBackground: SvgColor;
  badge: {
    flowerStar: SvgColor;
    icon: SvgColor;
  }
}

export const Themes: Record<InviteThemes, Theme> = {
  light: {
    stroke: "#E2E2E4",
    background: "#FFFFFF",
    textPrimary: "#2F3142",
    textSecondary: "#63667A",
    iconStroke: "#F2F4F6",
    iconBackground: "#E4E4E4",
    acronymText: "#2F3142",
    dotOnline: "#3D9E60",
    dotMembers: "#5F6276",
    tagStroke: "#707074",
    tagBackground: "#FFFFFF",
    buttonText: "#FFFFFF",
    buttonStroke: "#148F54",
    buttonBackground: "#008545",
    badge: {
      flowerStar: "#4E5058",
      icon: "#FFFFFF",
    }
  },
  dark: {
    stroke: "#323237",
    background: "#242429",
    textPrimary: "#FBFBFB",
    textSecondary: "#ABACB2",
    iconStroke: "#2C2D32",
    iconBackground: "#121214",
    acronymText: "#FBFBFB",
    dotOnline: "#3D9E60",
    dotMembers: "#9D9EA5",
    tagStroke: "#69696F",
    tagBackground: "#242429",
    buttonText: "#FFFFFF", 
    buttonStroke: "#148F54",
    buttonBackground: "#008545",
    badge: {
      flowerStar: "#FFFFFF",
      icon: "#4E5058",
    }
  },
  ash: {
    stroke: "#44454C",
    background: "#393A41",
    textPrimary: "#FFFFFF",
    textSecondary: "#C4C7D3",
    iconStroke: "#3F4048",
    iconBackground: "#2C2D32",
    acronymText: "#FFFFFF",
    dotOnline: "#3D9E60",
    dotMembers: "#9EA3B8",
    tagStroke: "#A5A6AC",
    tagBackground: "#393A41",
    buttonText: "#FFFFFF", 
    buttonStroke: "#148F54",
    buttonBackground: "#008545",
    badge: {
      flowerStar: "#FFFFFF",
      icon: "#4E5058",
    }
  },
  onyx: {
    stroke: "#2D2E31",
    background: "#131416",
    textPrimary: "#E3E4EC",
    textSecondary: "#9EA3B8",
    iconStroke: "#1E1F22",
    iconBackground: "#000000",
    acronymText: "#E3E4EC",
    dotOnline: "#3D9E60",
    dotMembers: "#9EA3B8",
    tagStroke: "#9B9CA4",
    tagBackground: "#131416",
    buttonText: "#FFFFFF", 
    buttonStroke: "#148F54",
    buttonBackground: "#008545",
    badge: {
      flowerStar: "#FFFFFF",
      icon: "#4E5058",
    }
  },
}
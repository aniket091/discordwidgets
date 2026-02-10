export const InviteThemeKeys = ['light', 'dark', 'ash', 'onyx'] as const;
export type InviteThemes = typeof InviteThemeKeys[number];

export interface Theme {
  background: string;
  stroke: string;
  iconBackground: string;
  acronymBackground: string;
  textPrimary: string;
  textSecondary: string;
  onlineDot: string;
  memberDot: string;
  tagBackground: string;
  tagStroke: string;
  buttonBackground: string;
  buttonStroke: string;
  buttonText: string;
}

export const Themes: Record<InviteThemes, Theme> = {
  light: {
    background: '#FFFFFF',
    stroke: '#E2E2E4',
    iconBackground: '#F2F4F6',
    acronymBackground: '#E4E4E4',
    textPrimary: '#2F3035',
    textSecondary: '#5F606A',
    onlineDot: '#3D9E60',
    memberDot: "#5F606A",
    tagBackground: "#FFFFFF",
    tagStroke: "#A5A5A6",
    buttonBackground: "#008545",
    buttonStroke: '#148F54',
    buttonText: '#FFFFFF',    
  },
  dark: {
    background: '#242429',
    stroke: '#323237',
    iconBackground: '#2C2D32',
    acronymBackground: '#121214',
    textPrimary: '#FBFBFB',
    textSecondary: '#9D9EA5',
    onlineDot: '#3D9E60',
    memberDot: "#9D9EA5",
    tagBackground: "#242429",
    tagStroke: "#404041",
    buttonBackground: "#008545",
    buttonStroke: '#148F54',
    buttonText: '#FFFFFF', 
  },
  ash: {
    background: '#393A41',
    stroke: '#44454C',
    iconBackground: '#3F4048',
    acronymBackground: '#2C2D32',
    textPrimary: '#FFFFFF',
    textSecondary: '#9D9EA5',
    onlineDot: '#3D9E60',
    memberDot: "#9D9EA5",
    tagBackground: "#393A41",
    tagStroke: '#5E5F62',
    buttonBackground: "#008545",
    buttonStroke: '#148F54',
    buttonText: '#FFFFFF', 
  },
  onyx: {
    background: '#131416',
    stroke: '#2D2E31',
    iconBackground: '#1E1F22',
    acronymBackground: '#000000',
    textPrimary: '#E4E4E6',
    textSecondary: '#9D9EA5',
    onlineDot: '#3D9E60',
    memberDot: "#9D9EA5",
    tagBackground: "#131416",
    tagStroke: '#3D3E40',
    buttonBackground: "#008545",
    buttonStroke: '#148F54',
    buttonText: '#FFFFFF', 
  },
}
import { APIInviteGuild, GuildFeature } from "discord-api-types/v10";
import * as consts from "./consts";

interface FeatureBadgeOptions {
  guild: APIInviteGuild;
  badgeX: number;
  theme?: "light" | "dark";
}

export function FeatureBadge({ guild, badgeX, theme = "dark" }: FeatureBadgeOptions) {
  if (guild.features.includes(GuildFeature.Verified)) {
    return (`
      <g transform="translate(${badgeX}, 118)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="${consts.FeatureBadgePaths.flowerStar}" fill="#43A25A" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="${consts.FeatureBadgePaths.verified}" fill="#fff" />
      </g>
    `);
  } 
  else if (guild.features.includes(GuildFeature.Partnered)) {
    return (`
      <g transform="translate(${badgeX}, 118)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="${consts.FeatureBadgePaths.flowerStar}" fill="#5865F2" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="${consts.FeatureBadgePaths.partnered1}" fill="#fff" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="${consts.FeatureBadgePaths.partnered2}" fill="#fff" />
      </g>
    `);
  }
  else if (guild.features.includes(GuildFeature.Discoverable) || guild.features.includes(GuildFeature.Community)) {
    const icon = guild.features.includes(GuildFeature.Discoverable) ? consts.FeatureBadgePaths.discovery : consts.FeatureBadgePaths.community;
    const isBoosted = (guild.premium_subscription_count || 0) > 0;
    const backColor = isBoosted ? "url(#FeatureBadgeGradient)" : (theme === "light" ? "#fff" : "#4E5058");
    const iconColor = isBoosted ? "#fff" : (theme === "light" ? "#4E5058" : "#fff");

    return (`
      <g transform="translate(${badgeX}, 118)">
        ${isBoosted ? `<defs>${consts.FeatureBadgeGradient}</defs>` : ""}
        <path fill-rule="evenodd" clip-rule="evenodd" d="${consts.FeatureBadgePaths.flowerStar}" fill="${backColor}" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="${icon}" fill="${iconColor}" />
      </g>
    `);
  }

  return "";
}

export function BannerGradient(color: keyof typeof consts.BannerGradients) {
  const gradient = consts.BannerGradients[color] || consts.BannerGradients["default"];
  return (`
    <radialGradient id="BannerGradient" cx="0.501" cy="1.2705" r="1.0543" fx="0.501" fy="1.2705">
      <stop offset="0.2065" stop-color="${gradient.color1}" />
      <stop offset="0.8516" stop-color="${gradient.color2}" />
    </radialGradient>
  `);
}

export function GuildBanner(banner: string | null) {
  if (banner) return `<image x="1" y="1" width="300" height="72" preserveAspectRatio="xMidYMid slice" href="${banner}" clip-path="url(#clip-banner)" />`;
  return `<rect x="1" y="1" width="300" height="72" fill="url(#BannerGradient)" clip-path="url(#clip-banner)" />`;
}
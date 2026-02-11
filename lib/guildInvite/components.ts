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
    const backColor = isBoosted ? "url(#feature-badge-gradient)" : (theme === "light" ? "#fff" : "#4E5058");
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
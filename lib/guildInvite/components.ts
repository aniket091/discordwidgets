import { APIInviteGuild, GuildFeature } from "discord-api-types/v10";
import * as C from "./consts";

interface FeatureBadgeOptions {
  guild: APIInviteGuild;
  theme?: "light" | "dark";
  x: number;
  y: number;
}

export function FeatureBadge({ guild, x, y, theme = "dark" }: FeatureBadgeOptions) {
  let badge = "";
  if (guild.features.includes(GuildFeature.Verified)) {
    badge = (`
      <path fill-rule="evenodd" clip-rule="evenodd" d="${C.BadgePaths.flowerStar}" fill="${C.BadgeColors.verified.flowerStar}" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="${C.BadgePaths.verified}" fill="${C.BadgeColors.verified.icon}" />
    `);
  }
  else if (guild.features.includes(GuildFeature.Partnered)) {
    badge = (`
      <path fill-rule="evenodd" clip-rule="evenodd" d="${C.BadgePaths.flowerStar}" fill="${C.BadgeColors.partnered.flowerStar}" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="${C.BadgePaths.partnered}" fill="${C.BadgeColors.partnered.icon}" />
    `);
  }
  else if (guild.features.includes(GuildFeature.Discoverable) || guild.features.includes(GuildFeature.Community)) {
    const icon = guild.features.includes(GuildFeature.Discoverable) ? C.BadgePaths.discovery : C.BadgePaths.community;
    const isBoosted = (guild.premium_subscription_count || 0) > 0;
    const themeObj = C.Themes[theme === "light" ? "light" : "dark"];
    badge = (`
      ${isBoosted ? `<defs>${C.BadgeGradient}</defs>` : ""}
      <path fill-rule="evenodd" clip-rule="evenodd" d="${C.BadgePaths.flowerStar}" fill="${isBoosted ? C.BadgeColors.default.flowerStar : themeObj.badge.flowerStar}" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="${icon}" fill="${isBoosted ? C.BadgeColors.default.icon : themeObj.badge.icon}" />
    `);
  }

  return badge.length ? (`
    <g transform="translate(${x}, ${y})">
      ${badge}
    </g>
  `) : "";
}
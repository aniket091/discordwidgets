import { createFontRenderer, safeFetchImage, getAcronym, formatNumber, getCreationDate } from "../utils";
import { BannerGradient, FeatureBadge, GuildBanner } from "./components";
import { ResolvedGuildInvite } from "../services/discord";
import { InviteThemes, Themes } from "./themes";
import { promises as fs } from "fs";
import * as consts from "./consts";
import path from "path";


interface Options {
  theme: InviteThemes;
}

export default async function GuildInvite(data: ResolvedGuildInvite, options: Options) {
  const theme = Themes[options.theme] || Themes["dark"];

  const invite = data.invite;
  const guild = data.invite.guild;
  const profile = data.invite.profile;
  if (!guild) throw new Error("Guild not found.");

  const fontDir = path.join(process.cwd(), "lib/fonts");
  const [boldFont, semiFont, medFont, icon, banner, clanBadge] = await Promise.all([
    fs.readFile(path.join(fontDir, "ggsans-bold.ttf")).then(buf => createFontRenderer(buf)),
    fs.readFile(path.join(fontDir, "ggsans-semibold.ttf")).then(buf => createFontRenderer(buf)),
    fs.readFile(path.join(fontDir, "ggsans-medium.ttf")).then(buf => createFontRenderer(buf)),
    safeFetchImage(data.urls.icon),
    safeFetchImage(data.urls.banner),
    safeFetchImage(data.urls.clanBadge),
  ]);

  const onlineStr = `${formatNumber(invite.approximate_presence_count)} Online`;
  const membersStr = `${formatNumber(invite.approximate_member_count)} Members`;
  const profileColor = (profile?.brand_color_primary || "default") as keyof typeof consts.BannerGradients; 
  
  const badgeOffset = Math.min(boldFont.measure(guild.name, 16), 200) + 22;
  const membersGrpOffset = consts.PADDING_X + 8 + medFont.measure(onlineStr, 14) + 10; // padding + circle + text + gap
  const rawDescLines = guild.description?.length ? Math.min(Math.ceil(guild.description.length / 50), consts.DESC_MAX_LINES) : 0;

  const DESC_HEIGHT = rawDescLines > 0 ? (rawDescLines * consts.DESC_LINE_HEIGHT) : 0;
  const BTN_START_Y = consts.DESC_START_Y + DESC_HEIGHT + 10;
  const CARD_HEIGHT = BTN_START_Y + 50; 
  
  let descPathData = "";
  let isDescTruncated = false;
  if (guild.description && rawDescLines > 0) {
    const res = medFont.renderMultiline(guild.description, { 
      x: consts.PADDING_X, 
      y: consts.DESC_START_Y,
      fontSize: consts.DESC_FONT_SIZE,
      color: theme.textSecondary,
      maxWidth: consts.DESC_MAX_WIDTH,
      maxLines: consts.DESC_MAX_LINES,
      lineHeight: consts.DESC_LINE_HEIGHT,
    });
    descPathData = res.pathData;
    isDescTruncated = res.wasTruncated;
  }


  const renderIcon = () => {
    if (icon) return `<image x="21" y="43" width="64" height="64" href="${icon}" clip-path="url(#clip-icon)" />`;
    return (`
      <g>
        <rect x="21" y="43" width="64" height="64" rx="18" fill="${theme.acronymBackground}" />
        ${boldFont.render(getAcronym(guild.name), { x: 53, y: 75, fontSize: consts.ACRONYM_FONT_SIZE, color: theme.textPrimary, textAnchor: "middle", dominantBaseline: "middle" })}
      </g>
    `);
  }

  const renderGuildTag = () => {
    if (!profile?.tag) return "";
    const tag = profile.tag;

    const textWidth = boldFont.measure(tag, consts.TEXT_FONT_SIZE);
    const totalWidth = 6 + 14 + 4 + textWidth + 6; // padding + icon + gap + text + padding
    const tagX = 6 + 14 + 4; // padding + icon + gap

    return (`
      <g transform="translate(${consts.CARD_WIDTH - totalWidth - 18}, 82)">
        <rect width="${totalWidth}" height="20" rx="4" stroke-width="0.5" stroke="${theme.tagStroke}" fill="${theme.tagBackground}" />
        ${clanBadge ? `<image x="6" y="3" width="14" height="14" href="${clanBadge}" />` : ""}
        ${boldFont.render(tag, { x: tagX, y: 10, fontSize: consts.TEXT_FONT_SIZE, color: theme.textPrimary, dominantBaseline: "middle" })}
      </g>
    `);
  }

  return (`
    <svg width="${consts.CARD_WIDTH}" height="${CARD_HEIGHT}" viewBox="0 0 ${consts.CARD_WIDTH} ${CARD_HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <clipPath id="clip-banner"><path d="M1 17C1 8.16344 8.16344 1 17 1H285C293.837 1 301 8.16344 301 17V73H1V17Z" /></clipPath>
        <clipPath id="clip-icon"><rect x="21" y="43" width="64" height="64" rx="18" /></clipPath>
        ${banner ? "" : BannerGradient(profileColor)}
        <linearGradient id="desc-fade-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.6" stop-color="white" stop-opacity="1"/>
          <stop offset="1" stop-color="white" stop-opacity="0"/>
        </linearGradient>
        <mask id="desc-fade-mask">
          <rect x="${consts.PADDING_X}" y="${consts.DESC_START_Y}" width="${consts.DESC_MAX_WIDTH}" height="${DESC_HEIGHT}" fill="url(#desc-fade-grad)"/>
        </mask>
      </defs>

      <rect x="0.5" y="0.5" width="${consts.CARD_WIDTH - 1}" height="${CARD_HEIGHT - 1}" rx="15.5" fill="${theme.background}" stroke="${theme.stroke}"/>
      ${GuildBanner(banner)}
      ${renderGuildTag()}

      <rect x="${consts.PADDING_X}" y="40" width="70" height="70" rx="20" fill="${theme.iconBackground}"/>
      ${renderIcon()}

      ${boldFont.render(guild.name, { x: consts.PADDING_X, y: 132, fontSize: consts.TITLE_FONT_SIZE, color: theme.textPrimary })}
      ${FeatureBadge({ guild, badgeX: badgeOffset, theme: (options.theme === "light" ? "light" : "dark") })}

      <circle cx="22" cy="147" r="4" fill="${theme.onlineDot}"/>
      ${medFont.render(onlineStr, { x: 30, y: 152, fontSize: consts.TEXT_FONT_SIZE, color: theme.textSecondary })}
      
      <g transform="translate(${membersGrpOffset}, 0)">
        <circle cx="4" cy="147" r="4" fill="${theme.memberDot}"/>
        ${medFont.render(membersStr, { x: 12, y: 152, fontSize: consts.TEXT_FONT_SIZE, color: theme.textSecondary })}
      </g>

      ${medFont.render(getCreationDate(guild.id), { x: consts.PADDING_X, y: 170, fontSize: consts.TEXT_FONT_SIZE, color: theme.textSecondary })}
      <g ${isDescTruncated ? `mask="url(#desc-fade-mask)"` : ""}>${descPathData}</g>

      <a href="https://discord.gg/${invite.code}" target="_blank">
        <rect x="${consts.PADDING_X}" y="${BTN_START_Y}" width="${consts.BUTTON_WIDTH}" height="${consts.BUTTON_HEIGHT}" rx="8" fill="${theme.buttonBackground}" stroke="${theme.buttonStroke}"/>
        ${semiFont.render("Join Server", { 
          x: consts.PADDING_X + (consts.BUTTON_WIDTH / 2), 
          y: BTN_START_Y + (consts.BUTTON_HEIGHT / 2), 
          fontSize: consts.BUTTON_FONT_SIZE, 
          color: theme.buttonText,
          textAnchor: "middle", 
          dominantBaseline: "middle" 
        })}
      </a>
    </svg>
  `);
}
import { safeFetchImage, getAcronym, formatNumber, getCreationDate } from "../utils";
import { ResolvedGuildInvite } from "../services/invite";
import { getFontFamily } from "../fonts/registry";
import { FeatureBadge } from "./components";
import * as C from "./consts";


interface Options {
  theme: C.InviteThemes;
  hideTag?: boolean;
}

export default async function GuildInvite(data: ResolvedGuildInvite, options: Options) {
  const theme = C.Themes[options.theme] || C.Themes["dark"];

  const { guild, profile } = data.invite;
  if (!guild) return "";

  const { bold, semibold, medium } = getFontFamily("ggsans");
  const [icon, banner, clanBadge] = await Promise.all([
    safeFetchImage(data.urls.icon),
    safeFetchImage(data.urls.banner),
    safeFetchImage(data.urls.clanBadge),
  ]);


  const buttonText = "Join Server";
  const onlineStr = `${formatNumber(data.invite.approximate_presence_count)} Online`;
  const membersStr = `${formatNumber(data.invite.approximate_member_count)} Members`;

  const profileColor = (profile?.brand_color_primary || options.theme) as keyof typeof C.BannerGradients;
  const gradient = C.BannerGradients[profileColor] || C.BannerGradients[options.theme];


  const desc = guild.description ? medium.renderMultiline(guild.description, {
    x: C.PADDING, 
    y: C.DESC_START_Y,
    fontSize: C.DESC_FONT_SIZE,
    fill: theme.textSecondary,
    maxWidth: C.DESC_MAX_WIDTH,
    maxLines: C.DESC_MAX_LINES,
    lineHeight: C.DESC_LINE_HEIGHT,
  }) : null;

  let tagBlock = "";
  if (profile?.tag) {
    const textWidth = bold.measure(profile.tag, C.TEXT_FONT_SIZE);
    const totalWidth = C.TAG_PADDING + C.TAG_ICON_SIZE + C.TAG_ICON_MARGIN + textWidth + C.TAG_PADDING;
    const tagX = C.TAG_PADDING + C.TAG_ICON_SIZE + C.TAG_ICON_MARGIN;

    tagBlock = (`
      <g transform="translate(${C.CARD_WIDTH - totalWidth - C.PADDING}, ${C.BANNER_HEIGHT + 10})">
        <rect width="${totalWidth}" height="${C.TAG_HEIGHT}" rx="4" stroke-width="0.5" stroke="${theme.tagStroke}" fill="${theme.tagBackground}" />
        ${clanBadge ? `<image x="6" y="3" width="${C.TAG_ICON_SIZE}" height="${C.TAG_ICON_SIZE}" href="${clanBadge}" />` : ""}
        ${bold.render(profile.tag, { x: tagX, y: C.TAG_HEIGHT/2, fontSize: C.TEXT_FONT_SIZE, fill: theme.textPrimary, dominantBaseline: "middle" })}
      </g>
    `);
  }


  const DESC_HEIGHT = desc && desc.lineCount > 0 ? (desc.lineCount * C.DESC_LINE_HEIGHT) : 0;
  const BTN_START_Y = C.DESC_START_Y + DESC_HEIGHT + 10;

  const CARD_WIDTH = C.CARD_WIDTH;
  const CARD_HEIGHT = BTN_START_Y + C.BUTTON_HEIGHT + C.PADDING; 
  const START_X = C.PADDING;

  const ICON_START_X = START_X + C.ICON_STROKE;
  const ICON_START_Y = C.ICON_STROKE_START_Y + C.ICON_STROKE;

  const onlineTextWidth = medium.measure(onlineStr, C.TEXT_FONT_SIZE);
  const serverNameWidth = bold.measure(guild.name, C.NAME_FONT_SIZE);
  const MEMBERS_GRP_OFFSET = C.PRESENCE_DOT_RADIUS * 2 + onlineTextWidth + 10; // circle + text + gap


  return (`
    <svg width="${CARD_WIDTH}" height="${CARD_HEIGHT}" viewBox="0 0 ${CARD_WIDTH} ${CARD_HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>${guild.name}</title>
      <defs>
        <clipPath id="icon-clip"><rect x="21" y="43" width="${C.ICON_SIZE}" height="${C.ICON_SIZE}" rx="18" /></clipPath>
        <clipPath id="banner-clip"><path d="M1 17C1 8.16344 8.16344 1 17 1H285C293.837 1 301 8.16344 301 17V73H1V17Z" /></clipPath>

        ${desc?.wasTruncated ? (`
          ${C.DescGradient}
          <mask id="desc-mask">
            <rect x="${START_X}" y="${C.DESC_START_Y}" width="${C.DESC_MAX_WIDTH}" height="${DESC_HEIGHT}" fill="url(#desc-gradient)"/>
          </mask>
        `) : ""}

        ${banner ? "" : `
          <radialGradient id="banner-gradient" cx="50%" cy="107%" r="105%">
            <stop offset="20.65%" stop-color="${gradient.color1}" />
            <stop offset="85.16%" stop-color="${gradient.color2}" />
          </radialGradient>
        `}
      </defs>


      <rect x="0.5" y="0.5" width="${CARD_WIDTH - 1}" height="${CARD_HEIGHT - 1}" rx="16" fill="${theme.background}" stroke="${theme.stroke}"/>
      ${banner 
        ? `<image x="1" y="1" width="${C.CARD_WIDTH - 2}" height="${C.BANNER_HEIGHT}" href="${banner}" preserveAspectRatio="xMidYMid slice" clip-path="url(#banner-clip)" />`
        : `<rect x="1" y="1" width="${C.CARD_WIDTH - 2}" height="${C.BANNER_HEIGHT}" fill="url(#banner-gradient)" clip-path="url(#banner-clip)" />`
      }
      ${options.hideTag === true ? "" : tagBlock}

      <rect x="${START_X}" y="${C.ICON_STROKE_START_Y}" width="${C.ICON_SIZE + C.ICON_STROKE * 2}" height="${C.ICON_SIZE + C.ICON_STROKE * 2}" rx="20" fill="${theme.iconStroke}"/>
      ${icon 
        ? `<image x="${ICON_START_X}" y="${ICON_START_Y}" width="${C.ICON_SIZE}" height="${C.ICON_SIZE}" href="${icon}" clip-path="url(#icon-clip)" />`
        : (`
          <g>
            <rect x="${ICON_START_X}" y="${ICON_START_Y}" width="${C.ICON_SIZE}" height="${C.ICON_SIZE}" rx="18" fill="${theme.iconBackground}" />
            ${bold.render(getAcronym(guild.name), { 
              x: ICON_START_X + (C.ICON_SIZE / 2), 
              y: ICON_START_Y + (C.ICON_SIZE / 2), 
              fontSize: C.ACRONYM_FONT_SIZE, 
              fill: theme.acronymText, 
              textAnchor: "middle", 
              dominantBaseline: "middle" 
            })}
          </g>
        `)
      }
      
      <g>
        ${bold.render(guild.name, { x: START_X, y: C.NAME_CENTER_Y, fontSize: C.NAME_FONT_SIZE, fill: theme.textPrimary, dominantBaseline: "middle" })}
        ${FeatureBadge({ guild, x: START_X + serverNameWidth + 6, y: C.NAME_CENTER_Y - 9, theme: (options.theme === "light" ? "light" : "dark") })}
      </g>

      <g transform="translate(${START_X}, ${C.PRESENCE_CENTER_Y})">
        <circle cx="${C.PRESENCE_DOT_RADIUS}" cy="0" r="${C.PRESENCE_DOT_RADIUS}" fill="${theme.dotOnline}"/>
        ${medium.render(onlineStr, { x: C.PRESENCE_DOT_MARGIN, y: 0, fontSize: C.TEXT_FONT_SIZE, fill: theme.textSecondary, dominantBaseline: "middle" })}

        <circle cx="${MEMBERS_GRP_OFFSET + C.PRESENCE_DOT_RADIUS}" cy="0" r="${C.PRESENCE_DOT_RADIUS}" fill="${theme.dotMembers}"/>
        ${medium.render(membersStr, { x: MEMBERS_GRP_OFFSET + C.PRESENCE_DOT_MARGIN, y: 0, fontSize: C.TEXT_FONT_SIZE, fill: theme.textSecondary, dominantBaseline: "middle" })}
      </g>
      
      ${medium.render(getCreationDate(guild.id), { x: START_X, y: C.EST_START_Y, fontSize: C.TEXT_FONT_SIZE, fill: theme.textSecondary })}
      
      <g ${desc?.wasTruncated ? `mask="url(#desc-mask)"` : ""}>${desc?.pathData || ""}</g>

      <a href="https://discord.gg/${data.invite.code}" target="_blank">
        <rect x="${START_X}" y="${BTN_START_Y}" width="${C.BUTTON_WIDTH}" height="${C.BUTTON_HEIGHT}" rx="8" fill="${theme.buttonBackground}" stroke="${theme.buttonStroke}"/>
        ${semibold.render(buttonText, { 
          x: START_X + (C.BUTTON_WIDTH / 2), 
          y: BTN_START_Y + (C.BUTTON_HEIGHT / 2), 
          fontSize: C.BUTTON_FONT_SIZE, 
          fill: theme.buttonText,
          textAnchor: "middle", 
          dominantBaseline: "middle" 
        })}
      </a>
    </svg>
  `);
}
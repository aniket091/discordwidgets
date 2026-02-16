import { formatNumber, getAcronym, safeFetchImage } from "../utils";
import { ResolvedGuildInvite } from "../services/invite";
import { getFontFamily } from "../fonts/registry";
import { FeatureBadge } from "./components";
import * as C from "./consts";


interface Options {
  theme: C.InviteThemes;
  useBanner: boolean;
}

export default async function LegacyInvite(data: ResolvedGuildInvite, options: Options) {
  const theme = C.Themes[options.theme] || C.Themes["dark"];

  const { guild } = data.invite;
  if (!guild) return "";

  const { bold, semibold, medium } = getFontFamily("whitney");
  const [icon, banner] = await Promise.all([
    safeFetchImage(data.urls.icon),
    safeFetchImage(options.useBanner ? data.urls.banner : data.urls.splash),
  ]);


  const buttonText = "Join";
  const title = "YOU'VE BEEN INVITED TO JOIN A SERVER";
  const onlineStr = `${formatNumber(data.invite.approximate_presence_count)} Online`;
  const membersStr = `${formatNumber(data.invite.approximate_member_count)} Members`;


  const CARD_WIDTH = C.CARD_WIDTH;
  const CARD_HEIGHT = C.CARD_HEIGHT + (banner ? C.BANNER_HEIGHT : 0);
  
  const START_X = C.PADDING;
  const START_Y = C.PADDING + (banner ? C.BANNER_HEIGHT : 0);
  const CONTENT_START_Y = START_Y + C.CONTENT_START_Y;

  const onlineTextWidth = medium.measure(onlineStr, C.PRESENCE_FONT_SIZE);
  const MEMBERS_GRP_OFFSET = C.PRESENCE_DOT_SIZE + C.PRESENCE_DOT_MARGIN_RIGHT + onlineTextWidth + C.PRESENCE_TEXT_MARGIN_RIGHT;
  const serverNameWidth = semibold.measure(guild.name, 16);


  return (`
    <svg width="${CARD_WIDTH}" height="${CARD_HEIGHT}" viewBox="0 0 ${CARD_WIDTH} ${CARD_HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>${guild.name}</title>
      <defs>
        <clipPath id="icon-clip"><rect x="${START_X}" y="${CONTENT_START_Y}" width="${C.ICON_SIZE}" height="${C.ICON_SIZE}" rx="16" /></clipPath>
        <clipPath id="banner-clip"><path d="M0 4C0 1.79086 1.79086 0 4 0H426C428.209 0 430 1.79086 430 4V60H0V4Z" /></clipPath>
      </defs>

      <rect width="${CARD_WIDTH}" height="${CARD_HEIGHT}" rx="4" fill="${theme.background}" />
      ${banner ? `<image x="0" y="0" width="${CARD_WIDTH}" height="${C.BANNER_HEIGHT}" href="${banner}" clip-path="url(#banner-clip)" preserveAspectRatio="xMidYMid slice" />` : ""}
      ${bold.render(title, { x: START_X, y: START_Y, fontSize: C.TITLE_FONT_SIZE, fill: theme.textSecondary, dominantBaseline: "hanging" })}

      ${icon 
        ? `<image x="${START_X}" y="${CONTENT_START_Y}" width="${C.ICON_SIZE}" height="${C.ICON_SIZE}" href="${icon}" clip-path="url(#icon-clip)" />`
        : (`
          <g>
            <rect x="${START_X}" y="${CONTENT_START_Y}" width="${C.ICON_SIZE}" height="${C.ICON_SIZE}" rx="16" fill="${theme.iconBackground}" />
            ${semibold.render(getAcronym(guild.name), {
              x: START_X + (C.ICON_SIZE / 2),
              y: CONTENT_START_Y + (C.ICON_SIZE / 2),
              fill: theme.textPrimary, 
              fontSize: C.ICON_FONT_SIZE, 
              textAnchor: "middle", 
              dominantBaseline: "middle" 
            })}
          </g>
        `)
      }

      <g transform="translate(${START_X + C.ICON_SIZE + C.PADDING}, ${CONTENT_START_Y})">
        <g>
          ${semibold.render(guild.name, { x: 0, y: 6, fontSize: C.NAME_FONT_SIZE, fill: theme.textPrimary, dominantBaseline: "hanging" })}
          ${FeatureBadge({ guild, theme: options.theme, x: serverNameWidth + 6, y: 8 })}
        </g>

        <g transform="translate(0, ${C.PRESENCE_CENTER_Y})">
          <circle cx="${C.PRESENCE_DOT_SIZE/2}" cy="0" r="${C.PRESENCE_DOT_SIZE/2}" fill="${theme.dotOnline}" />
          ${medium.render(onlineStr, {
            x: C.PRESENCE_DOT_SIZE + C.PRESENCE_DOT_MARGIN_RIGHT,
            y: 0,
            fontSize: C.PRESENCE_FONT_SIZE,
            fill: theme.textSecondary,
            dominantBaseline: "middle"
          })}

          <circle cx="${MEMBERS_GRP_OFFSET + C.PRESENCE_DOT_SIZE/2}" cy="0" r="${C.PRESENCE_DOT_SIZE/2}" fill="${theme.dotMembers}" />
          ${medium.render(membersStr, {
            x: MEMBERS_GRP_OFFSET + C.PRESENCE_DOT_SIZE + C.PRESENCE_DOT_MARGIN_RIGHT,
            y: 0,
            fontSize: C.PRESENCE_FONT_SIZE,
            fill: theme.textSecondary,
            dominantBaseline: "middle"
          })}
        </g>
      </g>

      <a href="https://discord.gg/${data.invite.code}" target="_blank">
        <rect 
          x="${CARD_WIDTH - C.PADDING - C.BUTTON_WIDTH}" 
          y="${CONTENT_START_Y + ((C.ICON_SIZE - C.BUTTON_HEIGHT)/2)}" 
          width="${C.BUTTON_WIDTH}" 
          height="${C.BUTTON_HEIGHT}" 
          rx="3" 
          fill="${theme.buttonBackground}" 
        />
        ${semibold.render(buttonText, {
           x: CARD_WIDTH - C.PADDING - (C.BUTTON_WIDTH / 2),
           y: CONTENT_START_Y + ((C.ICON_SIZE - C.BUTTON_HEIGHT)/2) + (C.BUTTON_HEIGHT/2),
           fontSize: 14,
           fill: theme.buttonText,
           textAnchor: "middle",
           dominantBaseline: "middle"
        })}
      </a>
    </svg>
  `);
}




import { APIGuildWidget, APIInvite, APIInviteGuild, GuildFeature, RouteBases } from "discord-api-types/v10";

// Not documented yet, but present in the api response
export interface NewAPIInvite extends APIInvite {
  guild?: APIInviteGuild & {
    premium_tier: number;
  }
  profile?: {
    id: string;
    name: string;
    icon_hash: string | null;
    member_count: number;
    online_count: number;
    description: string | null;
    banner_hash: string | null;
    brand_color_primary: string | undefined;
    game_application_ids: string[];
    game_activity: object;
    tag: string | null;
    badge: number;
    badge_color_primary: string;
    badge_color_secondary: string;
    badge_hash: string | null;
    traits: object[];
    features: GuildFeature[];
    visibility: number;
    custom_banner_hash: string | null;
    premium_subscription_count: number;
    premium_tier: number;
  }
}

export interface ResolvedGuildInvite {
  invite: NewAPIInvite;
  urls: {
    icon: string | null;
    banner: string | null;
    clanBadge: string | null;
  }
}


const snowflakeRegex = /^\d{17,20}$/;
const inviteRegex = /(?:https?:\/\/)?(?:www\.)?(?:discord\.gg\/|discord(?:app)?\.com\/invite\/)?([a-zA-Z0-9-]{2,255})/i;

export async function resolveGuildInvite(query: string, animate: boolean = true): Promise<ResolvedGuildInvite | null> {
  let inviteUrl = query;

  if (snowflakeRegex.test(query)) {
    const widget = await fetchGuildWidget(query);
    const match = widget?.instant_invite?.match(inviteRegex);
    if (match) inviteUrl = match[0];
  }

  const inviteMatch = inviteUrl.match(inviteRegex);
  const code = inviteMatch ? inviteMatch[1] : null;
  if (!code) return null;
  const apiInvite = await fetchGuildInvite(code);

  return apiInvite ? {
    invite: apiInvite,
    urls: {
      icon: apiInvite.guild ? guildIconUrl(apiInvite.guild.id, apiInvite.guild.icon, animate) : null,
      banner: apiInvite.guild ? guildBannerUrl(apiInvite.guild.id, apiInvite.guild.banner, animate) : null,
      clanBadge: apiInvite.guild && apiInvite.profile ? guildClanBadgeUrl(apiInvite.guild.id, apiInvite.profile.badge_hash) : null,
    }
  } : null;
}


async function fetchGuildInvite(code: string): Promise<NewAPIInvite | null> {
  const result = await fetch(`${RouteBases.api}/invites/${code}?with_counts=true`);
  return result.ok ? result.json() : null;
}

async function fetchGuildWidget(guildId: string): Promise<APIGuildWidget | null> {
  const result = await fetch(`${RouteBases.api}/guilds/${guildId}/widget.json`);
  return result.ok ? result.json() : null;
}

function guildIconUrl(guildId: string, hash?: string | null, animate: boolean = true) {
  return hash ? `${RouteBases.cdn}/icons/${guildId}/${hash}${animate && hash.startsWith("a_") ? ".gif" : ".png"}?size=128` : null;
}

function guildBannerUrl(guildId: string, hash?: string | null, animate: boolean = true) {
  return hash ? `${RouteBases.cdn}/banners/${guildId}/${hash}${animate && hash.startsWith("a_") ? ".gif" : ".png"}?size=480` : null;
}

function guildClanBadgeUrl(guildId: string, hash?: string | null) {
  return hash ? `${RouteBases.cdn}/clan-badges/${guildId}/${hash}.png` : null;
}
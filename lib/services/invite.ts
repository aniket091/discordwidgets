import { APIGuildWidget, APIInvite, GuildFeature, RouteBases } from "discord-api-types/v10";

// Not documented yet, but present in the api response
export interface NewAPIInvite extends APIInvite {
  profile?: {
    id: string;
    name: string;
    icon_hash: string | null;
    member_count: number;
    online_count: number;
    description: string | null;
    banner_hash: string | null;
    brand_color_primary?: string | null;
    game_application_ids: string[];
    game_activity: Record<string, unknown>;
    tag: string | null;
    badge: number;
    badge_color_primary: string;
    badge_color_secondary: string;
    badge_hash: string | null;
    traits: Record<string, unknown>[];
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
    splash: string | null;
    clanBadge: string | null;
  }
}


const snowflakeRegex = /^\d{17,20}$/;
const inviteRegex = /^(?:https?:\/\/)?(?:www\.)?(?:discord\.gg\/|discord(?:app)?\.com\/invite\/)?([a-zA-Z0-9-]{2,255})$/i;

async function fetchGuildInvite(code: string): Promise<NewAPIInvite | null> {
  const result = await fetch(`${RouteBases.api}/invites/${code}?with_counts=true`, { next: { revalidate: 120 } });
  if (!result.ok) return null;
  try {
    return await result.json();
  } catch {
    return null;
  }
}

async function fetchGuildWidget(guildId: string): Promise<APIGuildWidget | null> {
  const result = await fetch(`${RouteBases.api}/guilds/${guildId}/widget.json`, { next: { revalidate: 120 } });
  if (!result.ok) return null;
  try {
    return await result.json();
  } catch {
    return null;
  }
}

function guildIconUrl(guildId: string, hash?: string | null, animate: boolean = true): string | null {
  return hash ? `${RouteBases.cdn}/icons/${guildId}/${hash}${animate && hash.startsWith("a_") ? ".gif" : ".png"}?size=128` : null;
}

function guildBannerUrl(guildId: string, hash?: string | null, animate: boolean = true): string | null {
  return hash ? `${RouteBases.cdn}/banners/${guildId}/${hash}${animate && hash.startsWith("a_") ? ".gif" : ".png"}?size=480` : null;
}

function guildSplashUrl(guildId: string, hash?: string | null): string | null {
  return hash ? `${RouteBases.cdn}/splashes/${guildId}/${hash}.png?size=480` : null;
}

function guildClanBadgeUrl(guildId: string, hash?: string | null): string | null {
  return hash ? `${RouteBases.cdn}/clan-badges/${guildId}/${hash}.png` : null;
}

export async function resolveGuildInvite(query: string, animate: boolean = true): Promise<ResolvedGuildInvite | null> {
  let inviteUrl = query;

  if (snowflakeRegex.test(query)) {
    const widget = await fetchGuildWidget(query);
    const match = widget?.instant_invite?.match(inviteRegex);
    if (match) inviteUrl = match[0];
  }

  const code = inviteUrl.match(inviteRegex)?.[1];
  if (!code) return null;

  const apiInvite = await fetchGuildInvite(code);
  if (!apiInvite) return null;

  const guild = apiInvite.guild;
  const profile = apiInvite.profile;
  return {
    invite: apiInvite,
    urls: {
      icon: guild ? guildIconUrl(guild.id, guild.icon, animate) : null,
      banner: guild ? guildBannerUrl(guild.id, guild.banner, animate) : null,
      splash: guild ? guildSplashUrl(guild.id, guild.splash) : null,
      clanBadge: guild && profile ? guildClanBadgeUrl(guild.id, profile.badge_hash) : null,
    }
  };
}
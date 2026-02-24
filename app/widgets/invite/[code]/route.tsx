import { InviteThemeKeys as CurrentThemeKeys, InviteThemes as CurrentThemes } from "@/lib/guildInvite/consts";
import { InviteThemeKeys as LegacyThemeKeys, InviteThemes as LegacyThemes } from "@/lib/legacyInvite/consts";
import { resolveGuildInvite } from "@/lib/services/discord";
import { redis } from "@/lib/services/redis";
import { NextRequest } from "next/server";
import GuildInvite from "@/lib/guildInvite";
import LegacyInvite from "@/lib/legacyInvite";


type Props = {
  params: Promise<{ code: string }>
};

export const runtime = "nodejs";
export async function GET(req: NextRequest, props: Props) {
  try {
    const { code } = await props.params;
    if (!code) {
      return new Response("Missing invite code", { status: 400 });
    }

    const params = req.nextUrl.searchParams;
    const notrack = getBool(params.get("notrack"), false);
    const themeName = params.get("theme")?.toLowerCase();
    const style = params.get("style")?.toLowerCase() === "legacy" ? "legacy" : "current";

    const animate = getBool(params.get("animate"), true);
    const useBanner = getBool(params.get("usebanner"), true);
    const hideTag = getBool(params.get("hidetag"), false);

    
    const invite = await resolveGuildInvite(code, animate);
    if (!invite || !invite?.invite?.guild) {
      return new Response("Invite not found", { status: 404 });
    }

    let svg = "";
    if (style === "legacy") {
      const theme = (LegacyThemeKeys as readonly string[]).includes(themeName || "") ? (themeName as LegacyThemes) : "dark";
      svg = await LegacyInvite(invite, { theme, useBanner });
    } else {
      const theme = (CurrentThemeKeys as readonly string[]).includes(themeName || "") ? (themeName as CurrentThemes) : "dark";
      svg = await GuildInvite(invite, { theme, hideTag });
    }

    if (!notrack) {
      try {
        redis.incr('widgets:created').catch(() => null);
        redis.sadd('widgets:invites', invite.invite.code).catch(() => null);
      } catch {};
    }
 

    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      }
    });
  } catch (error) {
    console.error("[Invite API Error]:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}


function getBool(param: string | null, defaultValue = true) {
  if (param === null) return defaultValue;
  return param.toLowerCase() !== "false";
}
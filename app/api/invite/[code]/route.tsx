import { InviteThemeKeys as CurrentThemeKeys, InviteThemes as CurrentThemes } from "@/lib/guildInvite/consts";
import { InviteThemeKeys as LegacyThemeKeys, InviteThemes as LegacyThemes } from "@/lib/legacyInvite/consts";
import { resolveGuildInvite } from "@/lib/services/invite";
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

    const searchParams = req.nextUrl.searchParams;
    // shared params
    const animate = getBool(searchParams.get("animate"), true);
    const style = searchParams.get("style")?.toLowerCase() === "legacy" ? "legacy" : "current";
    const themeName = searchParams.get("theme")?.toLowerCase();
    // legacy params
    const useBanner = getBool(searchParams.get("usebanner"), true);
    // current params
    const hideTag = getBool(searchParams.get("hidetag"), false);

    
    const invite = await resolveGuildInvite(code, animate);
    if (!invite || !invite?.invite?.guild) {
      return new Response("Invite not found", { status: 404 });
    }


    let svg = "";
    if (style === "legacy") {
      const theme = (LegacyThemeKeys as readonly string[]).includes(themeName || "") ? (themeName as LegacyThemes) : "dark";
      svg = await LegacyInvite(invite, { theme, useBanner });
    }
    else {
      const theme = (CurrentThemeKeys as readonly string[]).includes(themeName || "") ? (themeName as CurrentThemes) : "dark";
      svg = await GuildInvite(invite, { theme, hideTag });
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
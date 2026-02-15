import { InviteThemeKeys, InviteThemes } from "@/lib/legacyInvite/consts";
import { resolveGuildInvite } from "@/lib/services/discord";
import LegacyInvite from "@/lib/legacyInvite"; 
import { NextRequest } from "next/server";

export const runtime = "nodejs";

type Props = {
  params: Promise<{ code: string }>
};

export async function GET(req: NextRequest, props: Props) {
  try {
    const { code } = await props.params;
    if (!code) {
      return new Response("Missing invite code", { status: 400 });
    }

    const searchParams = req.nextUrl.searchParams;
    const animate = searchParams.get("animate")?.toLowerCase() !== "false";
    const useSplash = searchParams.get("splash")?.toLowerCase() !== "false";

    const themeParam = searchParams.get("theme")?.toLowerCase();
    const theme = (InviteThemeKeys as readonly string[]).includes(themeParam || "")  ? (themeParam as InviteThemes) : "dark";

    const invite = await resolveGuildInvite(code, animate);
    if (!invite || !invite?.invite?.guild) {
      return new Response("Invite not found", { status: 404 });
    }

    const svg = await LegacyInvite(invite, { theme, useSplash });
    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      }
    });
  } catch (error) {
    console.error("[Legacy Invite API Error]:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
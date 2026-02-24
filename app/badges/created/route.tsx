import { redis } from "@/lib/services/redis";


export async function GET() {
  const created = await redis.get<number>('widgets:created').catch(() => 0) ?? 0;
  
  const LEFT = 166;
  const RIGHT = Math.floor(Math.max(38, String(created).length * 18));
  const WIDTH = LEFT + RIGHT;


  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="35" viewBox="0 0 ${WIDTH} 35">
    <rect width="${LEFT}" height="35" fill="#31C4F3"/>
    <rect x="${LEFT}" width="${RIGHT}" height="35" fill="#389AD5"/>

    <text 
      x="${LEFT / 2}" y="17.5" dy="0.35em" fill="#FFFFFF" font-size="12" text-anchor="middle" letter-spacing="2" font-weight="600" font-family="Roboto, sans-serif"
    >WIDGETS CREATED</text>
    <text 
      x="${LEFT + RIGHT / 2}" y="17.5" dy="0.35em" fill="#FFFFFF" font-size="12" text-anchor="middle" letter-spacing="2" font-weight="900" font-family="Montserrat, sans-serif"
    >${created}</text>
  </svg>`;


  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=90",
    },
  });
}
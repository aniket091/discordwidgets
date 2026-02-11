const brackets = new Set(["[", "(", "{"]);
const acronymRegex = /\[[^\]]+\]|\([^\)]+\)|\{[^\}]+\}|\w+/g;

export function getAcronym(name: string | undefined) {
  if (!name) return "";
  const parts = name.match(acronymRegex);
  if (!parts) return "";

  let acronym = "";
  for (const part of parts) {
    if (acronym.length >= 4) break;
    const firstChar = part[0];

    if (brackets.has(firstChar)) {
      if (part.length > 2) {
        acronym += `${firstChar}${part[1]}${part[part.length - 1]}`;
      }
    } else {
      acronym += firstChar;
    }
  }
  return acronym;
}

export function getCreationDate(snowflake?: string | null) {
  if (!snowflake) return "";
  try {
    const DISCORD_EPOCH = BigInt("1420070400000");
    const idBigInt = BigInt(snowflake);
    const timestamp = (idBigInt >> BigInt(22)) + DISCORD_EPOCH;
    const date = new Date(Number(timestamp));
    return `Est. ${date.toLocaleString("en-US", { month: "short" })} ${date.getFullYear()}`;
  } catch { return ""; }
}

export function formatNumber(num: number | undefined | null) {
  if (typeof num !== "number") return "0";
  return num.toLocaleString("en-US");
}

async function fetchAsBuffer(url: string | URL): Promise<{ buffer: ArrayBuffer; mime: string; } | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) return null;
    const mime = res.headers.get("content-type") || "image/png";
    const buffer = await res.arrayBuffer();
    return { buffer, mime };
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function toB64(data: { buffer: ArrayBuffer; mime: string; }) {
  if (!data) return null;
  return `data:${data.mime};base64,${Buffer.from(data.buffer).toString("base64")}`;
}

export async function safeFetchImage(url: string | null) {
  if (!url) return null;
  return await fetchAsBuffer(url).then(result => result ? toB64(result) : null);
}
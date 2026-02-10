export * from "./text";

const acronymRegex = /\[[^\]]+\]|\([^\)]+\)|\{[^\}]+\}|\w+/g;
export function getAcronym(name: string | undefined) {
  if (!name) return "";
  const parts = name.match(acronymRegex);
  if (!parts) return "";

  let acronym = "";
  for (const part of parts) {
    if (acronym.length >= 4) break;
    const firstChar = part[0];

    if (["[", "(", "{"].includes(firstChar)) {
      if (part.length > 2) {
        acronym += `${firstChar}${part[1]}${part[part.length - 1]}`;
      }
    } else {
      acronym += firstChar;
    }
  }

  return acronym;
}

export async function fetchAsBuffer(url: string | URL): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch (e) {
    console.error(`Failed to fetch asset: ${url}`, e);
    return null;
  }
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

export function toB64(buffer: ArrayBuffer | null) {
  return buffer ? `data:image/png;base64,${Buffer.from(buffer).toString("base64")}` : null;
}

export function safeFetchImage(url: string | null) {
  return url ? fetchAsBuffer(url).then(toB64).catch(() => null) : Promise.resolve(null);
}
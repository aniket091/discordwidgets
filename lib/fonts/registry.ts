import { createFontRenderer, FontRenderer } from "./renderer";
import path from "path";
import fs from "fs";

type FontFamily = "ggsans" | "whitney";
interface FontSet {
  bold: FontRenderer;
  semibold: FontRenderer;
  medium: FontRenderer;
}

const fontCache: Partial<Record<FontFamily, FontSet>> = {};
function loadFont(file: string): FontRenderer {
  const fontPath = path.join(process.cwd(), "assets/fonts", file);
  const buffer = fs.readFileSync(fontPath);
  return createFontRenderer(buffer);
}


export function getFontFamily(family: FontFamily): FontSet {
  if (fontCache[family]) return fontCache[family]!;

  let fonts: FontSet;
  switch(family) {
    case "ggsans":
      fonts = {
        bold: loadFont("ggsans-bold.ttf"),
        semibold: loadFont("ggsans-semibold.ttf"),
        medium: loadFont("ggsans-medium.ttf"),
      };
      break;
    case "whitney":
      fonts = {
        bold: loadFont("whitney-bold.ttf"),
        semibold: loadFont("whitney-semibold.ttf"),
        medium: loadFont("whitney-medium.ttf"),
      };
      break;
  }

  fontCache[family] = fonts;
  return fonts;
}
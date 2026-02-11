import { createFontRenderer, FontRenderer } from "./renderer";
import path from "path";
import fs from "fs";

interface FontMap {
  bold: FontRenderer;
  semibold: FontRenderer;
  medium: FontRenderer;
}


let fonts: FontMap | null = null;
function loadFonts(): FontMap {
  const fontDir = path.join(process.cwd(), "assets/fonts");
  return {
    bold: createFontRenderer(fs.readFileSync(path.join(fontDir, "ggsans-bold.ttf"))),
    semibold: createFontRenderer(fs.readFileSync(path.join(fontDir, "ggsans-semibold.ttf"))),
    medium: createFontRenderer(fs.readFileSync(path.join(fontDir, "ggsans-medium.ttf"))),
  };
}


export function getFonts(): FontMap {
  if (!fonts) {
    fonts = loadFonts();
  }
  return fonts;
}
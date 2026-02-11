import { parse, Font } from "opentype.js";

interface TextOptions {
  x: number;
  y: number;
  fontSize: number;
  color: `#${string}` | `rgb(${string})` | `rgba(${string})` | string;
  textAnchor?: "start" | "middle" | "end";
  dominantBaseline?: "alphabetic" | "middle" | "hanging" | "ideographic";
}

interface MultilineOptions extends TextOptions {
  maxWidth: number;
  lineHeight: number;
  maxLines: number;
}

export interface FontRenderer {
  measure: (text: string, fontSize: number) => number;
  render: (text: string, options: TextOptions) => string;
  renderMultiline: (text: string, options: MultilineOptions) => { pathData: string; wasTruncated: boolean; lineCount: number; };
}


export function createFontRenderer(buffer: Buffer): FontRenderer {
  const arrayBuffer = toArrayBuffer(buffer);
  let font: Font;

  try {
    font = parse(arrayBuffer);
  } catch (e) {
    console.error("Failed to parse font", e);
    return {
      measure: () => 0,
      render: () => "",
      renderMultiline: () => ({ pathData: "", wasTruncated: false, lineCount: 0 })
    };
  }

  return {
    measure: (text: string, fontSize: number) => {
      if (!text) return 0;
      return font.getAdvanceWidth(text, fontSize);
    },

    render: (text: string, options: TextOptions) => {
      if (!text) return "";
      
      let { x, y } = options;
      const { fontSize, color } = options;
      const scale = fontSize / font.unitsPerEm;
      const textAnchor = options.textAnchor ?? "start";
      const dominantBaseline = options.dominantBaseline ?? "alphabetic";

      // Horizontal Alignment
      if (textAnchor !== "start") {
        const width = font.getAdvanceWidth(text, fontSize);
        if (textAnchor === "middle") x -= width / 2;
        else if (textAnchor === "end") x -= width;
      }

      // Vertical Alignment
      switch (dominantBaseline) {
        case "middle": y += (font.ascender + font.descender) * scale / 2; break;
        case "hanging": y += font.ascender * scale; break;
        case "ideographic": y += font.descender * scale; break;
      }

      const path = font.getPath(text, x, y, fontSize);
      return `<path d="${path.toPathData(2)}" fill="${color}" />`;
    },

    renderMultiline: (text: string, options: MultilineOptions) => {
      if (!text) return { pathData: "", wasTruncated: false, lineCount: 0 };

      const words = text.trim().split(/\s+/);
      let lines: string[] = [];
      let currentLine = words[0] || "";

      for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const testLine = currentLine + " " + word;
        const testWidth = font.getAdvanceWidth(testLine, options.fontSize);

        if (testWidth <= options.maxWidth) {
          currentLine = testLine;
        } else {
          // Check for massive word
          if (font.getAdvanceWidth(word, options.fontSize) > options.maxWidth) {
            if(currentLine) lines.push(currentLine);
            currentLine = "";
            // Aggressive char wrap
            let tempSegment = "";
            for(const char of word) {
              if(font.getAdvanceWidth(tempSegment + char, options.fontSize) <= options.maxWidth) {
                tempSegment += char;
              } else {
                if (tempSegment) lines.push(tempSegment);
                tempSegment = char;
              }
            }
            currentLine = tempSegment;
          } else {
            lines.push(currentLine);
            currentLine = word;
          }
        }
      }
      if(currentLine) lines.push(currentLine);

      let wasTruncated = false;
      if (lines.length > options.maxLines) {
        wasTruncated = true;
        lines = lines.slice(0, options.maxLines);
      }

      const pathData = lines.map((line, index) => {
        const lineY = options.y + (index * options.lineHeight) + options.fontSize - 3; 
        const path = font.getPath(line, options.x, lineY, options.fontSize);
        return `<path d="${path.toPathData(2)}" fill="${options.color}" />`;
      }).join("");

      return { pathData, wasTruncated, lineCount: lines.length };
    }
  };
}

function toArrayBuffer(b: Buffer): ArrayBuffer {
  return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer;
}
import { Readable } from 'stream';

export interface VectorFile<F = VectorFormat> {
  location: string;
  filename: string;
  format: F;
}

export interface VectorFileStream<F = VectorFormat> extends VectorFile<F> {
  stream: Readable;
}

export enum VectorFormat {
  Dxf = "dxf",
  Dwg = "dwg",
  Eps = "eps",
  Pdf = "pdf",
  Ai = "ai",
  Svg = "svg",
}

export const vectorExtensionToFormat = (extension: string): VectorFormat => {
  switch (extension) {
    case "dxf":
      return VectorFormat.Dxf;
    case "dwg":
      return VectorFormat.Dwg;
    case "eps":
      return VectorFormat.Eps;
    case "pdf":
      return VectorFormat.Pdf;
    case "ai":
      return VectorFormat.Ai;
    case "svg":
    default:
      return VectorFormat.Svg;
  }
};

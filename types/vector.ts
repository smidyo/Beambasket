import { Readable } from 'stream';

export interface VectorFile<F = VectorFormat> {
  stream: Readable;
  filename: string;
  format: F;
}

export enum VectorFormat {
  Dxf = "dxf",
  Dwg = "dwg",
  Eps = "eps",
  Pdf = "pdf",
  Ai = "ai",
  Svg = "svg",
}

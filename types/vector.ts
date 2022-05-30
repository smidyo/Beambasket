export interface VectorFile<F = VectorFormat> {
  filePath: string;
  fileName: string;
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

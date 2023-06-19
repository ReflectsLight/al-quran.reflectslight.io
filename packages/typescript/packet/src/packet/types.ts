export interface Packet {
  fetch: () => Promise<PacketTarget> | null
}

export type PacketTarget = {
  scripts: HTMLElement[]
  stylesheets: HTMLElement[]
  images: HTMLElement[]
  fonts: FontFace[]
  others: HTMLElement[]
}

export interface PacketSpec {
  scripts: string[]
  stylesheets: string[]
  images: string[]
  fonts: Array<[string, string]>
  others: string[]
  onprogress?: (percent: number) => any
}

export type PackageItem = HTMLElement | FontFace;

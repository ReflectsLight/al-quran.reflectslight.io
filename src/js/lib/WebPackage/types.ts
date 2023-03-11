export interface WebPackage {
  fetch: () => Promise<Package>
}

export interface Package {
  scripts: HTMLElement[]
  stylesheets: HTMLElement[]
  images: HTMLElement[]
  fonts: FontFace[]
  others: HTMLElement[]
}

export interface PackageSpec {
  scripts: string[]
  stylesheets: string[]
  images: string[]
  fonts: Array<[string, string]>
  others: string[]
  onprogress?: (percent: number) => any
}

export type PackageItem = HTMLElement | FontFace;

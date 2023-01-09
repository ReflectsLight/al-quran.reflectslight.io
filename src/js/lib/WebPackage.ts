import {
  WebPackage,
  PackageSpec,
  Package,
  ReporterFunction,
} from './WebPackage/types';
import FontLoader from './WebPackage/FontLoader';
import ImageLoader from './WebPackage/ImageLoader';
import CSSLoader from './WebPackage/CSSLoader';
import ScriptLoader from './WebPackage/ScriptLoader';
import OtherLoader from './WebPackage/OtherLoader';

export default function (pkgspec: PackageSpec): WebPackage {
  const self: WebPackage = Object.create(null);
  const pkg: Package = { fonts: [], images: [], stylesheets: [], scripts: [], others: [] };
  const { fonts, images, stylesheets, scripts, others, onprogress } = pkgspec;
  const total = [...fonts, ...images, ...stylesheets, ...scripts].length;

  let index = 0;
  const reporter: ReporterFunction = (el) => {
    index++;
    if (onprogress && index <= total) {
      onprogress(100 * (index / total));
    }
    return el;
  };

  let fetcher: Promise<Package> | null = null;
  self.fetch = () => {
    if (fetcher) {
      return fetcher;
    } else {
      fetcher = FontLoader(fonts, reporter)
                .then((fonts: FontFace[]) => pkg.fonts.push(...fonts))
                .then(() => ImageLoader(images, reporter))
                .then((images: HTMLElement[]) => pkg.images.push(...images))
                .then(() => CSSLoader(stylesheets, reporter))
                .then((stylesheets: HTMLElement[]) => pkg.stylesheets.push(...stylesheets))
                .then(() => ScriptLoader(scripts, reporter))
                .then((scripts: HTMLElement[]) => pkg.scripts.push(...scripts))
                .then(() => OtherLoader(others, reporter))
                .then((others: HTMLElement[]) => pkg.others.push(...others))
                .then(() => pkg);
      return fetcher;
    }
  };

  return self;
}

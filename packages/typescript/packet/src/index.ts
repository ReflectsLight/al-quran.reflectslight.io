import {
  Packet,
  PacketSpec,
  PacketTarget,
} from './packet/types';
import {
  image,
  stylesheet,
  script,
  other,
  font
} from './packet/loaders';

export type { Packet, PacketSpec, PacketTarget };

export default function (pkgspec: PacketSpec) {
  const self: Packet = Object.create(null);
  const pkg: PacketTarget = { fonts: [], images: [], stylesheets: [], scripts: [], others: [] };
  const { fonts, images, stylesheets, scripts, others, onprogress } = Object.assign({}, pkg, pkgspec);
  const total = [...fonts, ...images, ...stylesheets, ...scripts, ...others].length;

  let index = 0;
  const reporter = <T>(el: T) => {
    index++;
    if (onprogress && index <= total) {
      onprogress(100 * (index / total));
    }
    return el;
  };

  let fetcher: Promise<PacketTarget> | null = null;
  self.fetch = () => {
    if (fetcher) {
      return fetcher;
    } else {
      fetcher = font(fonts, reporter)
                .then((fonts: FontFace[]) => pkg.fonts.push(...fonts))
                .then(() => image(images, reporter))
                .then((images: HTMLElement[]) => pkg.images.push(...images))
                .then(() => stylesheet(stylesheets, reporter))
                .then((stylesheets: HTMLElement[]) => pkg.stylesheets.push(...stylesheets))
                .then(() => script(scripts, reporter))
                .then((scripts: HTMLElement[]) => pkg.scripts.push(...scripts))
                .then(() => other(others, reporter))
                .then((others: HTMLElement[]) => pkg.others.push(...others))
                .then(() => pkg);
      return fetcher;
    }
  };

  return self;
}

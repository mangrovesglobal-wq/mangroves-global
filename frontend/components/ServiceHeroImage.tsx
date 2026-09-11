import Image from "next/image";

type ServiceHeroImageProps = {
  src: string;
  alt: string;
  /** true = Laravel-hosted (CMS-uploaded), rendered as a plain <img> since
   * next/image's optimizer 400s on this host. false = local /public asset,
   * optimized normally via next/image. */
  remote: boolean;
};

export default function ServiceHeroImage({ src, alt, remote }: ServiceHeroImageProps) {
  if (remote) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- Laravel-hosted image; next/image optimizer 400s on this host
      <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority
      sizes="(max-width: 1024px) 100vw, 1024px"
      className="object-cover"
    />
  );
}

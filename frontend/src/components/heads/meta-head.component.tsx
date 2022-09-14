import Head from 'next/head';

interface HeadMetaProps {
  title: string;
  description: string;
  url: string;
  siteName?: string;
}

export function HeadMeta({
  title,
  description,
  url,
  siteName = 'NextJS Boilerplate',
}: HeadMetaProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:url" content={url} />
      <meta name="og:site_name" content={siteName} />
      <meta name="og:type" content="website" />
    </Head>
  );
}

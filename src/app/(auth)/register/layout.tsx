import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register | DevConnect',
  description: 'Create your DevConnect account and start sharing your coding journey.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Register | DevConnect',
    description: 'Join DevConnect, explore and learn.',
    type: 'website',
    url: 'https://devconnect.forum', 
    siteName: 'DevConnect',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Register | DevConnect',
    description: 'Create your DevConnect account and start sharing your coding journey.',
  },
};

export default function RegisterPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full h-full grid place-items-center">
      {children}
    </main>
  );
}

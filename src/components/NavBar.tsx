'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();

  const tabs = [
    { label: 'Prediction Portal', href: '/' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Why This?', href: '/why-this' },
  ];

  return (
    <header className="header">
      <Image
        src="/ASTO.jpg"
        alt="Triton Outfitters Logo"
        width={280}
        height={105}
        className="logo-image"
        priority
        style={{ objectFit: 'contain' }}
      />
      <h1 className="title">Triton Outfitters</h1>

      <nav className="nav-tabs">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`nav-tab ${pathname === tab.href ? 'nav-tab--active' : ''}`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { CustomButton } from '../clickable/CustomButton';
import { MobileHeader } from './MobileHeader';

type NavLink = {
  id: string;
  label: string;
};

export const navLinks: NavLink[] = [
  { id: 'categories', label: 'Categories' },
  { id: 'howitworks', label: 'How It Works' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  console.log(isMenuOpen);

  const handleScrollTo = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = 'home';
      navLinks.forEach(link => {
        const section = document.getElementById(link.id);
        if (section) {
          const { top } = section.getBoundingClientRect();
          if (top <= 80) {
            currentSection = link.id;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="h-24 w-full bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <Link href="home" onClick={() => handleScrollTo('home')} className="">
          {/* <Image src={logo} alt="logo" className="w-full h-full object-cover" /> */}
          Logo
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => handleScrollTo(link.id)}
              className={`text-lightp hover:text-primary text-base font-medium transition ${
                activeSection === link.id && 'text-primary'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="flex items-center gap-4">
            <CustomButton
              variant="transparent"
              className="border-bordergrey text-lightp rounded-[6px] border text-sm font-medium"
            >
              <Link href="/auth/login">Login</Link>
            </CustomButton>
            <CustomButton>
              <Link href="/auth/onboarding" className="font-light">
                Sign Up
              </Link>
            </CustomButton>
          </div>
        </div>

        <MobileHeader
          handleScrollTo={handleScrollTo}
          activeSection={activeSection}
        />
      </div>
    </header>
  );
};

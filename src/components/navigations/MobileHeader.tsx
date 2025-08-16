'use client';

import { CustomButton } from '../clickable/CustomButton';
import { navLinks } from './Header';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCloseIcon } from 'lucide-react';
import { BarMenuIcon } from '../assets/icons/SvgIcons';

type Props = {
  handleScrollTo?: (id: string) => void;
  activeSection?: string;
};

export const MobileHeader = ({ handleScrollTo, activeSection }: Props) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
  const closeDropdown = () => setIsDropdownOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDropdown();
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isDropdownOpen]);

  return (
    <div className="relative md:hidden" ref={dropdownRef}>
      <button onClick={toggleDropdown}>
        <BarMenuIcon />
      </button>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="shadow-usershadow absolute top-full right-0 z-50 mt-2 min-w-[300px] rounded-[14px] bg-white p-4"
          >
            <div className="mb-4 flex justify-end">
              <button onClick={closeDropdown}>
                <ShieldCloseIcon />
              </button>
            </div>

            <div className="mb-5 flex flex-col gap-2">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => {
                    handleScrollTo?.(link.id);
                    closeDropdown();
                  }}
                  className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-base font-medium transition-colors ${
                    activeSection === link.id
                      ? 'text-primary bg-gray-100'
                      : 'text-lightp hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <CustomButton
                variant="transparent"
                className="border-bordergrey text-lightp w-full rounded-[6px] border text-sm font-medium"
                onClick={() => {
                  router.push(`/auth/login`);
                  closeDropdown();
                }}
                label="Login"
              />

              <CustomButton
                className="w-full"
                onClick={() => {
                  router.push(`/auth/onboarding`);
                  closeDropdown();
                }}
                label="Sign Up"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

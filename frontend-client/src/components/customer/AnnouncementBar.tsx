import React from 'react';

const ANNOUNCEMENTS = [
  '✨ Handcrafted Jewellery – Made with Love',
  '💍 Custom Jewellery Made to Order',
  '🚚 Shipping Available Across India',
  '🎁 Exclusive Designs for Every Occasion',
];

export const AnnouncementBar: React.FC = () => {
  return (
    <aside
      aria-label="Announcements"
      className="relative z-50 bg-[#1E1C18] text-[#E8DFD0] border-b border-[#3B3831] overflow-hidden select-none py-1.5 sm:py-2 text-[10px] sm:text-xs tracking-wider font-sans font-medium"
    >
      <div className="group flex overflow-hidden w-full">
        {/* Repeating marquee tracks for seamless infinite looping */}
        <div className="flex shrink-0 items-center justify-around min-w-full animate-marquee group-hover:[animation-play-state:paused]">
          {ANNOUNCEMENTS.map((msg, idx) => (
            <span key={`a1-${idx}`} className="inline-flex items-center mx-5 sm:mx-8">
              <span className="text-[#F4EFE5] whitespace-nowrap">{msg}</span>
              <span className="ml-5 sm:ml-8 text-[#C6A15B]/70" aria-hidden="true">
                ✦
              </span>
            </span>
          ))}
        </div>

        <div
          aria-hidden="true"
          className="flex shrink-0 items-center justify-around min-w-full animate-marquee group-hover:[animation-play-state:paused]"
        >
          {ANNOUNCEMENTS.map((msg, idx) => (
            <span key={`a2-${idx}`} className="inline-flex items-center mx-5 sm:mx-8">
              <span className="text-[#F4EFE5] whitespace-nowrap">{msg}</span>
              <span className="ml-5 sm:ml-8 text-[#C6A15B]/70" aria-hidden="true">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default AnnouncementBar;


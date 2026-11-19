import React from 'react';
import { Award, Settings, MessageCircle } from 'lucide-react';

const WHY_US = [
  {
    id: 'craftsmanship',
    Icon: Award,
    title: 'Quality Craftsmanship',
    description:
      'Every piece is handcrafted by skilled artisans using time-honoured techniques, with meticulous attention to detail and finish.',
  },
  {
    id: 'made-to-order',
    Icon: Settings,
    title: 'Made-to-Order Options',
    description:
      'Many of our jewellery pieces can be personalised — customise the metal, size, gemstones, and design to suit your vision perfectly.',
  },
  {
    id: 'support',
    Icon: MessageCircle,
    title: 'Personalised Support',
    description:
      'Our team offers dedicated guidance through every step — from browsing to custom orders — ensuring a seamless and joyful experience.',
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section
      className="py-16 md:py-20 lg:py-24 bg-bg transition-colors duration-200"
      aria-labelledby="why-choose-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-sans mb-3">
            Our Promise
          </p>
          <h2
            id="why-choose-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-text-main font-light"
          >
            Why Choose Us
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {WHY_US.map(({ id, Icon, title, description }) => (
            <div
              key={id}
              className="group bg-surface border border-border rounded-2xl p-7 md:p-8 lg:p-9 hover:border-primary/40 hover:shadow-md transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <Icon className="w-5 h-5 text-primary" strokeWidth={1.75} />
              </div>

              {/* Thin rule */}
              <div className="w-8 h-px bg-primary/40 mb-5 group-hover:w-12 transition-all duration-300" />

              <h3 className="font-serif text-xl md:text-2xl text-text-main mb-3 font-normal">
                {title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;


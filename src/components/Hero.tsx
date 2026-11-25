import { ArrowRight } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';
import { ResilientImage } from './ResilientImage';

interface HeroProps {
  onShopNow: () => void;
}

const HERITAGE_PROMISES = [
  {
    title: 'Stone-Ground Weekly',
    detail: 'Milled in small batches every Tuesday & Friday in Shivamogga.',
  },
  {
    title: 'Whole Byadgi Chillies',
    detail: 'Deep natural crimson color and warmth without artificial dyes.',
  },
  {
    title: 'Zero Preservatives',
    detail: 'Pure sun-dried lentils, herbs, and spices—nothing else in the pouch.',
  },
  {
    title: 'COD & UPI Across India',
    detail: 'Free doorstep delivery on every order above ₹499.',
  },
];

export function Hero({ onShopNow }: HeroProps) {
  return (
    <section id="top" className="bg-[#17100C] text-[#FAF8F4]">
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Editorial Left Column */}
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="text-sm font-medium tracking-wide text-[#DFB262]">
              Shivamogga Spice Kitchen &middot; Fresh Weekly Roast
            </p>

            <h1
              className="mt-4 font-display font-semibold tracking-tight text-[#FAF8F4] leading-[1.08]"
              style={{
                fontSize: 'clamp(2.35rem, 4.1vw, 3.85rem)',
                textWrap: 'balance',
              }}
            >
              Heirloom Chutney Pudis &amp; Slow-Roasted Indian Masalas.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#D8CEC4] sm:text-lg">
              One spoon over steaming hot rice and melted cow ghee—or stirred into bubbling Udupi
              sambar. Hand-roasted in heavy brass urulis and ground fresh each week so every pouch
              arrives smelling like home.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <button
                type="button"
                onClick={onShopNow}
                className="inline-flex items-center gap-2.5 rounded-lg bg-[#B91C1C] px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#991B1B] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DFB262]"
              >
                <span>Shop Fresh Batches</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <a
                href="#craft"
                className="text-sm font-medium text-[#E8DFD5] underline decoration-[#DFB262]/60 underline-offset-8 transition-colors duration-150 hover:text-white hover:decoration-[#DFB262] whitespace-nowrap shrink-0"
              >
                See how we roast
              </a>
            </div>
          </div>

          {/* Dramatic Spice Spread Right Column */}
          <div className="lg:col-span-6">
            <div className="relative h-full min-h-[300px] overflow-hidden rounded-xl border border-white/10 bg-[#231914] sm:min-h-[380px]">
              <ResilientImage
                src={HERO_IMAGE}
                alt="Hammered brass bowls of vibrant red Shenga chutney pudi, golden Udupi sambar powder, and emerald curry leaf pudi arranged with Byadgi chillies and a stone mortar"
                fallbackTitle="Malnad Heritage Spice Spread"
                priority
                className="h-full w-full object-cover lg:h-full"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#17100C]/65 via-transparent to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-5 py-4 text-xs font-medium text-[#F5EFE6]">
                <span>Shenga Pudi &middot; Udupi Sambar &middot; Wild Karibevu</span>
                <span className="text-[#DFB262] tabular-nums">From ₹185</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width 4-Column Indian Kitchen Trust Bar */}
      <div className="border-t border-white/10 bg-[#1F1611]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 divide-y divide-white/10 px-4 sm:grid-cols-2 sm:divide-y-0 sm:px-6 lg:grid-cols-4 lg:divide-x lg:px-8">
          {HERITAGE_PROMISES.map((item) => (
            <div key={item.title} className="py-5 sm:px-5 first:sm:pl-0 last:sm:pr-0">
              <p className="font-display text-sm font-semibold text-[#F5EFE6]">{item.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-[#BFB3A6]">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

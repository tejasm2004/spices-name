import { CRAFT_IMAGE, CUSTOMER_VOICES } from '../data/products';
import { ResilientImage } from './ResilientImage';

const CRAFT_STEPS = [
  {
    index: '01.',
    title: 'Single-Origin Harvest',
    body: 'We source sun-cured Byadgi chillies from Haveri, native wild curry leaves from Malnad estates, and unpolished lentils directly from Karnataka farmers.',
  },
  {
    index: '02.',
    title: 'Slow Brass-Pan Roasting',
    body: 'Every seed and lentil is dry-roasted separately in heavy brass urulis over controlled heat so delicate essential oils bloom without scorching.',
  },
  {
    index: '03.',
    title: 'Fresh Small-Batch Milling',
    body: 'We grind only what ships that week—retaining the authentic coarse texture of home chutney pudi and sealing pouches within four hours.',
  },
];

export function CraftSection() {
  return (
    <section id="craft" className="border-t border-[#E7E2D8] bg-[#F3EFE7]/75">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-22">
        {/* 2-Column Editorial Roasting Story */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <div className="h-full min-h-[300px] overflow-hidden rounded-xl border border-[#E2DACB] bg-[#1C1410]">
              <ResilientImage
                src={CRAFT_IMAGE}
                alt="Slow roasting whole red Byadgi chillies, coriander seeds, cinnamon bark, and fresh curry leaves in a seasoned brass uruli pan"
                fallbackTitle="Traditional Brass-Pan Spice Roasting"
                className="h-full w-full object-cover lg:h-full"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="text-xs font-semibold tracking-wide text-[#9A6310]">
              Our Kitchen Method &middot; Since 1998
            </p>
            <h2
              className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#1C1410] sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Roasted slow in brass, never factory-baked.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#574B42]">
              Commercial spice factories flash-dry and pulverize spices at high temperatures,
              stripping away the very aroma that makes Indian food unforgettable. We keep it
              stubbornly simple—small pans, clean hands, and fresh weekly batches.
            </p>

            <div className="mt-8 divide-y divide-[#E2DACB] border-t border-[#E2DACB]">
              {CRAFT_STEPS.map((step) => (
                <div key={step.index} className="py-4 first:pt-5">
                  <h3 className="font-display text-base font-semibold text-[#1C1410]">
                    <span className="mr-2 text-[#B91C1C] tabular-nums">{step.index}</span>
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#574B42]">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Adjacent Claim-to-Proof Customer Voices */}
        <div className="mt-16 border-t border-[#E2DACB] pt-14">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold text-[#9A6310]">From Indian Home Kitchens</p>
              <h3 className="mt-1 font-display text-2xl font-semibold text-[#1C1410]">
                Loved across 4,200+ weekly orders
              </h3>
            </div>
            <p className="text-sm text-[#574B42]">Verified repeat families in Karnataka, Tamil Nadu &amp; Maharashtra</p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {CUSTOMER_VOICES.map((voice) => (
              <figure
                key={voice.author}
                className="flex flex-col justify-between rounded-xl border border-[#E7E2D8] bg-white p-6"
              >
                <blockquote className="text-sm leading-relaxed text-[#382F29]">
                  &ldquo;{voice.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 border-t border-[#F0EBE1] pt-4">
                  <p className="text-sm font-semibold text-[#1C1410]">{voice.author}</p>
                  <p className="mt-0.5 text-xs text-[#75665A]">
                    {voice.location} &middot; {voice.productBought}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

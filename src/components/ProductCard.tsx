import { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { Product } from '../data/products';
import { ResilientImage } from './ResilientImage';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, weight: '200g' | '400g') => void;
  onInspect: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onInspect }: ProductCardProps) {
  const [selectedWeight, setSelectedWeight] = useState<'200g' | '400g'>('200g');
  const [justAdded, setJustAdded] = useState(false);

  const currentPrice = product.prices[selectedWeight];

  const handleQuickAdd = () => {
    onAddToCart(product, selectedWeight);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 950);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-[#E7E2D8] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      {/* Product Photography (4:3, ~65% visual dominance) */}
      <button
        type="button"
        onClick={() => onInspect(product)}
        aria-label={`View full details for ${product.name}`}
        className="relative aspect-[4/3] w-full overflow-hidden bg-[#F3EFE7] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B91C1C]"
      >
        <ResilientImage
          src={product.image}
          alt={`${product.name} served in a traditional brass bowl`}
          fallbackTitle={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </button>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Clean unboxed metadata (zero-pill rule) */}
        <div className="flex items-center gap-2 text-xs font-medium text-[#75665A]">
          <span>{product.categoryLabel}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{product.heat} Heat</span>
          {product.featuredTag && (
            <>
              <span aria-hidden="true">&middot;</span>
              <span className="text-[#9A6310]">{product.featuredTag}</span>
            </>
          )}
        </div>

        {/* Title & 1-line tasting note */}
        <button
          type="button"
          onClick={() => onInspect(product)}
          className="mt-2 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B91C1C]"
        >
          <h3 className="font-display text-lg font-semibold leading-snug text-[#1C1410] transition-colors group-hover:text-[#B91C1C]">
            {product.name}
          </h3>
        </button>

        <p className="mt-1.5 text-sm leading-relaxed text-[#574B42]">{product.tagline}</p>

        {/* Pack Weight + Price + Action aligned at bottom baseline */}
        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between gap-3 border-t border-[#F0EBE1] pt-4">
            {/* Weight Segmented Control */}
            <div
              role="group"
              aria-label={`Select pack weight for ${product.name}`}
              className="inline-flex items-center rounded-lg bg-[#F3EFE7] p-1"
            >
              {(['200g', '400g'] as const).map((weight) => (
                <button
                  key={weight}
                  type="button"
                  onClick={() => setSelectedWeight(weight)}
                  aria-pressed={selectedWeight === weight}
                  className={`rounded-md px-2.5 py-1 text-xs font-semibold tabular-nums transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedWeight === weight
                      ? 'bg-white text-[#1C1410] shadow-xs'
                      : 'text-[#6A5C51] hover:text-[#1C1410]'
                  }`}
                >
                  {weight}
                </button>
              ))}
            </div>

            {/* Price & Add CTA */}
            <div className="flex items-center gap-3">
              <span className="text-base font-semibold text-[#1C1410] tabular-nums">
                ₹{currentPrice}
              </span>
              <button
                type="button"
                onClick={handleQuickAdd}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B91C1C] ${
                  justAdded
                    ? 'bg-[#1F5E3B] text-white'
                    : 'bg-[#B91C1C] text-white hover:bg-[#991B1B]'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Add</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

import { useEffect, useState } from 'react';
import { Check, Minus, Plus, X } from 'lucide-react';
import { Product } from '../data/products';
import { ResilientImage } from './ResilientImage';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, weight: '200g' | '400g', quantity: number) => void;
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [weight, setWeight] = useState<'200g' | '400g'>('200g');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!product) return;
    setWeight('200g');
    setQuantity(1);
    setAdded(false);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const unitPrice = product.prices[weight];
  const lineTotal = unitPrice * quantity;

  const handleConfirmAdd = () => {
    onAddToCart(product, weight, quantity);
    setAdded(true);
    window.setTimeout(() => {
      setAdded(false);
      onClose();
    }, 650);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/95 text-[#1C1410] border border-[#E7E2D8] hover:bg-[#F3EFE7] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B91C1C]"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left Studio Image */}
          <div className="aspect-[4/3] bg-[#F3EFE7] md:col-span-5 md:aspect-auto">
            <ResilientImage
              src={product.image}
              alt={`${product.name} — ${product.regionalName}`}
              fallbackTitle={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Right Contiguous Purchase Module */}
          <div className="flex flex-col p-6 sm:p-8 md:col-span-7">
            <p className="text-xs font-medium text-[#75665A]">
              {product.categoryLabel} &middot; {product.heat} Heat &middot; {product.batchNote}
            </p>

            <h2
              id="product-modal-title"
              className="mt-2 font-display text-2xl font-semibold text-[#1C1410] sm:text-3xl"
            >
              {product.name}
            </h2>
            <p className="mt-1 text-sm font-medium text-[#9A6310]">{product.regionalName}</p>

            <p className="mt-4 text-sm leading-relaxed text-[#463B33]">{product.description}</p>

            {/* Contiguous Purchase Controls */}
            <div className="mt-6 rounded-lg border border-[#E7E2D8] bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="block text-xs font-medium text-[#75665A]">Pack Size</span>
                  <div className="mt-1.5 inline-flex rounded-lg bg-[#F3EFE7] p-1">
                    {(['200g', '400g'] as const).map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setWeight(option)}
                        aria-pressed={weight === option}
                        className={`rounded-md px-3 py-1.5 text-xs font-semibold tabular-nums transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          weight === option
                            ? 'bg-white text-[#1C1410] shadow-xs'
                            : 'text-[#6A5C51] hover:text-[#1C1410]'
                        }`}
                      >
                        {option} &mdash; ₹{product.prices[option]}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-medium text-[#75665A]">Quantity</span>
                  <div className="mt-1.5 inline-flex items-center rounded-lg border border-[#E7E2D8] bg-[#FAF8F4]">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="flex h-9 w-9 items-center justify-center text-[#1C1410] hover:bg-[#EFEAE0] cursor-pointer"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-9 text-center text-sm font-semibold tabular-nums text-[#1C1410]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                      aria-label="Increase quantity"
                      className="flex h-9 w-9 items-center justify-center text-[#1C1410] hover:bg-[#EFEAE0] cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleConfirmAdd}
                className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors cursor-pointer ${
                  added
                    ? 'bg-[#1F5E3B] text-white'
                    : 'bg-[#B91C1C] text-white hover:bg-[#991B1B]'
                }`}
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" aria-hidden="true" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <span>Add to Bag</span>
                    <span aria-hidden="true">&middot;</span>
                    <span className="tabular-nums">₹{lineTotal}</span>
                  </>
                )}
              </button>
            </div>

            {/* Clean Unboxed Culinary Details */}
            <div className="mt-6 space-y-4 border-t border-[#E7E2D8] pt-5 text-sm">
              <div>
                <h3 className="font-sans text-xs font-semibold text-[#1C1410]">
                  Whole Ingredients
                </h3>
                <p className="mt-1 leading-relaxed text-[#574B42]">
                  {product.ingredients.join(', ')}.
                </p>
              </div>
              <div>
                <h3 className="font-sans text-xs font-semibold text-[#1C1410]">
                  Best Enjoyed With
                </h3>
                <p className="mt-1 leading-relaxed text-[#574B42]">{product.pairings}</p>
              </div>
              <p className="text-xs text-[#75665A]">
                Shelf life: {product.shelfLife} &middot; 100% Vegetarian &middot; No added oil or
                artificial color
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

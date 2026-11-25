import { useState } from 'react';
import { Check, Plus, Search, X } from 'lucide-react';
import {
  BundleOffer,
  Product,
  ProductCategory,
  TRIO_BUNDLE,
} from '../data/products';
import { ProductCard } from './ProductCard';
import { ResilientImage } from './ResilientImage';

interface CatalogSectionProps {
  products: Product[];
  activeCategory: ProductCategory;
  onCategoryChange: (category: ProductCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddProduct: (product: Product, weight: '200g' | '400g') => void;
  onAddBundle: (bundle: BundleOffer) => void;
  onInspectProduct: (product: Product) => void;
}

const CATEGORY_TABS: { id: ProductCategory; label: string }[] = [
  { id: 'all', label: 'All Blends' },
  { id: 'chutney-pudi', label: 'Chutney Pudis' },
  { id: 'masala', label: 'Sambar & Masalas' },
];

export function CatalogSection({
  products,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  onAddProduct,
  onAddBundle,
  onInspectProduct,
}: CatalogSectionProps) {
  const [bundleAdded, setBundleAdded] = useState(false);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === 'all' || product.category === activeCategory;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;

    const haystack = [
      product.name,
      product.regionalName,
      product.categoryLabel,
      product.tagline,
      product.pairings,
      ...product.ingredients,
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });

  const handleAddBundle = () => {
    onAddBundle(TRIO_BUNDLE);
    setBundleAdded(true);
    window.setTimeout(() => setBundleAdded(false), 1000);
  };

  return (
    <section id="shop" className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      {/* Section Heading + Filter Toolbar */}
      <div className="flex flex-col gap-6 border-b border-[#E7E2D8] pb-7 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <p className="text-xs font-semibold tracking-wide text-[#9A6310]">
            Fresh This Week &middot; Packed in Aroma-Lock Pouches
          </p>
          <h2
            className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#1C1410] sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            Choose your kitchen essentials
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#574B42] sm:text-base">
            Tap any spice blend for full ingredients and serving ideas, or pick your pack weight to
            add straight to your bag.
          </p>
        </div>

        {/* Category Segmented Controls + Simple Search */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div
            role="tablist"
            aria-label="Filter spices by category"
            className="inline-flex items-center rounded-lg bg-[#EFEAE0] p-1"
          >
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onCategoryChange(tab.id)}
                  className={`rounded-md px-3.5 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B91C1C] ${
                    isActive
                      ? 'bg-white text-[#1C1410] shadow-xs'
                      : 'text-[#6A5C51] hover:text-[#1C1410]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="relative sm:w-56">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7A6B5E]"
              aria-hidden="true"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search garlic, sambar, dosa..."
              aria-label="Search spices and ingredients"
              className="w-full rounded-lg border border-[#DDD5C7] bg-white py-2 pl-9 pr-8 text-sm text-[#1C1410] placeholder:text-[#8A7B6D] focus:border-[#B91C1C] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7A6B5E] hover:text-[#1C1410] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddProduct}
              onInspect={onInspectProduct}
            />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-xl border border-[#E7E2D8] bg-white px-6 py-14 text-center">
          <p className="font-display text-xl font-semibold text-[#1C1410]">
            No spice blends match &ldquo;{searchQuery}&rdquo;
          </p>
          <p className="mt-2 text-sm text-[#574B42]">
            Try searching for peanut, curry leaf, sambar, pepper, or view all fresh batches.
          </p>
          <button
            type="button"
            onClick={() => {
              onCategoryChange('all');
              onSearchChange('');
            }}
            className="mt-5 inline-flex items-center rounded-lg bg-[#1C1410] px-4 py-2 text-sm font-medium text-white hover:bg-[#31241D] cursor-pointer"
          >
            Show All Blends
          </button>
        </div>
      )}

      {/* Curated Vendor Starter Trio Box */}
      <div className="mt-14 overflow-hidden rounded-xl border border-[#E7E2D8] bg-[#F3EFE7]">
        <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
          <div className="aspect-[16/10] bg-[#1C1410] lg:col-span-5 lg:aspect-auto">
            <ResilientImage
              src={TRIO_BUNDLE.image}
              alt="The Everyday Indian Kitchen Trio with Shenga chutney pudi, Udupi sambar powder, and Idli gunpowder"
              fallbackTitle={TRIO_BUNDLE.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-8 lg:col-span-7 lg:p-10">
            <p className="text-xs font-semibold text-[#9A6310]">
              {TRIO_BUNDLE.subtitle} &middot; Ships Free
            </p>
            <h3
              className="mt-2 font-display text-2xl font-semibold text-[#1C1410] sm:text-3xl"
              style={{ textWrap: 'balance' }}
            >
              {TRIO_BUNDLE.name}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#574B42] sm:text-base">
              {TRIO_BUNDLE.description}
            </p>

            <p className="mt-4 text-xs font-medium text-[#6A5C51]">
              Includes: {TRIO_BUNDLE.includes.join(' · ')}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-5">
              <div className="flex items-baseline gap-2.5">
                <span className="font-display text-2xl font-semibold text-[#1C1410] tabular-nums">
                  ₹{TRIO_BUNDLE.price}
                </span>
                <span className="text-sm text-[#7A6B5E] line-through tabular-nums">
                  ₹{TRIO_BUNDLE.compareAtPrice}
                </span>
              </div>

              <button
                type="button"
                onClick={handleAddBundle}
                className={`inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B91C1C] ${
                  bundleAdded
                    ? 'bg-[#1F5E3B] text-white'
                    : 'bg-[#B91C1C] text-white hover:bg-[#991B1B]'
                }`}
              >
                {bundleAdded ? (
                  <>
                    <Check className="h-4 w-4" aria-hidden="true" />
                    <span>Trio Added to Bag</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    <span>Add Trio Box</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

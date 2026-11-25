import { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { ProductCategory } from '../data/products';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onSelectCategory: (category: ProductCategory) => void;
}

export function Navbar({ cartCount, onOpenCart, onSelectCategory }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCategoryLink = (category: ProductCategory) => {
    onSelectCategory(category);
    setMobileMenuOpen(false);
    const shopEl = document.getElementById('shop');
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#E7E2D8] bg-[#FAF8F4]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          className="font-display text-xl font-semibold tracking-tight text-[#1C1410] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B91C1C]"
        >
          Malnad Pudi House
        </a>

        {/* Zone 2: 4 Clean Single-Line Nav Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#574B42]"
        >
          <a
            href="#shop"
            onClick={(e) => {
              e.preventDefault();
              handleCategoryLink('all');
            }}
            className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#1C1410] hover:underline underline-offset-8 decoration-[#B91C1C]"
          >
            Shop All
          </a>
          <a
            href="#shop"
            onClick={(e) => {
              e.preventDefault();
              handleCategoryLink('chutney-pudi');
            }}
            className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#1C1410] hover:underline underline-offset-8 decoration-[#B91C1C]"
          >
            Chutney Pudis
          </a>
          <a
            href="#shop"
            onClick={(e) => {
              e.preventDefault();
              handleCategoryLink('masala');
            }}
            className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#1C1410] hover:underline underline-offset-8 decoration-[#B91C1C]"
          >
            Sambar &amp; Masalas
          </a>
          <a
            href="#craft"
            className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#1C1410] hover:underline underline-offset-8 decoration-[#B91C1C]"
          >
            Our Craft
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action (Bag) + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Open shopping bag with ${cartCount} items`}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B91C1C] ${
              cartCount > 0
                ? 'bg-[#B91C1C] text-white hover:bg-[#991B1B]'
                : 'bg-[#1C1410] text-[#FAF8F4] hover:bg-[#2F231C]'
            }`}
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            <span>Bag</span>
            <span className="tabular-nums">({cartCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#E7E2D8] text-[#1C1410] md:hidden cursor-pointer hover:bg-[#F3EFE7]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Simple Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-[#E7E2D8] bg-[#FAF8F4] px-4 py-3 md:hidden"
        >
          <div className="flex flex-col gap-1 text-sm font-medium text-[#1C1410]">
            <button
              type="button"
              onClick={() => handleCategoryLink('all')}
              className="rounded-md px-3 py-2.5 text-left hover:bg-[#F3EFE7]"
            >
              Shop All Spices
            </button>
            <button
              type="button"
              onClick={() => handleCategoryLink('chutney-pudi')}
              className="rounded-md px-3 py-2.5 text-left hover:bg-[#F3EFE7]"
            >
              Chutney Pudis
            </button>
            <button
              type="button"
              onClick={() => handleCategoryLink('masala')}
              className="rounded-md px-3 py-2.5 text-left hover:bg-[#F3EFE7]"
            >
              Sambar &amp; Masalas
            </button>
            <a
              href="#craft"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md px-3 py-2.5 text-left hover:bg-[#F3EFE7]"
            >
              Our Craft
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

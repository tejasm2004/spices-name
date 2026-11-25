import { ProductCategory } from '../data/products';

interface FooterProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export function Footer({ onSelectCategory }: FooterProps) {
  const jumpToCategory = (category: ProductCategory) => {
    onSelectCategory(category);
    const el = document.getElementById('shop');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#17100C] text-[#D8CEC4]">
      <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-xl font-semibold text-[#FAF8F4]">Malnad Pudi House</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#BFB3A6]">
              Family-run Indian spice kitchen crafting weekly small-batch chutney pudis, temple-style
              Udupi sambar powder, and heirloom South Indian masalas.
            </p>
            <p className="mt-4 text-xs text-[#9C8E80]">
              FSSAI Registered Kitchen &middot; Shivamogga, Karnataka
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-semibold text-[#DFB262]">Shop Spices</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => jumpToCategory('all')}
                  className="hover:text-white cursor-pointer"
                >
                  All Fresh Batches
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => jumpToCategory('chutney-pudi')}
                  className="hover:text-white cursor-pointer"
                >
                  Chutney Pudis
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => jumpToCategory('masala')}
                  className="hover:text-white cursor-pointer"
                >
                  Sambar &amp; Rice Masalas
                </button>
              </li>
              <li>
                <a href="#craft" className="hover:text-white">
                  Our Roasting Craft
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs font-semibold text-[#DFB262]">Kitchen &amp; Bulk Orders</p>
            <p className="mt-3 text-sm leading-relaxed text-[#BFB3A6]">
              24 Nehru Road, Near Gandhi Bazaar, Shivamogga 577201, Karnataka
            </p>
            <p className="mt-2 text-sm text-[#FAF8F4] tabular-nums">+91 98450 42190</p>
            <p className="mt-1 text-xs text-[#9C8E80]">
              Dispatched Mon&ndash;Sat &middot; Free Pan-India delivery above ₹499
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-[#9C8E80] sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} Malnad Pudi House. All rights reserved.</p>
          <p>Freshly ground in India &middot; Cash on Delivery &amp; UPI</p>
        </div>
      </div>
    </footer>
  );
}

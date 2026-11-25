import { useEffect, useRef, useState } from 'react';
import {
  BundleOffer,
  CartItem,
  OrderRecord,
  PRODUCTS,
  Product,
  ProductCategory,
} from './data/products';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CatalogSection } from './components/CatalogSection';
import { CraftSection } from './components/CraftSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';

const CART_STORAGE_KEY = 'malnad_pudi_house_cart_v1';
const ORDERS_STORAGE_KEY = 'malnad_pudi_house_orders_v1';

function readStoredJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() =>
    readStoredJson<CartItem[]>(CART_STORAGE_KEY, [])
  );
  const [recentOrders, setRecentOrders] = useState<OrderRecord[]>(() =>
    readStoredJson<OrderRecord[]>(ORDERS_STORAGE_KEY, [])
  );
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectedProduct, setInspectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore storage quota errors in restricted browsing contexts
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(recentOrders));
    } catch {
      // Ignore storage quota errors
    }
  }, [recentOrders]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const showAddedFeedback = (message: string) => {
    setToastMessage(message);
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddProduct = (
    product: Product,
    weight: '200g' | '400g',
    quantity = 1
  ) => {
    const key = `${product.id}__${weight}`;
    const unitPrice = product.prices[weight];

    setCartItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          name: product.name,
          weight,
          unitPrice,
          quantity,
          image: product.image,
        },
      ];
    });

    showAddedFeedback(`Added ${product.name} (${weight}) to your bag`);
  };

  const handleAddBundle = (bundle: BundleOffer) => {
    const key = `${bundle.id}__${bundle.weight}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          key,
          productId: bundle.id,
          name: bundle.name,
          weight: bundle.weight,
          unitPrice: bundle.price,
          quantity: 1,
          image: bundle.image,
        },
      ];
    });

    showAddedFeedback(`Added ${bundle.name} to your bag`);
  };

  const handleUpdateQuantity = (key: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (key: string) => {
    setCartItems((prev) => prev.filter((item) => item.key !== key));
  };

  const handlePlaceOrder = (order: OrderRecord) => {
    setRecentOrders((prev) => [order, ...prev].slice(0, 10));
    setCartItems([]);
  };

  const handleShopNow = () => {
    const shopEl = document.getElementById('shop');
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalBagCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#1C1410]">
      <Navbar
        cartCount={totalBagCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={setActiveCategory}
      />

      <main>
        <Hero onShopNow={handleShopNow} />

        <CatalogSection
          products={PRODUCTS}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddProduct={(product, weight) => handleAddProduct(product, weight, 1)}
          onAddBundle={handleAddBundle}
          onInspectProduct={setInspectedProduct}
        />

        <CraftSection />
      </main>

      <Footer onSelectCategory={setActiveCategory} />

      <ProductModal
        product={inspectedProduct}
        onClose={() => setInspectedProduct(null)}
        onAddToCart={handleAddProduct}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onPlaceOrder={handlePlaceOrder}
        recentOrders={recentOrders}
      />

      {/* Quiet Transient Cart Feedback Banner */}
      {toastMessage && !isCartOpen && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-40 flex items-center gap-4 rounded-lg border border-white/15 bg-[#17100C] px-4 py-3 text-sm text-[#FAF8F4] shadow-xl"
        >
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => {
              setToastMessage(null);
              setIsCartOpen(true);
            }}
            className="font-semibold text-[#DFB262] underline underline-offset-4 hover:text-white cursor-pointer whitespace-nowrap shrink-0"
          >
            View Bag
          </button>
        </div>
      )}
    </div>
  );
}

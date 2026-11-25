import { FormEvent, useEffect, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import {
  CartItem,
  FREE_SHIPPING_THRESHOLD,
  OrderRecord,
  STANDARD_SHIPPING_FEE,
} from '../data/products';
import { ResilientImage } from './ResilientImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onPlaceOrder: (order: OrderRecord) => void;
  recentOrders: OrderRecord[];
}

type DrawerStep = 'bag' | 'checkout' | 'confirmed' | 'history';

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
  recentOrders,
}: CartDrawerProps) {
  const [step, setStep] = useState<DrawerStep>('bag');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'UPI'>('COD');
  const [upiId, setUpiId] = useState('');
  const [formError, setFormError] = useState('');
  const [latestOrder, setLatestOrder] = useState<OrderRecord | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && step === 'confirmed') {
      // Keep showing confirmation if reopened immediately, otherwise reset to bag when closed
    }
    if (!isOpen) {
      setFormError('');
      if (step === 'confirmed' || step === 'checkout') {
        setStep('bag');
      }
    }
  }, [isOpen, step]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const total = subtotal + shipping;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleCheckoutSubmit = (event: FormEvent) => {
    event.preventDefault();
    setFormError('');

    const cleanPhone = phone.replace(/\D/g, '');
    const cleanPin = pincode.replace(/\D/g, '');

    if (customerName.trim().length < 2) {
      setFormError('Please enter your full name for delivery.');
      return;
    }
    if (cleanPhone.length < 10) {
      setFormError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    if (address.trim().length < 6 || city.trim().length < 2) {
      setFormError('Please enter your full street address and city.');
      return;
    }
    if (cleanPin.length !== 6) {
      setFormError('Please enter a valid 6-digit PIN code.');
      return;
    }
    if (paymentMethod === 'UPI' && (!upiId.includes('@') || upiId.trim().length < 5)) {
      setFormError('Please enter a valid UPI ID (for example, name@okhdfcbank or name@upi).');
      return;
    }

    const orderNum = `MPH-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: OrderRecord = {
      orderNumber: orderNum,
      placedAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      customerName: customerName.trim(),
      phone: cleanPhone.slice(-10),
      address: address.trim(),
      city: city.trim(),
      pincode: cleanPin,
      paymentMethod,
      upiId: paymentMethod === 'UPI' ? upiId.trim() : undefined,
      items: [...items],
      subtotal,
      shipping,
      total,
    };

    onPlaceOrder(newOrder);
    setLatestOrder(newOrder);
    setStep('confirmed');
    setCustomerName('');
    setPhone('');
    setAddress('');
    setCity('');
    setPincode('');
    setUpiId('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping bag and checkout"
      onClick={onClose}
    >
      <div
        className="flex h-full w-full max-w-md flex-col bg-[#FAF8F4] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#E7E2D8] bg-white px-5 py-4">
          <div className="flex items-center gap-2.5">
            {(step === 'checkout' || step === 'history') && (
              <button
                type="button"
                onClick={() => setStep('bag')}
                aria-label="Back to shopping bag"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#574B42] hover:bg-[#F3EFE7] cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            <h2 className="font-display text-lg font-semibold text-[#1C1410]">
              {step === 'bag' && 'Your Spice Bag'}
              {step === 'checkout' && 'Delivery & Payment'}
              {step === 'confirmed' && 'Order Confirmed'}
              {step === 'history' && 'Recent Orders'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {step === 'bag' && recentOrders.length > 0 && (
              <button
                type="button"
                onClick={() => setStep('history')}
                className="text-xs font-medium text-[#9A6310] underline underline-offset-4 hover:text-[#1C1410] cursor-pointer whitespace-nowrap"
              >
                Past Orders ({recentOrders.length})
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close drawer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#574B42] hover:bg-[#F3EFE7] cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* STEP 1: BAG VIEW */}
        {step === 'bag' && (
          <>
            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <ShoppingBag className="h-10 w-10 text-[#C2B6A6]" aria-hidden="true" />
                <p className="mt-4 font-display text-xl font-semibold text-[#1C1410]">
                  Your spice bag is empty
                </p>
                <p className="mt-2 max-w-xs text-sm text-[#574B42]">
                  Add freshly ground chutney pudis or sambar masala to get started. Free shipping
                  above ₹{FREE_SHIPPING_THRESHOLD}.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 rounded-lg bg-[#B91C1C] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#991B1B] cursor-pointer"
                >
                  Browse Fresh Batches
                </button>
              </div>
            ) : (
              <>
                {/* Free Shipping Progress */}
                <div className="border-b border-[#E7E2D8] bg-[#F3EFE7] px-5 py-3 text-xs font-medium text-[#463B33]">
                  {remainingForFreeShipping === 0 ? (
                    <span className="text-[#1F5E3B]">
                      Free doorstep delivery unlocked across India.
                    </span>
                  ) : (
                    <span>
                      Add <strong className="tabular-nums">₹{remainingForFreeShipping}</strong> more
                      for free delivery across India.
                    </span>
                  )}
                </div>

                {/* Itemized List */}
                <div className="flex-1 divide-y divide-[#E7E2D8] overflow-y-auto px-5">
                  {items.map((item) => (
                    <div key={item.key} className="flex gap-4 py-4">
                      <div className="h-20 w-24 shrink-0 overflow-hidden rounded-lg border border-[#E7E2D8] bg-[#F3EFE7]">
                        <ResilientImage
                          src={item.image}
                          alt={item.name}
                          fallbackTitle={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-display text-sm font-semibold text-[#1C1410]">
                              {item.name}
                            </h3>
                            <p className="mt-0.5 text-xs text-[#75665A]">
                              Pack: {item.weight} &middot;{' '}
                              <span className="tabular-nums">₹{item.unitPrice}</span>
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.key)}
                            aria-label={`Remove ${item.name} from bag`}
                            className="p-1 text-[#8A7B6D] hover:text-[#B91C1C] cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center rounded-md border border-[#E2DACB] bg-white">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.key, -1)}
                              aria-label={`Decrease quantity of ${item.name}`}
                              className="flex h-7 w-7 items-center justify-center text-[#1C1410] hover:bg-[#F3EFE7] cursor-pointer"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-semibold tabular-nums text-[#1C1410]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.key, 1)}
                              aria-label={`Increase quantity of ${item.name}`}
                              className="flex h-7 w-7 items-center justify-center text-[#1C1410] hover:bg-[#F3EFE7] cursor-pointer"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <span className="text-sm font-semibold text-[#1C1410] tabular-nums">
                            ₹{item.unitPrice * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bag Footer Summary */}
                <div className="border-t border-[#E7E2D8] bg-white p-5">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-[#574B42]">
                      <span>Subtotal</span>
                      <span className="tabular-nums">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-[#574B42]">
                      <span>Shipping</span>
                      <span className="tabular-nums">
                        {shipping === 0 ? 'Free' : `₹${shipping}`}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-[#EFEAE0] pt-2.5 text-base font-semibold text-[#1C1410]">
                      <span>Total</span>
                      <span className="tabular-nums">₹{total}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep('checkout')}
                    className="mt-4 w-full rounded-lg bg-[#B91C1C] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#991B1B] cursor-pointer"
                  >
                    Proceed to Checkout &middot; ₹{total}
                  </button>
                  <p className="mt-2.5 text-center text-xs text-[#75665A]">
                    Cash on Delivery (COD) &amp; UPI accepted
                  </p>
                </div>
              </>
            )}
          </>
        )}

        {/* STEP 2: SIMPLE INDIAN CHECKOUT FORM */}
        {step === 'checkout' && (
          <form onSubmit={handleCheckoutSubmit} className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
              {formError && (
                <div
                  role="alert"
                  className="rounded-lg border border-[#B91C1C]/30 bg-[#FEF2F2] px-3.5 py-2.5 text-xs font-medium text-[#991B1B]"
                >
                  {formError}
                </div>
              )}

              <div>
                <label
                  htmlFor="checkout-name"
                  className="block text-xs font-semibold text-[#1C1410]"
                >
                  Full Name
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Raghavendra Rao"
                  className="mt-1.5 w-full rounded-lg border border-[#DDD5C7] bg-white px-3.5 py-2.5 text-sm text-[#1C1410] focus:border-[#B91C1C] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="checkout-phone"
                  className="block text-xs font-semibold text-[#1C1410]"
                >
                  Mobile Number (+91)
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="mt-1.5 w-full rounded-lg border border-[#DDD5C7] bg-white px-3.5 py-2.5 text-sm text-[#1C1410] tabular-nums focus:border-[#B91C1C] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="checkout-address"
                  className="block text-xs font-semibold text-[#1C1410]"
                >
                  House / Flat &amp; Street Address
                </label>
                <textarea
                  id="checkout-address"
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House number, cross road, landmark"
                  className="mt-1.5 w-full rounded-lg border border-[#DDD5C7] bg-white px-3.5 py-2.5 text-sm text-[#1C1410] focus:border-[#B91C1C] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="checkout-city"
                    className="block text-xs font-semibold text-[#1C1410]"
                  >
                    City
                  </label>
                  <input
                    id="checkout-city"
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Bengaluru"
                    className="mt-1.5 w-full rounded-lg border border-[#DDD5C7] bg-white px-3.5 py-2.5 text-sm text-[#1C1410] focus:border-[#B91C1C] focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="checkout-pin"
                    className="block text-xs font-semibold text-[#1C1410]"
                  >
                    PIN Code
                  </label>
                  <input
                    id="checkout-pin"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="560038"
                    className="mt-1.5 w-full rounded-lg border border-[#DDD5C7] bg-white px-3.5 py-2.5 text-sm text-[#1C1410] tabular-nums focus:border-[#B91C1C] focus:outline-none"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="pt-2">
                <span className="block text-xs font-semibold text-[#1C1410]">Payment Method</span>
                <div className="mt-2 grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('COD')}
                    aria-pressed={paymentMethod === 'COD'}
                    className={`rounded-lg border px-3.5 py-3 text-left text-xs font-semibold transition-colors cursor-pointer ${
                      paymentMethod === 'COD'
                        ? 'border-[#B91C1C] bg-[#FEF2F2] text-[#1C1410]'
                        : 'border-[#DDD5C7] bg-white text-[#574B42] hover:border-[#B91C1C]/40'
                    }`}
                  >
                    Cash on Delivery
                    <span className="mt-0.5 block font-normal text-[#75665A]">Pay at doorstep</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI')}
                    aria-pressed={paymentMethod === 'UPI'}
                    className={`rounded-lg border px-3.5 py-3 text-left text-xs font-semibold transition-colors cursor-pointer ${
                      paymentMethod === 'UPI'
                        ? 'border-[#B91C1C] bg-[#FEF2F2] text-[#1C1410]'
                        : 'border-[#DDD5C7] bg-white text-[#574B42] hover:border-[#B91C1C]/40'
                    }`}
                  >
                    UPI Instant Pay
                    <span className="mt-0.5 block font-normal text-[#75665A]">
                      GPay / PhonePe / Paytm
                    </span>
                  </button>
                </div>

                {paymentMethod === 'UPI' && (
                  <div className="mt-3">
                    <label
                      htmlFor="checkout-upi"
                      className="block text-xs font-semibold text-[#1C1410]"
                    >
                      UPI ID
                    </label>
                    <input
                      id="checkout-upi"
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="yourname@okaxis"
                      className="mt-1.5 w-full rounded-lg border border-[#DDD5C7] bg-white px-3.5 py-2.5 text-sm text-[#1C1410] focus:border-[#B91C1C] focus:outline-none"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-[#E7E2D8] bg-white p-5">
              <div className="mb-3 flex items-center justify-between text-sm font-semibold text-[#1C1410]">
                <span>Amount Payable ({paymentMethod})</span>
                <span className="tabular-nums">₹{total}</span>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-[#B91C1C] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#991B1B] cursor-pointer"
              >
                Place Order &middot; ₹{total}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: ORDER CONFIRMED RECEIPT */}
        {step === 'confirmed' && latestOrder && (
          <div className="flex flex-1 flex-col overflow-y-auto px-5 py-6">
            <div className="rounded-xl border border-[#1F5E3B]/25 bg-white p-5">
              <div className="flex items-center gap-2.5 text-[#1F5E3B]">
                <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span className="text-sm font-semibold">
                  Order #{latestOrder.orderNumber} Confirmed
                </span>
              </div>
              <p className="mt-2 font-display text-xl font-semibold text-[#1C1410]">
                Fresh batch assigned for packing.
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-[#574B42]">
                Thank you, {latestOrder.customerName}. Your pouches will be freshly sealed and
                dispatched from our Shivamogga kitchen within 24 hours.
              </p>

              <div className="mt-5 space-y-2 border-t border-[#EFEAE0] pt-4 text-xs">
                {latestOrder.items.map((item) => (
                  <div key={item.key} className="flex justify-between text-[#463B33]">
                    <span>
                      {item.name} ({item.weight}) &times; {item.quantity}
                    </span>
                    <span className="font-medium tabular-nums">
                      ₹{item.unitPrice * item.quantity}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between border-t border-[#EFEAE0] pt-2.5 text-sm font-semibold text-[#1C1410]">
                  <span>Total ({latestOrder.paymentMethod})</span>
                  <span className="tabular-nums">₹{latestOrder.total}</span>
                </div>
              </div>

              <div className="mt-4 border-t border-[#EFEAE0] pt-4 text-xs text-[#574B42]">
                <p className="font-semibold text-[#1C1410]">Delivery Address</p>
                <p className="mt-1">
                  {latestOrder.address}, {latestOrder.city} &ndash; {latestOrder.pincode}
                </p>
                <p className="mt-0.5 tabular-nums">Phone: +91 {latestOrder.phone}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-lg bg-[#1C1410] px-5 py-3 text-sm font-semibold text-white hover:bg-[#31241D] cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        )}

        {/* STEP 4: PAST ORDERS HISTORY */}
        {step === 'history' && (
          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
            {recentOrders.map((order) => (
              <div
                key={order.orderNumber}
                className="rounded-xl border border-[#E7E2D8] bg-white p-4 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#1C1410]">Order #{order.orderNumber}</span>
                  <span className="text-[#1F5E3B] font-medium">Confirmed &middot; {order.placedAt}</span>
                </div>
                <p className="mt-1.5 text-[#574B42]">
                  {order.items.map((i) => `${i.name} (${i.weight}) × ${i.quantity}`).join(', ')}
                </p>
                <div className="mt-3 flex items-center justify-between border-t border-[#F0EBE1] pt-2.5 text-[#1C1410]">
                  <span>
                    {order.city} &ndash; {order.pincode} ({order.paymentMethod})
                  </span>
                  <span className="font-semibold tabular-nums">₹{order.total}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

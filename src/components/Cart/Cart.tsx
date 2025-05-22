import React, { useState } from 'react';
import { useProductStore } from '../../store/productStore';
import { CartItem } from '../../types/product';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useProductStore();
  const [isMinimized, setIsMinimized] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setShowThankYou(true);
    setTimeout(() => {
      cart.forEach(item => removeFromCart(item.id));
      setShowThankYou(false);
      setIsMinimized(true);
    }, 3000);
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-wood text-cream p-4 rounded-full shadow-lg hover:bg-wood-dark transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="absolute -top-2 -right-2 bg-orange text-cream text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cart.length}
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 right-0 w-96 h-[600px] bg-cream shadow-lg rounded-tl-2xl z-50 flex flex-col">
      <div className="bg-wood text-cream p-4 rounded-tl-2xl flex justify-between items-center">
        <h2 className="text-xl font-semibold">Carrinho</h2>
        <button
          onClick={() => setIsMinimized(true)}
          className="text-cream hover:text-cream-light transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {showThankYou ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-wood-dark mb-2">Pedido Recebido!</h3>
          <p className="text-wood-light">Obrigado por testar a aplicação.</p>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="text-center text-wood-light py-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-wood-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p>Seu carrinho está vazio</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-cream-light p-4 rounded-lg">
                    <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="font-medium text-wood-dark">{item.title}</h3>
                      {item.selectedSize && (
                        <p className="text-sm text-wood-light">Tamanho: {item.selectedSize}</p>
                      )}
                      {item.selectedColor && (
                        <p className="text-sm text-wood-light">Cor: {item.selectedColor}</p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full border border-wood text-wood hover:bg-wood hover:text-cream transition-colors"
                          >
                            -
                          </button>
                          <span className="text-wood-dark">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full border border-wood text-wood hover:bg-wood hover:text-cream transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-wood-light hover:text-wood-dark transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-wood-dark">R$ {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-wood-light p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-wood-dark font-medium">Total</span>
              <span className="text-2xl font-bold text-wood-dark">R$ {total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className="w-full bg-wood text-cream py-3 rounded-lg font-medium hover:bg-wood-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Finalizar Compra
            </button>
          </div>
        </>
      )}
    </div>
  );
}; 
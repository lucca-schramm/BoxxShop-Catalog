import React, { useEffect, useState } from 'react';
import { ProductGallery } from '../ProductGallery/ProductGallery';
import { ProductVariants } from '../ProductVariants/ProductVariants';
import { ShippingCalculator } from '../ShippingCalculator/ShippingCalculator';
import { useProductStore } from '../../store/productStore';
import { getProduct, getProducts } from '../../services/api';
import { Product, ProductWithVariants } from '../../types/product';
import { Cart } from '../Cart/Cart';

// Generate variants based on product category
const generateVariants = (category: string) => {
  const sizes = [
    { id: 'P', name: 'P', available: true },
    { id: 'M', name: 'M', available: true },
    { id: 'G', name: 'G', available: true },
    { id: 'GG', name: 'GG', available: true },
  ];

  const colors = [
    { id: 'black', name: 'Preto', available: true },
    { id: 'white', name: 'Branco', available: true },
    { id: 'blue', name: 'Azul', available: true },
    { id: 'red', name: 'Vermelho', available: true },
  ];

  // Disable some variants based on category
  if (category === "men's clothing") {
    sizes[0].available = false; // P size not available for men's clothing
  } else if (category === "women's clothing") {
    sizes[3].available = false; // GG size not available for women's clothing
  }

  return { sizes, colors };
};

// Map colors to product images
const colorImageMap: Record<string, string> = {
  black: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  white: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
  blue: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
  red: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
};

export const ProductPage: React.FC = () => {
  const { selectedSize, selectedColor, setSelectedSize, setSelectedColor, addToCart, cart } = useProductStore();
  const [product, setProduct] = useState<ProductWithVariants | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productData, productsData] = await Promise.all([
          getProduct(1),
          getProducts(),
        ]) as [Product, Product[]];
        
        // Generate variants based on product category
        const variants = generateVariants(productData.category);
        
        // Get alternative images from other products in the same category
        const alternativeImages = productsData
          .filter(p => p.category === productData.category && p.id !== productData.id)
          .slice(0, 3)
          .map(p => p.image);

        setProduct({
          ...productData,
          sizes: variants.sizes,
          colors: variants.colors,
          alternativeImages: [productData.image, ...alternativeImages],
        });
        setAllProducts(productsData);
      } catch (err) {
        setError('Erro ao carregar os produtos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = () => {
    if (product && selectedSize && selectedColor) {
      addToCart({
        ...product,
        selectedSize,
        selectedColor,
        quantity: 1,
      });
      setAddedToCart(true);
      setShowCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const handleProductClick = async (productId: number) => {
    try {
      setLoading(true);
      const productData = await getProduct(productId);
      const variants = generateVariants(productData.category);
      
      // Get alternative images from other products in the same category
      const alternativeImages = allProducts
        .filter(p => p.category === productData.category && p.id !== productData.id)
        .slice(0, 3)
        .map(p => p.image);

      setProduct({
        ...productData,
        sizes: variants.sizes,
        colors: variants.colors,
        alternativeImages: [productData.image, ...alternativeImages],
      });
      setShowModal(false);
    } catch (err) {
      setError('Erro ao carregar o produto');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Carregando...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">{error || 'Produto não encontrado'}</div>
      </div>
    );
  }

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-cream-light">
      {/* Header */}
      <header className="bg-wood shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-cream">BoxxShop</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative p-2 hover:bg-wood-light rounded-full transition-colors text-cream"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-cream text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 mb-[80vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left column - Product Gallery */}
          <div className="card card-hover bg-cream">
            <ProductGallery images={product.alternativeImages || [product.image]} />
          </div>

          {/* Right column - Product Info */}
          <div className="space-y-8">
            <div className="card card-hover bg-cream">
              <h1 className="text-3xl font-bold text-wood-dark">{product.title}</h1>
              <p className="text-2xl font-semibold text-secondary mt-2">
                R$ {product.price.toFixed(2)}
              </p>
              <p className="text-sm text-text-light mt-2">{product.description}</p>
              <div className="mt-2 flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating.rate)
                          ? 'text-secondary'
                          : 'text-border'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-text-light">
                    ({product.rating.count} avaliações)
                  </span>
                </div>
              </div>
            </div>

            <div className="card card-hover bg-cream">
              <ProductVariants
                sizes={product.sizes}
                colors={product.colors}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
                onSizeSelect={setSelectedSize}
                onColorSelect={setSelectedColor}
              />
            </div>

            <div className="card card-hover bg-cream">
              <ShippingCalculator productPrice={product.price} />
            </div>

            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor}
                className={`w-full py-3 rounded-lg transition-colors ${
                  addedToCart
                    ? 'bg-success text-cream'
                    : 'bg-secondary text-cream hover:bg-accent'
                } disabled:bg-border disabled:text-text-light disabled:cursor-not-allowed`}
              >
                {addedToCart ? 'Adicionado ao Carrinho!' : 'Adicionar ao Carrinho'}
              </button>
              
              <button
                onClick={() => setShowModal(true)}
                className="w-full px-4 py-3 border border-wood text-wood rounded-lg hover:bg-wood/5 transition-colors"
              >
                Ver Outros Produtos
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Products Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-wood-dark/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={handleModalClose}
        >
          <div className="bg-cream rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-wood-dark">Outros Produtos</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-wood hover:text-wood-dark"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProducts.map((p: Product) => (
                  <div 
                    key={p.id} 
                    className="card card-hover bg-cream"
                    onClick={() => handleProductClick(p.id)}
                  >
                    <div className="p-4">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-48 object-contain mb-4 bg-cream-light rounded-lg shadow-sm"
                      />
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-wood-dark">{p.title}</h3>
                      <p className="text-secondary font-bold">R$ {p.price.toFixed(2)}</p>
                      <div className="flex items-center mt-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(p.rating.rate)
                                  ? 'text-secondary'
                                  : 'text-border'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-text-light">
                          ({p.rating.count})
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {showCart && <Cart />}
    </div>
  );
}; 
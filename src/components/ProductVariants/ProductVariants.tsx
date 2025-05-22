import React from 'react';
import { ProductVariant } from '../../types/product';

interface ProductVariantsProps {
  sizes: ProductVariant[];
  colors: ProductVariant[];
  selectedSize: string | null;
  selectedColor: string | null;
  onSizeSelect: (size: string) => void;
  onColorSelect: (color: string) => void;
}

export const ProductVariants: React.FC<ProductVariantsProps> = ({
  sizes,
  colors,
  selectedSize,
  selectedColor,
  onSizeSelect,
  onColorSelect,
}) => {
  return (
    <div className="space-y-6">
      {/* Sizes */}
      <div>
        <h3 className="text-lg font-semibold text-wood-dark mb-3">Tamanho</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size.id}
              onClick={() => onSizeSelect(size.id)}
              disabled={!size.available}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                selectedSize === size.id
                  ? 'bg-wood text-cream border-wood'
                  : size.available
                  ? 'border-wood text-wood hover:bg-wood/5'
                  : 'border-border text-text-light cursor-not-allowed'
              }`}
            >
              {size.name}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="text-lg font-semibold text-wood-dark mb-3">Cor</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color.id}
              onClick={() => onColorSelect(color.id)}
              disabled={!color.available}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                selectedColor === color.id
                  ? 'bg-wood text-cream border-wood'
                  : color.available
                  ? 'border-wood text-wood hover:bg-wood/5'
                  : 'border-border text-text-light cursor-not-allowed'
              }`}
            >
              {color.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}; 
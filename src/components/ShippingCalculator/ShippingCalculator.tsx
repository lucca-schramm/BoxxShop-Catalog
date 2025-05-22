import React, { useState } from 'react';

interface ShippingCalculatorProps {
  productPrice: number;
}

export const ShippingCalculator: React.FC<ShippingCalculatorProps> = ({ productPrice }) => {
  const [cep, setCep] = useState('');
  const [shippingPrice, setShippingPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateShipping = async () => {
    if (!cep || cep.length !== 8) {
      setError('CEP inválido');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simula uma chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Calcula o frete baseado no preço do produto e nos primeiros dígitos do CEP
      const baseShipping = productPrice > 100 ? 0 : 15;
      const cepMultiplier = parseInt(cep.substring(0, 2)) / 10;
      const calculatedShipping = baseShipping * cepMultiplier;

      setShippingPrice(calculatedShipping);
    } catch (err) {
      setError('Erro ao calcular o frete');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-wood-dark">Calcular Frete</h3>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value.replace(/\D/g, '').slice(0, 8))}
          placeholder="Digite seu CEP"
          className="input flex-1"
        />
        <button
          onClick={calculateShipping}
          disabled={loading || !cep}
          className="btn btn-primary disabled:bg-border disabled:text-text-light disabled:cursor-not-allowed"
        >
          {loading ? 'Calculando...' : 'Calcular'}
        </button>
      </div>

      {error && (
        <p className="text-error text-sm">{error}</p>
      )}

      {shippingPrice !== null && !error && (
        <div className="mt-4 p-4 bg-cream-light rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-wood-dark">Frete:</span>
            <span className="text-secondary font-semibold">
              {shippingPrice === 0 ? 'Grátis' : `R$ ${shippingPrice.toFixed(2)}`}
            </span>
          </div>
          {shippingPrice === 0 && (
            <p className="text-success text-sm mt-2">
              Parabéns! Você ganhou frete grátis para este produto.
            </p>
          )}
        </div>
      )}
    </div>
  );
}; 
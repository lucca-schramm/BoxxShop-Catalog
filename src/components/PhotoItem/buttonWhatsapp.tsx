import React from 'react';

type ProductButtonProps = {
  name: string;
  description: string;
  url: string;
};

const ProductButton: React.FC<ProductButtonProps> = ({ name, description, url }) => {
  const handleClick = () => {
    const audio = new Audio("irra.mp3");
    audio.play();
    const whatsappNumber = '+5571986539026';
    const message = `Olá, gostei desse produto no catálogo e gostaria de encomendá-lo: 
    ${name}, ${description}.`;

    const encodedMessage = encodeURIComponent(message);
    const encodedImageUrl = encodeURIComponent(url);

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}%0a%0a${encodedImageUrl}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <button onClick={handleClick}>Abrir Conversa do WhatsApp</button>
  );
};

export default ProductButton;

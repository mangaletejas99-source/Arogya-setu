import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc = '/images/healthcare/placeholder-healthcare.svg',
  alt,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src ?? fallbackSrc);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (hasError) return;
    setHasError(true);
    setCurrentSrc(fallbackSrc);
  };

  return <img {...props} src={currentSrc} alt={alt} onError={handleError} />;
};

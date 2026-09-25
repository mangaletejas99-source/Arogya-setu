import React, { useEffect, useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc = '/assets/images/india-government-health/01-home-public-health.jpg',
  alt,
  loading,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src ?? fallbackSrc);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setCurrentSrc(src ?? fallbackSrc);
    setHasError(false);
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (hasError) return;
    if (currentSrc !== fallbackSrc) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
      return;
    }
    setHasError(true);
  };

  return (
    <img
      {...props}
      src={currentSrc}
      alt={alt}
      loading={loading ?? 'lazy'}
      decoding="async"
      onError={handleError}
      onLoad={() => setHasError(false)}
      style={{
        ...props.style,
        objectFit: 'cover',
        display: 'block',
        backgroundColor: '#edf7ff',
      }}
    />
  );
};

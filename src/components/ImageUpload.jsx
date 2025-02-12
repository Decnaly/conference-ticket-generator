import { useEffect, useCallback } from 'react';

export const ImageUpload = ({ onImageUpload }) => {
  const initializeCloudinaryWidget = useCallback(() => {
    if (window.cloudinary) {
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: 'drsnrnwyt',
          uploadPreset: 'generate-avatar',
          sources: ['local', 'url', 'camera'],
          multiple: false,
          maxFiles: 1,
          maxFileSize: 5000000, // 5MB
        },
        (error, result) => {
          if (!error && result && result.event === 'success') {
            onImageUpload(result.info.secure_url);
          }
        }
      );
      return widget;
    }
  }, [onImageUpload]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://upload-widget.cloudinary.com/global/all.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleUploadClick = () => {
    const widget = initializeCloudinaryWidget();
    if (widget) {
      widget.open();
    }
  };

  return (
    <button 
      type="button" 
      onClick={handleUploadClick}
      className="upload-button"
    >
      Upload Image
    </button>
  );
};
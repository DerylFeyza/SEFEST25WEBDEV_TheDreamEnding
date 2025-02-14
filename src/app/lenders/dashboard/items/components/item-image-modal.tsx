import Image from 'next/image';
import { X } from 'lucide-react';

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export default function ImageModal({ src, alt, onClose }: ImageModalProps) {
  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4'
      onClick={onClose}
    >
      <button
        className='absolute right-4 top-4 z-50 rounded-full bg-black bg-opacity-50 p-2 text-white'
        onClick={onClose}
      >
        <X size={24} />
      </button>

      <div
        className='relative h-auto max-h-[80vh] w-auto max-w-4xl'
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          width={800}
          height={600}
          className='object-contain'
        />
      </div>
    </div>
  );
}

import React from 'react';
import { Facebook, Twitter, Linkedin, Link } from 'lucide-react';
import toast from 'react-hot-toast';

interface SocialShareProps {
  url: string;
  title: string;
}

export const SocialShare: React.FC<SocialShareProps> = ({ url, title }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    toast.success('Link kopyalandı!');
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-600">Paylaş:</span>
      <div className="flex items-center gap-2">
        <a
          href={shareUrls.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-gray-400 hover:text-blue-600"
        >
          <Facebook className="w-5 h-5" />
        </a>
        <a
          href={shareUrls.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-gray-400 hover:text-blue-400"
        >
          <Twitter className="w-5 h-5" />
        </a>
        <a
          href={shareUrls.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-gray-400 hover:text-blue-700"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <button
          onClick={copyToClipboard}
          className="p-2 text-gray-400 hover:text-gray-900"
        >
          <Link className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
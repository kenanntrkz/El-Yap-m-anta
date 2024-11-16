import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ProductReviewsProps {
  productId: string;
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date'>) => void;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({
  productId,
  reviews,
  onAddReview,
}) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddReview({
      userName,
      rating,
      comment,
    });
    setRating(5);
    setComment('');
    setUserName('');
  };

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Ürün Değerlendirmeleri</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Değerlendirme Yap</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">İsminiz</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Puanınız</label>
              <div className="mt-1 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Yorumunuz</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Değerlendirme Yap
            </button>
          </form>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Değerlendirmeler ({reviews.length})
          </h3>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{review.userName}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString('tr-TR')}
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
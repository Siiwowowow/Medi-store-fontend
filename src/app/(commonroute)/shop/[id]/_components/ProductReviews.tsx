"use client";

import { Star } from "lucide-react";

interface Review {
  id: number;
  name: string;
  date: string;
  rating: number;
  comment: string;
  avatar: string;
}

interface RatingDistribution {
  [key: number]: number;
}

interface ProductReviewsProps {
  reviews?: Review[];
  ratingDistribution?: RatingDistribution;
  totalReviews?: number;
  avgRating?: number;
}

const defaultReviews: Review[] = [
  {
    id: 1,
    name: "Sarah Ahmed",
    date: "March 15, 2026",
    rating: 5,
    comment: "Excellent medicine! Very effective for fever and headache. Fast relief. Highly recommended!",
    avatar: "S"
  },
  {
    id: 2,
    name: "Rafiq Hasan",
    date: "March 10, 2026",
    rating: 4,
    comment: "Good product, works well. Delivery was on time. The packaging was secure.",
    avatar: "R"
  },
  {
    id: 3,
    name: "Tahmina Akter",
    date: "March 5, 2026",
    rating: 5,
    comment: "Highly recommended! Genuine product and great service. Will buy again.",
    avatar: "T"
  },
  {
    id: 4,
    name: "Imran Khan",
    date: "February 28, 2026",
    rating: 4,
    comment: "Very good medicine. Fast delivery and authentic product.",
    avatar: "I"
  },
  {
    id: 5,
    name: "Nusrat Jahan",
    date: "February 20, 2026",
    rating: 5,
    comment: "Best medicine for fever. Works like magic!",
    avatar: "N"
  },
];

const defaultRatingDistribution: RatingDistribution = {
  5: 120,
  4: 60,
  3: 30,
  2: 15,
  1: 9,
};

export default function ProductReviews({ 
  reviews = defaultReviews,
  ratingDistribution = defaultRatingDistribution,
  totalReviews = 234,
  avgRating = 4.8
}: ProductReviewsProps) {
  const getRatingPercentage = (stars: number) => {
    return (ratingDistribution[stars] / totalReviews) * 100;
  };

  return (
    <div id="reviews" className="bg-[#f6f6f6] py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <h2 className="text-2xl font-bold text-[#151515] mb-8">Customer Reviews</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* LEFT - Rating Summary */}
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl p-8 border border-gray-100">
            <div className="text-center">
              <span className="text-[72px] font-bold text-[#063c28] leading-none">{avgRating}</span>
              <div className="flex gap-1 mt-2 justify-center">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="w-5 h-5"
                    fill={i <= Math.round(avgRating) ? "#fb6c08" : "none"}
                    stroke="#fb6c08"
                  />
                ))}
              </div>
              <p className="text-sm text-[#52525b] mt-2">Based on {totalReviews} reviews</p>
            </div>

            {/* Rating Bars */}
            <div className="w-full mt-8 space-y-3">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm font-medium text-[#151515]">{star}</span>
                    <Star className="w-3.5 h-3.5 fill-[#fb6c08] stroke-[#fb6c08]" />
                  </div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-[#3b9c3c]"
                      style={{ width: `${getRatingPercentage(star)}%` }}
                    />
                  </div>
                  <span className="text-xs text-[#52525b] w-12 text-right">{ratingDistribution[star]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT - Reviews List */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="flex gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-[#fcf0e4] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#063c28] font-bold text-sm">{review.avatar}</span>
                  </div>
                  
                  {/* Review Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h4 className="font-bold text-[#151515]">{review.name}</h4>
                      <span className="text-xs text-gray-400">{review.date}</span>
                    </div>
                    
                    {/* Rating Stars */}
                    <div className="flex gap-0.5 mt-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5"
                          fill={i <= review.rating ? "#fb6c08" : "none"}
                          stroke="#fb6c08"
                        />
                      ))}
                    </div>
                    
                    {/* Comment */}
                    <p className="text-sm text-[#52525b] mt-2 leading-relaxed">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
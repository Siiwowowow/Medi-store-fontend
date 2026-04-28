export default function SkeletonCard() {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden"
      style={{ border: "1px solid #e5e7eb" }}
    >
      {/* Image */}
      <div
        className="animate-shimmer"
        style={{
          aspectRatio:       "1 / 1",
          background:        "linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)",
          backgroundSize:    "200% 100%",
        }}
      />
      {/* Body */}
      <div className="p-3.5 space-y-2.5">
        <div className="h-2.5 rounded-full w-16 bg-gray-100 animate-shimmer"
          style={{ background: "linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)", backgroundSize: "200% 100%" }}
        />
        <div className="h-3.5 rounded w-full bg-gray-100 animate-shimmer"
          style={{ background: "linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)", backgroundSize: "200% 100%" }}
        />
        <div className="h-3.5 rounded w-3/4 bg-gray-100 animate-shimmer"
          style={{ background: "linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)", backgroundSize: "200% 100%" }}
        />
        <div className="h-5 rounded w-1/2 bg-gray-100 animate-shimmer"
          style={{ background: "linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)", backgroundSize: "200% 100%" }}
        />
        <div className="h-9 rounded-[10px] w-full bg-gray-100 animate-shimmer mt-1"
          style={{ background: "linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)", backgroundSize: "200% 100%" }}
        />
      </div>
    </div>
  );
}
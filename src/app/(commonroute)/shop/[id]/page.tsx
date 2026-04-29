import { Metadata } from "next";
import { notFound } from "next/navigation";
import { medicineService } from "@/services/medicine.service";
import ProductDetails from "./_components/ProductDetails";
import ProductReviews from "./_components/ProductReviews";
import RelatedProducts from "./_components/RelatedProducts";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const medicine = await medicineService.getMedicineById(id);

  if (!medicine) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${medicine.name} | MediStore`,
    description: medicine.description,
  };
}

export default async function ProductDetailsPage({ params }: Props) {
  const { id } = await params;
  const medicine = await medicineService.getMedicineById(id);

  if (!medicine) {
    notFound();
  }

  // Fetch related products from same category
  const relatedResponse = await medicineService.getAllMedicines({
    categoryId: medicine.category?.id,
    limit: 10,
  });

  const relatedProducts = relatedResponse?.data || [];

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-[#f6f6f6] border-b border-gray-100 py-3">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="text-sm text-[#52525b]">
            <span>Home</span>
            <span className="mx-1">/</span>
            <span>Shop</span>
            <span className="mx-1">/</span>
            <span>{medicine.category?.name || "Medicine"}</span>
            <span className="mx-1">/</span>
            <span className="text-[#063c28] font-medium">{medicine.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <ProductDetails medicine={medicine} />

      {/* Reviews Section */}
      <ProductReviews />

      {/* Related Products */}
      <RelatedProducts products={relatedProducts} currentProductId={medicine.id} />
    </div>
  );
}
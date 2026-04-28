import { Metadata } from "next";
import ShopClient from "./_components/ShopClient";

export const metadata: Metadata = {
  title: "Medicine Shop",
  description: "Browse 10,000+ genuine OTC medicines from verified sellers.",
};

interface Props {
  searchParams: Promise<{
    search?:       string;
    categoryId?:   string;
    manufacturer?: string;
    minPrice?:     string;
    maxPrice?:     string;
    page?:         string;
  }>;
}

export default async function ShopPage({ searchParams }: Props) {
  const params = await searchParams;
  return <ShopClient initialParams={params} />;
}
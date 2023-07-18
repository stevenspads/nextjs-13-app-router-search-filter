import { NextRequest, NextResponse } from "next/server";
import products from "@/data/products.json";

export async function GET(
  req: NextRequest,
  { params: { search } }: { params: { search: string } }
) {
  try {
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );

    return NextResponse.json(results);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

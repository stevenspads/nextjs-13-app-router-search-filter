import Search from "@/components/search";
import { Product } from "@/lib/types";

export default async function Home({
  params,
  searchParams: { search },
}: {
  params: {};
  searchParams: { search: string };
}) {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/search/${search}`,
    {
      method: "GET",
    }
  );

  const products: Product[] = await result.json();

  const productsData = products.length ? (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Search Results</h2>
      {products.map(({ id, name }) => (
        <article key={id}>
          <h3>{name}</h3>
        </article>
      ))}
    </div>
  ) : search ? (
    <p className="bg-gray-100 rounded-lg text-gray-500 p-4 text-center">
      No results found.
    </p>
  ) : (
    <p>Search for a product.</p>
  );

  return (
    <main className="container mx-auto space-y-6 my-6">
      <h1 className="text-2xl font-bold">Search for products</h1>

      <Search />

      {products.length > 0 && <p>{products.length} results.</p>}

      <section>{productsData}</section>
    </main>
  );
}

import { PAGE_SIZE } from "@/config";
import Pagination from "@/components/pagination";
import Newsline from "@/components/post";

async function getNews(id: number) {
  const res = await fetch(
    `http://localhost:3001/post?page=${id}&limit=${PAGE_SIZE}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home({ params }: { params: { id: number } }) {
  console.log(params);

  const response = await getNews(params.id);

  const pageNumbers = Array.from(
    { length: Math.ceil(Number(response.total) / PAGE_SIZE) },
    (_, index) => index + 1
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-10 py-5">
      <h1 className="text-3xl">New York Times</h1>
      <Newsline data={response.posts} />
      <Pagination page={params.id} pageNumbers={pageNumbers} />
    </main>
  );
}

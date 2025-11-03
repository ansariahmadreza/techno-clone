import { Metadata } from "next";
import { RootProduct } from "../components/mainPage/helper/swipercarsouel";
import Link from "next/link";
import { formatNumberWithCommas } from "@/utils/number";
import { FaStar } from "react-icons/fa";
import Container from "../../Container";
import Paginate from "../components/Pagination";

export const metadata: Metadata = {
  title: "نمایش محصولات",
};

export interface IStoreProps {
  params: Promise<object>;
  searchParams: Promise<{ page: string; per_page: string; title: string }>;
}

const Products = async ({ searchParams }: IStoreProps) => {
  const page = (await searchParams).page ?? "1";
  const per_page = (await searchParams).per_page ?? "6";
  const title = (await searchParams).title ?? "";

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(
    `${baseUrl}/Products?_page=${page}&_per_page=${per_page}&title=${title}`
  );
  const info = (await res.json()) as RootProduct;

  return (
    <div>
      <Container>
        <section className="my-8 min-h-screen flex flex-col">
          {title && (
            <div className="flex justify-center mb-8">
              <Link
                href={`/store?page=${page}&per_page=${per_page}`}
                className="border border-gray-300 rounded-lg px-5 py-2 bg-white text-gray-700 font-medium shadow-sm hover:bg-gray-100 transition">
                برگشت به صفحه محصولات
              </Link>
            </div>
          )}


          <div className="grid grid-cols-1 sm:grid-cols-2 h-[50%] lg:grid-cols-3 gap-6">
            {info.data.map((item) => (
              <Link key={item.id} href={`/store/${item.id}`} target="_blank">
                <section className="flex flex-col justify-between bg-white shadow-lg rounded-2xl border hover:shadow-xl transition p-4 h-full">
                  <h2 className="text-gray-600 text-sm mb-2 line-clamp-1">{item.title}</h2>
                  <img className="w-40 h-32 object-contain mx-auto mb-3" src={item.image} alt={item.description} referrerPolicy="no-referrer" loading="lazy" title={item.description} />
                  <div className="flex justify-center items-center gap-1 text-gray-800 font-semibold">
                    <span>{formatNumberWithCommas(item.Price)}</span>
                    <span className="text-sm">تومان</span>
                  </div>

                  <p className="text-gray-500 text-sm text-center mt-2 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex justify-end items-center gap-1 mt-3 text-yellow-400">
                    <FaStar />
                    <p className="text-gray-700">{item.Score}</p>
                  </div>
                </section>
              </Link>
            ))}
          </div>
        </section>
      </Container>
      <div className="mt-10 min-h-[60px]">
        <Paginate pageCount={info.pages} />
      </div>
    </div>
  );
};

export default Products;

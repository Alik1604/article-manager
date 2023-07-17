"use client";
import { useState } from "react";
import Image from "next/image";
import Search from "../serarch";

function Newsline({ data }: { data: any[] }) {
  const [news, setNews] = useState(data);
  const [sortBy, setSortBy] = useState("date");

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSortBy = event.target.value;
    setSortBy(selectedSortBy);
    sortNews(selectedSortBy);
  };

  const sortNews = (sortOption: string) => {
    let sortedNews = [...news];
    if (sortOption === "alphabet") {
      sortedNews.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "date") {
      sortedNews.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
    setNews(sortedNews);
  };

 
  return (
    <>
      <div className="flex w-[60%] flex-col">
        <label className="flex flex-col gap-1">
          Select sort by:
          <select
            placeholder="select filter"
            className="p-2 rounded-xl w-[20%] justify-self-start"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="date">date</option>
            <option value="alphabet">alphabet</option>
          </select>
        </label>

        <Search />
      </div>
      <div className="z-10 w-full items-center justify-center lg:flex flex-col gap-5 mt-5">
        {news.map((post: any) => {
          return (
            <div className="p-4 border-2 border-black w-[60%] rounded-xl flex-col hover:scale-110 duration-300">
              <a href={post.link} key={post.id}>
                <div className="flex items-center gap-3">
                  {post.img !== null && post.img !== undefined ? (
                    <img
                      className="rounded-xl"
                      src={post.img}
                      height={48}
                      width={48}
                      alt={""}
                    />
                  ) : (
                    <Image
                      src={"/newspaper.png"}
                      height={48}
                      width={48}
                      alt={""}
                    />
                  )}
                  <h6 className="text-2xl">{post.title}</h6>
                </div>
                <p className="mt-4 text-lg">{post.content}</p>
                <div className="flex justify-between mt-4">
                  <p className="text-sm">{"Written by: " + post.creator}</p>
                  <p className="text-sm">
                    {new Date(post.date).toLocaleString()}
                  </p>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Newsline;

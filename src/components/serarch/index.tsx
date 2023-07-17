"use client";
import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import Image from "next/image";

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const { data, error, isLoading } = useSWR(
    searchQuery
      ? `http://localhost:3001/post/search?title=${searchQuery}`
      : null,
    fetcher
  );

  if (error) return <div>ошибка загрузки</div>;


  return (
    <>
      <input
        placeholder="Search for news"
        className="p-2 rounded-xl w-full mt-5"
        value={searchQuery}
        onChange={handleSearch}
      />
      {data?.length === 0 ? (
        <>
          <div className="text-center mt-5">
            Нам очень жаль! По вашему запросу ничего не найдено
          </div>
          <div className="h-[1px] bg-black w-full mt-5"></div>
        </>
      ) : null}
      {data?.length > 0 ? (
        <div className="z-10 w-full items-center justify-center lg:flex flex-col gap-5 mt-5">
          {data.map((post: any) => {
            return (
              <div className="p-4 border-2 border-black w-[100%] rounded-xl flex-col hover:scale-110 duration-300">
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
          <div className="h-[1px] bg-black w-full mt-5"></div>
        </div>
      ) : null}
    </>
  );
}

export default Search;

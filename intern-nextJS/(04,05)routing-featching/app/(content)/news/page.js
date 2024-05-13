"use client";

import NewsList from "@/components/news-list";
import { useEffect, useState } from "react";

export default function NewsPage() {
  const [error, setError] = useState();
  const [news, setNews] = useState();

   useEffect(() => {
     const fetchNew = async () => {
       try {
         const res = await fetch("http://localhost:8080/news");

         if (!res.ok) {
           setError("Failed to fetch news");
         }

         const news = await res.json();
         setNews(news);
       } catch (error) {
         setError("Failed to fetch news");
       }
     };

     fetchNew();
   }, []);

  if (error) {
    return <p>{error}</p>;
  }

  let newContent;

  if (news) {
    newContent = <NewsList news={news} />;
  }

  return (
    <>
      <h1>News Page</h1>
      {newContent}
    </>
  );
}

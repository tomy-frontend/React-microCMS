import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../assets/libs/Client";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BlogPostPage = () => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await client.get({
          endpoint: "blogs",
          contentId: id,
        });
        setPost(fetchedPost);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch the blog post");
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (isLoading)
    return (
      <div className="grid place-content-center w-screen h-screen">
        Now Loading...
      </div>
    );
  if (error) return <div>{error}</div>;
  if (!post) return <div>まだ投稿はありません。</div>;

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div
            className="prose lg:prose-xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
      <Footer />
    </>
  );
};

export default BlogPostPage;

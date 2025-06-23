import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { client } from "./assets/libs/Client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BlogPostPage from "./components/BlogPostPage";
import About from "./components/About";
import Contact from "./components/Contact";

function App() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const apiResponse = await client.getList({ endpoint: "blogs" });

      // setBlogPostsを更新するための関数、apiResponseで取得したブログの内容を更新する。contentsはmicroCMSで用意されたデータの配列
      setBlogPosts(apiResponse.contents);
    };

    fetchBlogPosts();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="grid grid-rows-layout min-h-dvh">
              <Header />
              <main>
                <section className="mt-10 px-4 container mx-auto md:px-8">
                  <h2 className="text-4xl font-extrabold">- BLOG -</h2>
                  <div className="container mx-auto gap-x-3 gap-y-6 grid grid-cols-1 mt-4 md:grid-cols-2 lg:grid-cols-3">
                    {blogPosts.map((post) => (
                      <article key={post.id} className="group contents">
                        <Link
                          to={`/blog/${post.id}`}
                          className="w-full bg-gray-100 rounded-xl p-4 grid grid-rows-subgrid row-span-3 gap-4"
                        >
                          <h2 className="text-xl font-bold order-2 line-clamp-2">
                            {post.title}
                          </h2>
                          <div
                            className="order-3 line-clamp-3"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                          />
                          <div className="overflow-hidden aspect-[16/10] order-1 rounded-md">
                            <img
                              className="w-full h-full object-cover duration-300 group-hover:scale-105"
                              src={post.eyecatch.url}
                              alt="blogアイキャッチ画像"
                              width="600"
                              height="600"
                              loading="lazy"
                            />
                          </div>
                        </Link>
                      </article>
                    ))}
                  </div>
                </section>
              </main>
              <Footer />
            </div>
          }
        />
        <Route path="/blog/:id" element={<BlogPostPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;

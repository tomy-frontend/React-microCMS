import Footer from "./Footer";
import Header from "./Header";

const About = () => {
  return (
    <>
      <Header />
      <main>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">About Me</h1>
          <p className="mb-4">これはaboutページですよ。</p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default About;

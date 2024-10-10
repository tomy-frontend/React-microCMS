import Header from "./Header";
import Footer from "./Footer";

const contact = () => {
  return (
    <>
      <Header />
      <main>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">contact Me</h1>
          <p className="mb-4">これはコンタクトページですよ。</p>
          <p className="mb-4">
            今から頑張ってReact Hook Formでコンタクトフォームを作成します。
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default contact;

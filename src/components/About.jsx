import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";

const About = () => {
  const [projectType, setProjectType] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [cmsCount, setCmsCount] = useState(0);
  const [contactForms, setContactForms] = useState(0);
  const [isPriority, setIsPriority] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    calculateTotal();

    // 各配列の値が更新されるたびに、calculateTotal関数がuseEffectによって呼び出される
  }, [projectType, pageCount, cmsCount, contactForms, isPriority]);

  // calculateTotalの計算関数
  const calculateTotal = () => {
    // 変数calculateTotalを定義、最初は0
    let calculateTotal = 0;

    // projectTypeがLPかmultiPageかで金額を判断する
    if (projectType === "LP") {
      calculateTotal += 70000;
    } else if (projectType === "multiPage") {
      calculateTotal += 100000;
    }

    // pageCount等の数 * 金額
    calculateTotal += pageCount * 20000;
    calculateTotal += cmsCount * 10000;
    calculateTotal += contactForms * 10000;

    // もしisPriorityにチェックが入っていればcalculateTotalに20000プラスする
    if (isPriority) {
      calculateTotal += 20000;
    }

    setTotal(calculateTotal);
  };

  return (
    <>
      <Header />
      <main>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">About Me</h1>
          <p className="mb-4">aboutページです</p>
          <hr />
          <h2 className="pt-4 font-bold text-xl md:text-3xl">
            お見積もり金額シュミレーター
          </h2>
          <h3 className="mt-4 text-2xl font-medium">制作種類</h3>
          <div className="flex items-center gap-4">
            <label
              className="font-medium flex items-center gap-1"
              htmlFor="projectTypeLP"
            >
              <input
                type="radio"
                name="projectType"
                id="projectTypeLP"
                value="LP"
                checked={projectType === "LP"}
                onChange={(e) => setProjectType(e.target.value)}
              />
              LP(70,000円)
            </label>
            <label
              className="font-medium flex items-center gap-1"
              htmlFor="projectTypeMultiPage"
            >
              <input
                type="radio"
                name="projectType"
                id="projectTypeMultiPage"
                value="multiPage"
                checked={projectType === "multiPage"}
                onChange={(e) => setProjectType(e.target.value)}
              />
              複数ページサイトの構築(100,000円)
            </label>
          </div>

          <h3 className="mt-4 text-2xl font-medium">下層ページ数</h3>
          <div className="flex items-center gap-4">
            <input
              className="p-2 bg-gray-200 rounded-xl"
              type="number"
              min="0"
              value={pageCount}
              onChange={(e) => setPageCount(parseInt(e.target.value) || 0)}
            />
          </div>

          <h3 className="mt-4 text-2xl font-medium">投稿機能(CMS)数</h3>
          <div className="flex items-center gap-4">
            <input
              className="p-2 bg-gray-200 rounded-xl"
              type="number"
              min="0"
              value={cmsCount}
              onChange={(e) => setCmsCount(parseInt(e.target.value) || 0)}
            />
          </div>

          <h3 className="mt-4 text-2xl font-medium">コンタクトフォームの数</h3>
          <div className="flex items-center gap-4">
            <input
              className="p-2 bg-gray-200 rounded-xl"
              type="number"
              min="0"
              value={contactForms}
              onChange={(e) => setContactForms(parseInt(e.target.value) || 0)}
            />
          </div>

          <h3 className="mt-4 text-2xl font-medium">優先(急ぎ)対応</h3>
          <div className="flex items-center gap-4">
            <label className="font-medium flex gap-1" htmlFor="priority">
              <input
                type="checkbox"
                name="priority"
                id="priority"
                checked={isPriority}
                onChange={(e) => setIsPriority(e.target.checked)}
              />
              あり
            </label>
          </div>

          <p className="mt-4 text-3xl font-medium text-center">
            合計金額:{total}円
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default About;

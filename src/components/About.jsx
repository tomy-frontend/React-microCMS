import { useCallback, useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";

const About = () => {
  const [projectType, setProjectType] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [cmsCount, setCmsCount] = useState(0);
  const [contactForms, setContactForms] = useState(0);
  const [isPriority, setIsPriority] = useState(false);
  const [total, setTotal] = useState(0);

  // calculateTotalの計算関数
  const calculateTotal = useCallback(() => {
    // 変数calculateTotalを定義、最初は0
    let calculatedTotal = 0;

    // projectTypeが"LP"か"multiPage"かで金額を判断する。
    if (projectType === "LP") {
      calculatedTotal += 70000;
    } else if (projectType === "multiPage") {
      // pageCount等の数 * 金額の計算
      calculatedTotal += 100000;
      calculatedTotal += pageCount * 20000;
      calculatedTotal += cmsCount * 10000;
    }

    // contactFormsの数 * 金額
    calculatedTotal += contactForms * 10000;

    // もしisPriorityにチェックが入っていればcalculateTotalに20000プラスする
    if (isPriority) {
      calculatedTotal += 20000;
    }

    // setTotalの値を更新する処理
    setTotal(calculatedTotal);
    // useCallbackの発火タイミングは、projectType...等の関数が更新されたとき
  }, [projectType, pageCount, cmsCount, contactForms, isPriority]);

  useEffect(() => {
    calculateTotal();

    // calculateTotalが更新されるたびに、calculateTotal関数がuseEffectによって呼び出される
  }, [calculateTotal]);

  return (
    <>
      <Header />
      <main>
        <div className="container mx-auto px-4 py-8">
          <h1 className="pt-4 font-bold text-xl md:text-3xl">
            お見積もり金額シュミレーター
          </h1>
          <div className="mt-6 md:flex">
            <div className="md:w-3/5 bg-gray-200 px-3 py-4">
              <h2 className="text-2xl font-medium">制作種類</h2>
              <div className="mt-2 flex items-center gap-4">
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

              {/* 条件付きレンダリング、projectTypeが"multiPage"と一致している場合のみ下記表示する */}
              {projectType === "multiPage" && (
                <>
                  <h2 className="mt-4 text-2xl font-medium">下層ページ数</h2>
                  <div className="mt-2 flex items-center gap-4">
                    <input
                      className="p-3 bg-white rounded-xl"
                      type="number"
                      min="0"
                      value={pageCount}
                      onChange={(e) =>
                        setPageCount(parseInt(e.target.value) || 0)
                      }
                    />
                  </div>
                  <h2 className="mt-4 text-2xl font-medium">投稿機能(CMS)数</h2>
                  <div className="mt-2 flex items-center gap-4">
                    <input
                      className="p-3 bg-white rounded-xl"
                      type="number"
                      min="0"
                      value={cmsCount}
                      onChange={(e) =>
                        setCmsCount(parseInt(e.target.value) || 0)
                      }
                    />
                  </div>
                </>
              )}

              <h2 className="mt-4 text-2xl font-medium">
                コンタクトフォームの数
              </h2>
              <div className="flex items-center gap-4">
                <input
                  className="mt-2 p-3 bg-white rounded-xl"
                  type="number"
                  min="0"
                  value={contactForms}
                  onChange={(e) =>
                    setContactForms(parseInt(e.target.value) || 0)
                  }
                />
              </div>
              <h2 className="mt-4 text-2xl font-medium">優先(急ぎ)対応</h2>
              <div className="flex items-center gap-4">
                <label
                  className="mt-2 font-medium flex gap-1"
                  htmlFor="priority"
                >
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
            </div>
            <div className="grid place-content-center bg-gray-100 md:flex-1 py-6">
              <p className="text-3xl font-medium text-center">
                {/* toLocalStringによって現地の通貨単位に合わせる。40,000円とかの,をつけてくれる */}
                合計金額:{total.toLocaleString()}円
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default About;

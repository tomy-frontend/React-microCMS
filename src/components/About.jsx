import { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const About = () => {
  const [projectType, setProjectType] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [cmsCount, setCmsCount] = useState(0);
  const [contactForms, setContactForms] = useState(0);
  const [isPriority, setIsPriority] = useState(false);
  const [total, setTotal] = useState(0);
  const [workHoursPerDay, setWorkHoursPerDay] = useState(8); // Add state for work hours per day
  const [totalHours, setTotalHours] = useState(0);

  // calculateTotalの計算関数
  const calculateTotal = useCallback(() => {
    // 変数calculateTotalを定義、最初は0
    let calculatedTotal = 0;
    // 作業時間計算用の変数
    let calculatedHours = 0;

    // projectTypeが"LP"か"multiPage"かで金額を判断する。
    if (projectType === "LP") {
      calculatedTotal += 70000;
      calculatedHours += 32; // LP制作の基本時間
    } else if (projectType === "multiPage") {
      // pageCount等の数 * 金額の計算
      calculatedTotal += 100000;
      calculatedHours += 60; // 複数ページの基本時間

      calculatedTotal += pageCount * 20000;
      calculatedHours += pageCount * 8; // 1ページあたり8時間

      calculatedTotal += cmsCount * 10000;
      calculatedHours += cmsCount * 2; // 1CMS機能あたり2時間
    }

    // contactFormsの数 * 金額
    calculatedTotal += contactForms * 10000;
    calculatedHours += contactForms * 3; // 1フォームあたり3時間

    // もしisPriorityにチェックが入っていればcalculateTotalに20000プラスする
    if (isPriority) {
      calculatedTotal += 20000;
      // 優先対応の場合は作業時間が20%短縮
      calculatedHours = Math.ceil(calculatedHours * 0.8);
    }

    // setTotalとsetTotalHoursの値を更新する処理
    setTotal(calculatedTotal);
    setTotalHours(calculatedHours);
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
            ざっくりお見積もり金額シュミレーター
          </h1>
          <div className="mt-6 md:flex mx-auto max-w-4xl">
            <div className="md:w-3/6  bg-gray-200 px-3 py-4 rounded-tl-lg rounded-tr-lg md:rounded-tr-none md:rounded-bl-lg">
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
            <div className="grid place-content-center bg-gray-100 md:flex-1 py-6 rounded-bl-lg rounded-br-lg md:rounded-bl-none md:rounded-tr-lg">
              <p className="text-3xl font-medium text-center">
                合計時間：約{Math.round(totalHours)}時間
              </p>
              <p className="text-xl font-medium text-center">
                {workHoursPerDay ? (
                  <>
                    <span className="text-2xl">
                      約{Math.round(totalHours / workHoursPerDay)}日
                    </span>
                  </>
                ) : null}
                <select
                  value={workHoursPerDay}
                  onChange={(e) => setWorkHoursPerDay(parseInt(e.target.value))}
                  className="ml-1 text-lg rounded-md"
                >
                  <option value="8">8時間 /日</option>
                  <option value="10">10時間 /日</option>
                  <option value="12">12時間 /日</option>
                  <option value="14">14時間 /日</option>
                  <option value="16">16時間 /日</option>
                </select>
                <span className="ml-1 text-2xl font-medium text-center">
                  {workHoursPerDay >= 16 && "😇"}
                  {workHoursPerDay >= 14 && workHoursPerDay < 16 && "🤯"}
                  {workHoursPerDay >= 12 && workHoursPerDay < 14 && "🤔"}
                  {workHoursPerDay >= 10 && workHoursPerDay < 12 && "😉"}
                  {workHoursPerDay >= 8 && workHoursPerDay < 10 && "🥰"}
                </span>
              </p>

              <p className="mt-3 text-3xl font-medium text-center">
                合計金額：{total.toLocaleString()}円
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

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
  const [workHoursPerDay, setWorkHoursPerDay] = useState(8);
  const [totalHours, setTotalHours] = useState(0);

  // calculateTotalの計算関数
  const calculateTotal = useCallback(() => {
    let calculatedTotal = 0;
    let calculatedHours = 0;

    if (projectType === "LP") {
      calculatedTotal += 70000; // LP制作の基本金額
      calculatedHours += 32; // LP制作の基本時間
    } else if (projectType === "multiPage") {
      calculatedTotal += 100000; // 複数ページサイトの基本金額
      calculatedHours += 40; // 複数ページサイトの基本時間

      calculatedTotal += pageCount * 20000; // ページ数 * 1ページあたりの金額
      calculatedHours += pageCount * 6; // 1ページあたり6時間

      calculatedTotal += cmsCount * 5000; // CMS機能数 * 1CMS機能あたりの金額
      calculatedHours += cmsCount * 2; // 1CMS機能あたり2時間
    }

    // contactFormsの数 * 金額
    calculatedTotal += contactForms * 10000;
    calculatedHours += contactForms * 2; // 1フォームあたり2時間

    // もしisPriorityにチェックが入っていればcalculateTotalに+10%
    if (isPriority) {
      calculatedTotal += calculatedTotal * 0.1;
      // 優先対応の場合は作業時間が20%短縮
      calculatedHours = Math.ceil(calculatedHours * 0.8);
    }

    // setTotalとsetTotalHoursの値を更新する処理
    setTotal(calculatedTotal);
    setTotalHours(calculatedHours);
    // useCallbackの発火タイミングは、projectType...等の関数が更新されたとき
  }, [projectType, pageCount, cmsCount, contactForms, isPriority]);

  // マウント時にcalculateTotalを実行
  useEffect(() => {
    calculateTotal();
  }, [calculateTotal]);

  return (
    <>
      <Header />
      <main>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <h1 className="pt-4 font-bold text-xl md:text-3xl">
            ざっくりお見積もり金額シュミレーター
          </h1>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 shadow-sm">
            <p className="text-gray-700 mb-2">
              設定を選択するだけで、プロジェクトに必要な時間と費用をお見積もり(ざっくり)することができます。
            </p>
            <p className="text-gray-600 text-sm">
              ※実際の費用は、詳細な要件によって変動する場合があります。正確な見積もりについてはお問い合わせください。
            </p>
          </div>
          <div className="mt-8 md:flex mx-auto max-w-4xl">
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
                  LP(基本料金70,000円)
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
                  複数ページサイトの構築(基本料金100,000円)
                </label>
              </div>

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
              <h2 className="mt-4 text-2xl font-medium">優先対応(+10%)</h2>
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
            <div className="grid place-content-center gap-1 bg-gray-100 md:flex-1 py-6 rounded-bl-lg rounded-br-lg md:rounded-bl-none md:rounded-tr-lg">
              <p className="text-3xl font-medium text-center">
                合計時間：約{Math.round(totalHours)}時間
              </p>

              <p className=" text-xl font-medium text-center">
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

              <p className=" text-3xl font-medium text-center">
                合計金額：{total.toLocaleString()}円
                <span className="text-base">(税込)</span>
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

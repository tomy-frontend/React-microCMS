import Header from "./Header";
import Footer from "./Footer";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const contact = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const onSubmit = (data) => console.log(data);

  console.log(watch("example"));

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Header />
      <main>
        <div className="container mx-auto px-4 py-8">
          <div className="container max-w-xl mx-auto">
            <h1 className="text-3xl font-semibold text-center">お問い合わせ</h1>
            <p className="mt-2 text-center">
              このフォームはReact Hook Formで作成しました。
            </p>
            {/* React Hook Form */}
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              <label className="mt-3" htmlFor="name">
                名前
                <span className="ml-2 text-red-500 font-medium text-xs align-top">
                  *必須
                </span>
              </label>
              <input
                {...register("name", {
                  required: "必須項目です。",
                })}
                aria-invalid={errors.name ? "true" : "false"}
                className="mt-1 bg-gray-200 rounded-lg p-2 w-full"
                id="name"
                type="text"
              />
              {errors.name && (
                <span className="mt-1 text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}

              <label className="mt-3" htmlFor="email">
                メールアドレス
                <span className="ml-1 text-red-500 font-medium text-xs align-top">
                  *必須
                </span>
              </label>
              <input
                {...register("email", {
                  required: "必須項目です。",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "有効なメールアドレスを入力してください。",
                  },
                })}
                aria-invalid={errors.email ? "true" : "false"}
                className="mt-1 bg-gray-200 rounded-lg p-2 w-full"
                id="email"
                type="email"
              />
              {errors.email && (
                <span className="mt-1 text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}

              <label className="mt-3" htmlFor="password">
                パスワード
                <span className="ml-1 text-red-500 font-medium text-xs align-top">
                  *必須
                </span>
              </label>

              <div className="relative">
                <input
                  {...register("password", {
                    required: "必須項目です。",
                    minLength: {
                      value: 8,
                      message: "8文字以上で入力してください。",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                      message:
                        "パスワードは少なくとも1つの大文字、小文字、数字を含む必要があります。",
                    },
                  })}
                  aria-invalid={errors.password ? "true" : "false"}
                  className="mt-1 bg-gray-200 rounded-lg p-2 pr-11 w-full"
                  id="password"
                  type={showPassword ? "text" : "password"}
                />
                <button
                  type="button"
                  aria-label={
                    showPassword ? "パスワードを隠す" : "パスワードを表示する"
                  }
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 top-1 right-0 px-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="mt-1 text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}

              <label className="mt-3" htmlFor="textarea">
                お問い合わせ内容
              </label>
              <textarea
                {...register("textarea")}
                aria-invalid={errors.message ? "true" : "false"}
                className="mt-1 bg-gray-200 rounded-lg p-2 w-full"
                name="textarea"
                id="textarea"
                rows="5"
              ></textarea>

              <button
                className="mt-3 bg-blue-600 text-white duration-300 font-bold rounded-lg p-4 hover:bg-blue-500"
                type="submit"
              >
                送信
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default contact;

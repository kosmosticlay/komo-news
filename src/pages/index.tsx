import Head from "next/head";
import Header from "@/components/header/Header";
import { useEffect, useState } from "react";
import useUser from "./api/client/useUser";
import { SubmitHandler, useForm } from "react-hook-form";
import useMutation from "./api/client/useMutation";
import Card from "@/components/article/Card";
import ImageCard from "@/components/article/ImageCard";
import { Article } from "@prisma/client";
import useSWR from "swr";
import Link from "next/link";
import { useRouter } from "next/router";
import Footer from "@/components/footer/Footer";

interface IUserData {
  id: number;
  username: string;
  email: string;
  phone?: string;
  github_id?: string;
  imageUrl?: string;
  created_at: Date;
  updated_at: Date;
  avatar?: string;
}

interface IArticle {
  id: number;
  userId: number;
  title: string;
  description: string;
  hashtags: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  user: IUserData;
}

interface IArticleForm {
  title: string;
  imageUrl?: FileList | string;
  hashtags?: string;
  description: string;
}

interface UploadArticleMutation {
  ok: boolean;
  message: string;
  location?: string;
  article: Article;
}

export default function Home() {
  const router = useRouter();
  const { data: dataGET } = useSWR("/api/articles");
  const [uploadProduct, { loading, data }] = useMutation("/api/articles");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IArticleForm>();
  const [isWriting, setIsWriting] = useState(false);
  const user = useUser();

  const [toggleFav] = useMutation(
    `/api/articles/${router?.query?.id}/favorite`
  );

  const onFavClick = () => {
    toggleFav({});
  };

  const handleAddArticle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsWriting((prev) => !prev);
  };

  const handleCancelWriting = () => {
    setIsWriting(false);
  };

  const onSubmitArticle: SubmitHandler<IArticleForm> = (data) => {
    uploadProduct(data);
    reset();
    alert("Your article has been submitted!");
    setIsWriting(false);
  };

  // + 버튼 누르면 Overlay
  useEffect(() => {
    const body = document.body;
    if (isWriting) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }

    return () => {
      body.style.overflow = "auto";
    };
  }, [isWriting]);

  return (
    <>
      <Head>
        <title>Home | Nomad Report</title>
      </Head>
      <div className="main-bgImage min-h-screen w-full text-black">
        {/* Overlay */}
        {isWriting ? (
          <div className="w-full h-full bg-black z-30 fixed flex justify-center items-center bg-opacity-70 ">
            <div className="flex flex-col items-center p-4 main-bgImage absolute z-50 min-w-[450px] max-w-[600px] min-h-content w-[40%] bg-red-100">
              <h1 className="text-center w-full py-1 border-y-2 border-black font_eng_bold text-2xl">
                SUBMIT YOUR ARTICLE
              </h1>
              <form
                onSubmit={handleSubmit(onSubmitArticle)}
                className="flex flex-col items-center w-full text-md"
              >
                <div className="flex items-start w-full">
                  <label htmlFor="title" className="w-40 pt-2 cursor-pointer">
                    Title*
                  </label>
                  <div className="w-full flex flex-col">
                    <input
                      {...register("title", {
                        required: "Please write your title",
                      })}
                      id="title"
                      type="text"
                      placeholder="Title"
                      className="w-full py-1.5 border-b-1 border-black outline-none bg-transparent"
                    />
                    {errors.title && (
                      <span className="text-sm text-red-alert">
                        {errors.title.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-start w-full">
                  <label
                    htmlFor="description"
                    className="w-40 pt-2 cursor-pointer"
                  >
                    Description*
                  </label>
                  <div className="w-full flex flex-col">
                    <textarea
                      {...register("description", {
                        required: "Please write your description",
                        maxLength: {
                          value: 600,
                          message: "Description cannot exceed 600 characters",
                        },
                      })}
                      id="description"
                      placeholder="Description (less than 600 characters)"
                      className="min-h-[150px] resize-none w-full py-1.5 border-b-1 border-black outline-none bg-transparent"
                    />
                    {errors.description && (
                      <span className="text-sm text-red-alert">
                        {errors.description.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-start w-full mb-2">
                  <label
                    htmlFor="hashtags"
                    className="w-40 pt-2 cursor-pointer"
                  >
                    Hashtag
                  </label>
                  <input
                    {...register("hashtags")}
                    id="hashtags"
                    type="text"
                    placeholder="#news #sports #rumor"
                    className="w-full py-1.5 border-b-1 border-black outline-none bg-transparent"
                  />
                </div>
                <div className="flex items-start w-full">
                  <label htmlFor="imageUrl" className="w-40 cursor-pointer">
                    Image
                  </label>
                  <input
                    {...register("imageUrl")}
                    className="bg-transparent w-full p-2 border-1 border-black border-dotted outline-none cursor-pointer"
                    id="imageUrl"
                    type="file"
                  />
                  {/* cloudfare로 할때 사용 
                  <input
                    {...register("imageUrl")}
                    id="imageUrl"
                    type="file"
                    className="w-full p-2 border-1 border-black border-dotted outline-none cursor-pointer"
                  />
                  */}
                </div>
                <button className="mt-2 w-full p-2 bg-black text-white hover:bg-accent-main hover:text-black font-semibold">
                  SUBMIT
                </button>
                <div
                  onClick={handleCancelWriting}
                  className="mt-2 w-full p-2 border-1 border-black bg-transparent text-black text-center hover:bg-accent-main hover:text-black hover:border-accent-main cursor-pointer font-semibold"
                >
                  CANCEL
                </div>
              </form>
            </div>
          </div>
        ) : null}

        {/* Home */}
        <div className="w-4/5 h-content mx-auto my-0 ">
          <Header data={user} />
          <div className="my-2 w-full h-16 flex items-center">
            <div className="w-10 bg-black h-1 mr-5 "></div>
            <div className="font-header-title text-2xl animate-slide-up">
              RECENT
            </div>
            <div className="w-full bg-black h-1 ml-5 "></div>
          </div>
          <div className="w-full pb-2 gap-2 overflow-x-hidden card-grid-default text-black ">
            {dataGET?.articles
              ?.slice()
              .reverse()
              .map((article: IArticle) => {
                console.log(article.imageUrl);
                if (!article.imageUrl) {
                  return (
                    <Link href={`/articles/${article.id}`} key={article.id}>
                      <Card
                        onClick={onFavClick}
                        key={article.id}
                        id={article.id}
                        userId={article.userId}
                        title={article.title}
                        description={article.description}
                        hashtags={article.hashtags}
                        imageUrl={article.imageUrl}
                        createdAt={article.createdAt}
                        updatedAt={article.updatedAt}
                        user={article.user}
                        hearts={1}
                      />
                    </Link>
                  );
                }
                return (
                  <Link
                    className=""
                    href={`/articles/${article.id}`}
                    key={article.id}
                  >
                    <ImageCard
                      key={article.id}
                      id={article.id}
                      userId={article.userId}
                      title={article.title}
                      description={article.description}
                      hashtags={article.hashtags}
                      imageUrl={article.imageUrl}
                      createdAt={article.createdAt.toString()}
                      updatedAt={article.updatedAt.toString()}
                      user={article.user}
                    />
                  </Link>
                );
              })}
          </div>
          <Footer />
        </div>
        {isWriting ? null : (
          <button
            onClick={handleAddArticle}
            className="fixed z-10 right-[4%] bottom-[5%] flex justify-center items-center size-16 rounded-full bg-black text-white text-3xl font-semibold hover:text-accent-main active:scale-95 cursor-pointer"
          >
            +
          </button>
        )}
      </div>
    </>
  );
}

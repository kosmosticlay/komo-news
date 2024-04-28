import Header from "@/components/header/Header";
import Head from "next/head";
import useUser from "../api/client/useUser";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Article, User } from "@prisma/client";
import Card from "@/components/article/Card";
import Link from "next/link";
import useMutation from "../api/client/useMutation";
import Footer from "@/components/footer/Footer";

interface IArticleWithUser extends Article {
  user: User;
  _count: { favorites: number };
}

interface IArticle {
  ok: boolean;
  article: IArticleWithUser;
  otherArticles?: IArticleWithUser[];
  isLiked: boolean;
}

export default function ArticleDetail() {
  const user = useUser();
  const router = useRouter();
  const { data, mutate } = useSWR<IArticle>(
    router.query.id ? `/api/articles/${router?.query?.id}` : null
  );

  const formattedDate = (dateTimeString: string) => {
    const date = new Date(dateTimeString); // ISO string을 Date 객체로 변환
    const year = date.getFullYear(); // 연도
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월 (0부터 시작하므로 1을 더함)
    const day = date.getDate().toString().padStart(2, "0"); // 일
    const hours = date.getHours().toString().padStart(2, "0"); // 시간
    const minutes = date.getMinutes().toString().padStart(2, "0"); // 분

    return `${year}.${month}.${day} ${hours}:${minutes}`; // 포맷에 맞게 문자열로 결합
  };

  const [toggleFav] = useMutation(
    `/api/articles/${router?.query?.id}/favorite`
  );

  const onFavClick = () => {
    if (data) {
      mutate({ ...data, isLiked: !data?.isLiked }, false);
    }
    toggleFav({});
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{`${data?.article.title} | Nomad Report`}</title>
      </Head>
      <div className="main-bgImage min-h-screen w-full text-black">
        <div className="w-4/5 h-content mx-auto my-0 ">
          <Header data={user} />
          <div className="border-black border-b-1 border-x-1 p-10 pb-16 flex flex-col items-center">
            <div className="w-full flex justify-end">
              <Link className="navHeaderMenuStyle" href="/">
                &larr; BACK
              </Link>
            </div>
            <h1 className="inline font-header-title text-4xl pt-10 pb-2 underline text-center animate-slide-up">
              {data?.article.title}
            </h1>
            <p className="mb-10">{data?.article.hashtags}</p>
            <div className="w-full flex justify-center items-center ">
              {data?.article.imageUrl && data?.article.imageUrl ? (
                <img
                  className="lg:w-[500px] lg:h-[285px] min-w-[330px] h-[200px] object-fit p-2 border-1 border-black"
                  src={data?.article.imageUrl}
                />
              ) : null}
            </div>
            <p className="min-w-[350px] w-[80%] text-center text-xl my-10 leading-sng">
              {data?.article.description}
            </p>
            <div className="text-xl mb-5 w-full flex items-center justify-center">
              This article is written by
              <img
                src={data?.article.user.avatar || "/images/default-avatar.png"}
                alt={data?.article.title}
                className="size-10 rounded-full border-1 border-black ml-2"
              />
              <p className="text-lg pl-2">{data?.article.user.username}</p>
            </div>
            <p>{formattedDate(data?.article.createdAt?.toString())}</p>
            <button
              className="w-fit h-10 border-1 border-black flex items-center justify-center rounded-full px-5 my-5"
              onClick={onFavClick}
            >
              {data.isLiked ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#ff4f4f"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              )}
              <p className="ml-2">Support this reporter with your heart!</p>
            </button>
          </div>

          <div className="h-16 my-2 w-full h-16 flex items-center">
            <div className="w-10 bg-black h-1 mr-5 "></div>
            <div className="text-nowrap font-header-title text-2xl animate-slide-up">
              {data?.article.user.username} 'S OTHER ARTICLES
            </div>
            <div className="w-full bg-black h-1 ml-5 "></div>
          </div>
          {data.otherArticles && data?.otherArticles.length === 0 && (
            <div className="text-lg h-40 flex justify-center items-center">
              - No other articles by this reporter -
            </div>
          )}
          {data?.otherArticles?.map((item) => {
            return (
              <div className="mb-2" key={item.id}>
                <Link className="text-lg" href={`/articles/${item.id}`}>
                  <Card
                    onClick={onFavClick}
                    id={item.id}
                    userId={item.id}
                    title={item.title}
                    description={item.description}
                    hashtags={item.hashtags || ""}
                    createdAt={item.createdAt.toString()}
                    updatedAt={item.updatedAt.toString()}
                    hearts={item._count?.favorites}
                    user={{
                      ...item.user,
                      avatar: item.user.avatar || "",
                    }}
                    isLiked={data.isLiked}
                  />
                </Link>
              </div>
            );
          })}
          <Footer />
        </div>
      </div>
    </>
  );
}

interface IUser {
  id: number;
  username: string;
  email: string | null;
  phone?: string | null;
  github_id?: string | null;
  imageUrl?: string;
  created_at: Date;
  updated_at: Date;
  avatar: string;
}

interface IArticle {
  id: number;
  userId: number;
  title: string;
  description: string;
  hashtags?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  user: IUser;
  hearts?: number;
  onClick?: () => void;
  isLiked?: boolean;
}

const formattedDate = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

export default function Card({
  id,
  userId,
  title,
  description,
  hashtags,
  imageUrl,
  createdAt,
  updatedAt,
  user,
  hearts,
  onClick,
  isLiked,
}: IArticle) {
  return (
    <div className="cursor-pointer h-[300px] overflow-x-hidden border-1 border-black cursor-pointer h-[300px] overflow-hidden">
      <div className="flex flex-col justify-between hover:bg-gray-100 h-[300px] p-3  ">
        <div className="flex flex-col justify-start w-full h-full">
          <div className="relative flex justify-between items-center ">
            <div className="mr-20 mb-2 whitespace-nowrap overflow-hidden text-ellipsis w-full font-header-title text-2xl">
              {title}
            </div>
          </div>
          <div className="text-justify overflow-hidden leading-tight w-full h-fit max-h-40">
            {description}
          </div>
          <ul className="my-2 w-full flex overflow-hidden">
            {hashtags?.split(" ").map((hashtag, index) => {
              if (index > 4) return null;
              return (
                <li key={index} className="text-sm mr-3 flex items-center">
                  {hashtag}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex justify-between items-center w-full h-8">
          <div className="flex items-center">
            <div className="border-1 border-black grayscale w-8 h-8 bg-sky-200 rounded-full mr-2 overflow-hidden">
              <img src={user?.avatar} alt="avatar" />
            </div>
            <div>{user.username}</div>
          </div>
          <div className="flex flex-col w-full h-full justify-end">
            <div className="text-sm self-end">
              {formattedDate(createdAt.toString())}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

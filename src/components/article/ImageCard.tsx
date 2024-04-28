interface IUser {
  id: number;
  username: string;
  email?: string;
  phone?: string;
  github_id?: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
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
  user: IUser; // user 객체를 IUser 타입으로 정의합니다.
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

export default function ImageCard({
  id,
  userId,
  title,
  description,
  hashtags,
  imageUrl,
  createdAt,
  updatedAt,
  user,
}: IArticle) {
  return (
    <div className="hover-parent flex flex-col justify-between cursor-pointer h-[300px] overflow-x-hidden border-1 border-black">
      <div className="p-3 hover:bg-gray-100 w-full h-full flex flex-col justify-between ">
        <img
          src={imageUrl}
          alt="image"
          className="hover-child grayscale w-full h-56 mb-2 object-cover"
        />
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

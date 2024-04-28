import Link from "next/link";
import { useSWRConfig } from "swr";

interface IData {
  user: any;
  isLoading: boolean;
  error: any;
}

interface NavProps {
  data?: IData;
}

export default function Nav({ data }: NavProps) {
  const { mutate: logout } = useSWRConfig();

  const onLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.ok) {
        logout("/api/user-profile", undefined, false);
        window.location.href = "/login";
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex justify-between items-center px-2 py-3">
      <div className="flex">
        <Link href="/">
          <div className="navHeaderMenuStyle mr-1.5"> HOME</div>
        </Link>
        <Link className="navHeaderMenuStyle" href="/my-page">
          PROFILE
        </Link>
      </div>
      <div className="flex items-center cursor-pointer">
        <div onClick={onLogout} className="navHeaderMenuStyle mr-3">
          LOGOUT
        </div>
        <div className="size-10 rounded-full border-1 border-black bg-black cursor-pointer overflow-hidden">
          {data ? (
            <Link href="/my-page">
              <img src={data?.user?.avatar} alt="avatar" />
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

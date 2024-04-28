export default function Footer() {
  return (
    <>
      <div className="w-full h-[300px] flex flex-col items-center pt-20">
        <div className="flex flex-col items-center ">
          <div className="size-20 grayscale rounded-full komo-profileImage"></div>
          <div className="mt-4 font-semibold text-lg">by Kosmosticlay</div>
        </div>
      </div>
      <div className="text-sm border-t-1 border-black w-full h-24 flex flex-col items-center pt-2">
        <p>©2024 Komo's React Study Graduation Project.</p>
        <p>All rights reserved? Nah~</p>
      </div>
    </>
  );
}

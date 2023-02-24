import Avatar from "@/components/Avatar";
import React from "react";

function makeTale() {
  return (
    <div className="place-items-center">
      <h1 className="text-center font-bold text-2xl mt-4">테일 생성</h1>
      <div className="flex justify-center mt-10">
        <Avatar userId="taegu" large />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch"
      >
        <textarea
          placeholder="친구들과 점심을 먹고 카페에 갔다.\n날씨가 화창해서 공원에서 친구들과 산책했다.\n정말 즐거웠다."
          className="border-2 rounded border-gray-600 p-1 whitespace-pre-line"
        ></textarea>
      </form>
    </div>
  );
}

export default makeTale;

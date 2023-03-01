import Avatar from "@/components/Avatar";
import Navigation from "@/components/Navigation";
import Head from "next/head";
import React, { useState } from "react";

function makeTale() {
  const [input, setInput] = useState<string>("");
  return (
    <div className="my-7 mx-auto max-w-5xl">
      <Head>
        <title>Talelorz</title>
      </Head>
      <main>
        <div className="place-items-center">
          <h1 className="text-center font-bold text-2xl mt-4">테일 생성</h1>
          <div className="flex justify-center mt-10">
            <Avatar userId="taegu" large />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="w-auto min-w-[75%] max-w-min mx-auto space-y-6 flex flex-col items-stretch mb-8"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="친구들과 점심을 먹고 카페에 갔다. 날씨가 화창해서 공원에서 친구들과 산책했다. 정말 즐거웠다."
              className="border-2 rounded border-gray-600 p-1 whitespace-pre-line"
            ></textarea>

            <button
              disabled={!input}
              className="rounded-full bg-amber-700 px-5 py-2 font-bold text-white disabled:opacity-40"
            >
              테일 생성
            </button>
          </form>
        </div>
        <div className="sticky bottom-0 z-50 flex-1 justify-center items-center">
          <Navigation />
        </div>
      </main>
    </div>
  );
}

export default makeTale;

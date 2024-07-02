import { libre_baskerville } from "@/lib/fonts";

export default function Home() {
  return (
    <>
      <div className="z-1">
        <Header />
      </div>
      <div className="fixed bottom-0 left-0 z-0 h-96 w-full bg-gradient-to-t from-[#DBE5D8] from-5% via-[#FCEFD6] via-40%" />
    </>
  );
}

function Header() {
  return (
    <div className="mt-12 w-full">
      <h1
        className={
          libre_baskerville.className + " text-center text-4xl font-bold"
        }
      >
        newslater.
      </h1>
      <p className="text-center text-lg">read the news. one day at a time.</p>
    </div>
  );
}

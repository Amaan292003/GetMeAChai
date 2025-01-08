"use client"
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center flex-col gap-4 items-center text-white h-[44vh]  px-5 md:px-0 text-sm md:text-base">
        <div className="font-bold flex gap-6 md:gap-7  md:text-5xl justify-center items-center text-3xl">
          Get Me a Chai <span>
            <Image className="invertImg" src="/tea.svg" width={88} height={88} alt="" />
          </span>
        </div>
        <p className="text-center md:text-left">
          A crowdFunding platform for Creators.get funded by your Fans and Followers.Start Now!!!
        </p>
        <div>
          <Link href={"/login"}> 
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Start Here
            </button>
          </Link>
          <Link href={"/about"}>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Read More
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white p-11">
        <h2 className="text-3xl font-bold text-center mb-14">Your Fans can Buy you a Chai</h2>
        <div className="grid grid-cols-3 gap-5 text-center">
          <div className="item space-y-3 flex flex-col items-center">
            <Image className="bg-slate-400 rounded-full p-2 text-black" src="/man.svg" width={88} height={88} alt="" />
            <p className="font-bold">Fans want to Help</p>
            <p>Your Fans are available to support you</p>
          </div>

          <div className="item space-y-3 flex flex-col items-center">
            <Image className="bg-slate-400 rounded-full p-2 text-black" src="/coin.png" width={88} height={88} alt="" />
            <p className="font-bold">Fans want to Contribute</p>
            <p>Fans are willing to contribute financially</p>
          </div>

          <div className="item space-y-3 flex flex-col items-center">
            <Image className="bg-slate-400 rounded-full p-1 text-black" src="/group.png" width={88} height={88} alt="" />
            <p className="font-bold">Fans want to Collaborate</p>
            <p>Fans are willing to collaborate</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10 my-8"></div>

      <div className="text-white p-11">
        <h2 className="text-3xl font-bold text-center mb-14">Why Get Me A Chai ??</h2>
        <div className="grid grid-cols-3 gap-5 text-center">
          <div className="item space-y-3 flex flex-col gap-2 items-center">
            <Image className="bg-slate-400 rounded-full p-2 text-black" src="/money.png" width={88} height={88} alt="" />
            <p className="font-bold">Instant Transaction</p>
            <p>You get paid instantly to your bank account</p>
          </div>

          <div className="item space-y-3 flex flex-col gap-2 items-center">
            <Image className="bg-slate-400 rounded-full p-2 text-black" src="/entrepreneurs.png" width={88} height={88} alt="" />
            <p className="font-bold">Support Business</p>
            <p>With your fans donation you can take your business to next level</p>
          </div>

          <div className="item space-y-3 flex flex-col gap-2 items-center">
            <Image className="bg-slate-400 rounded-full p-1 text-black" src="/privacy.png" width={88} height={88} alt="" />
            <p className="font-bold">Your Privacy Comes First</p>
            <p>Receive fan support safely without disclosing your identity or address</p>
          </div>
        </div>
      </div>
    </>
  );
}

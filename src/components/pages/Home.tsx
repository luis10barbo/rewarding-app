import Image from "next/image";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <>
      <div className="flex-col flex gap-4 w-full relative h-screen">
        <div className="p-12 2xl:py-24 z-20 flex flex-col items-center lg:items-start gap-16 lg:max-w-[50vw] h-full">
          <div className="eye-catching ">
            <p className="text-5xl 2xl:text-8xl">
              <span className="text-neutral-200 2xl:text-3xl text-2xl">
                completing your{" "}
              </span>{" "}
              GOALS
            </p>{" "}
            <p className="text-5xl 2xl:text-8xl">
              <span className="text-neutral-200 text-2xl 2xl:text-3xl ">
                can now be{" "}
              </span>
              REWARDING
            </p>
          </div>

          <p className="text-2xl text-center lg:text-left">
            Give your self a boost in productivity right now with{" "}
            <span className="text-4xl">Rewarding</span>
          </p>
          <Link
            href={"/me"}
            className=" w-fit text-2xl p-6 px-16 mt-auto bg-white  text-black rounded-xl duration-75"
          >
            Start now
          </Link>
        </div>
        <div className="absolute z-10 bg-black/50 w-full h-full top-0 left-0" />
        <Image
          src={"/static/images/pages/home-hero-by-benzoix.jpg"}
          alt=""
          fill={true}
          className="object-cover lg:object-contain z-0 object-[right]"
        />
        <p className="absolute bottom-0 right-0 m-4 z-50">
          <a href="https://www.freepik.com/free-photo/vertical-shot-asian-girl-sits-floor-home-working-laptop-studying-cozy-place-using-com_36505430.htm#query=happy%20work%20from%20home&position=6&from_view=search&track=location_fest_v1">
            Image by benzoix
          </a>{" "}
          on Freepik
        </p>
      </div>
    </>
  );
};

export default Home;

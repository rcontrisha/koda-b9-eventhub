import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[1fr_2fr] bg-gray-950 text-white">
      <div className="hidden lg:flex flex-col justify-between p-12 border-r border-gray-800 bg-gradient-to-b from-gray-900 to-gray-950">
        <div>
          <div className="flex items-center space-x-2 mb-16">
            <span className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center font-bold font-jakarta">
              E
            </span>
            <span className="font-bold text-lg font-jakarta">EventHub</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-4 max-w-md font-jakarta">
            Discover events that shape careers.
          </h1>
          <p className="text-gray-400 text-sm mb-8 max-w-md font-inter">
            Workshops, conferences, and community meetups from Indonesia's most
            active tech communities — all in one place.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="p-4 rounded-xl border-2 border-[#FFFFFF14] bg-[#FFFFFF0D]">
            <p className="font-inter text-xs font-normal">
              "Found my last three workshops here. The community is fantastic."
            </p>
            <div className="flex mt-3 gap-2.5">
              <img
                src="/assets/images/testi1.jpg"
                height={28}
                width={28}
                className="rounded-full object-center"
              ></img>
              <div>
                <p className="font-inter text-white font-semibold text-xs">
                  Dina Rahayu
                </p>
                <p className="font-inter text-secondary font-semibold text-xs">
                  Backend Lead, Cakrawala Digital
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border-2 border-[#FFFFFF14] bg-[#FFFFFF0D]">
            <p className="font-inter text-xs font-normal">
              "EventHub is where Jakarta's tech scene actually happens."
            </p>
            <div className="flex mt-3 gap-2.5">
              <img
                src="/assets/images/testi2.jpg"
                height={28}
                width={28}
                className="rounded-full object-center"
              ></img>
              <div>
                <p className="font-inter text-white font-semibold text-xs">
                  Kevin Santoso
                </p>
                <p className="font-inter text-secondary font-semibold text-xs">
                  ML Engineer, Nusantara Labs
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex gap-6">
          <div className="text-center">
            <p className="font-jakarta font-bold text-xl">12k+</p>
            <p className="font-inter font-normal text-xs text-secondary">Members</p>
          </div>
          <div className="text-center">
            <p className="font-jakarta font-bold text-xl">200+</p>
            <p className="font-inter font-normal text-xs text-secondary">Events/year</p>
          </div>
          <div className="text-center">
            <p className="font-jakarta font-bold text-xl">50+</p>
            <p className="font-inter font-normal text-xs text-secondary">Communities</p>
          </div>
        </div>
        <div className="text-gray-600 text-xs">© 2026 EventHub · Indonesia</div>
      </div>

      <div className="flex items-center justify-center p-8 bg-white text-gray-900">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;

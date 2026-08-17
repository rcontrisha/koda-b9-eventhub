import { Link, NavLink, Outlet, useParams } from "react-router";
import { IoMdArrowBack } from "react-icons/io";
import slugify from "slugify";

import communities from "../data/communities.json";

function CommunityDetailLayout() {
  const { slug } = useParams();
  const community = communities.find(
    (c) => slugify(c.name, { lower: true }) === slug,
  );

  if (!community) return null;

  return (
    <main>
      <div className="px-6 py-3 border-b border-b-[#E4E4E7]">
        <Link
          to="/communities"
          className="inline-flex text-sm text-secondary hover:text-primary items-center"
        >
          <span className="mr-1.5">
            <IoMdArrowBack />
          </span>{" "}
          Back to Communities
        </Link>
      </div>
      <section
        style={{ backgroundImage: `url(${community.banner_url})` }}
        className="relative h-69 w-full bg-cover bg-center bg-no-repeat pb-5"
      >
        <div className="flex px-4 flex-col gap-3 lg:flex-row lg:justify-between lg:items-end pb-6 absolute bottom-0 left-0 right-0 lg:px-29">
          <div>
            <p className="font-jakarta font-bold text-3xl text-white">
              {community.name}
            </p>
            <div className="flex gap-3 pt-1 pl-4.5">
              <p className="font-inter font-normal text-sm text-[#FFFFFFCC]">
                {community.member_count} members
              </p>
              <p className="font-inter font-normal text-sm text-[#FFFFFFCC]">
                {community.upcoming_events_count} upcoming events
              </p>
            </div>
          </div>
          <div>
            <button className="w-fit rounded-lg px-4 py-2 bg-primary text-white cursor-pointer">
              Join Community
            </button>
          </div>
        </div>
      </section>
      <section className="py-2 max-w-6xl mx-auto px-4">
        <div className="w-full rounded-xl border border-[#E4E4E7] p-5">
          <p className="font-inter font-normal text-sm text-secondary">
            {community.description}
          </p>
          <div className="flex gap-2 pt-3">
            {community["tags"].map((tag, index) => {
              return (
                <div
                  key={index}
                  className="px-2 py-0.5 text-white bg-gray-500 rounded-full font-medium font-inter text-xs"
                >
                  {tag}
                </div>
              );
            })}
          </div>
        </div>
        <div className="pt-6">
          <nav className="border-b border-b-[#E4E4E7] flex gap-1">
            <NavLink
              to={`/communities/${slug}`}
              end
              className={({ isActive }) =>
                isActive
                  ? "tab-active"
                  : "font-inter font-medium text-sm py-2.5 px-4 text-secondary"
              }
            >
              Events
            </NavLink>
            <NavLink
              to={`/communities/${slug}/members`}
              className={({ isActive }) =>
                isActive
                  ? "tab-active"
                  : "font-inter font-medium text-sm py-2.5 px-4 text-secondary"
              }
            >
              Members
            </NavLink>
            <NavLink
              to={`/communities/${slug}/discussion`}
              className={({ isActive }) =>
                isActive
                  ? "tab-active"
                  : "font-inter font-medium text-sm py-2.5 px-4 text-secondary"
              }
            >
              Discussion
            </NavLink>
          </nav>
        </div>
        <div className="pt-6">
          <Outlet />
        </div>
      </section>
    </main>
  );
}

export default CommunityDetailLayout;

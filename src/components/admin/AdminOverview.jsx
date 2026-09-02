import { MdOutlineEvent, MdOutlineFlag, MdOutlinePeople } from "react-icons/md";

function AdminOverview() {
  return (
    <>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
        <div className="border border-[#E4E4E7] rounded-xl p-5">
          <div className="flex justify-between font-inter font-medium text-secondary text-xs">
            TOTAL EVENTS
            <span>
              <MdOutlinePeople className="w-4 h-4" />
            </span>
          </div>
          <div className="pt-3 font-jakarta font-bold text-2xl">
            {/* {communityEvents.length} */}
            9999
          </div>
          <div className="font-inter font-normal text-secondary text-xs">
            +999 this month
          </div>
        </div>
        <div className="border border-[#E4E4E7] rounded-xl p-5">
          <div className="flex justify-between font-inter font-medium text-secondary text-xs">
            TOTAL EVENTS
            <span>
              <MdOutlineEvent className="w-4 h-4" />
            </span>
          </div>
          <div className="pt-3 font-jakarta font-bold text-2xl">
            {/* {communityEvents.length} */}
            999
          </div>
          <div className="font-inter font-normal text-secondary text-xs">
            99 Upcoming
          </div>
        </div>
        <div className="border border-[#E4E4E7] rounded-xl p-5">
          <div className="flex justify-between font-inter font-medium text-secondary text-xs">
            COMMUNITIES
            <span>
              <MdOutlinePeople className="w-4 h-4" />
            </span>
          </div>
          <div className="pt-3 font-jakarta font-bold text-2xl">
            {/* {communityEvents.length} */}
            999
          </div>
          <div className="font-inter font-normal text-secondary text-xs">
            All Active
          </div>
        </div>
        <div className="border border-[#E4E4E7] rounded-xl p-5">
          <div className="flex justify-between font-inter font-medium text-secondary text-xs">
            AVG FILL RATE
            <span>
              <MdOutlineFlag className="w-4 h-4" />
            </span>
          </div>
          <div className="pt-3 font-jakarta font-bold text-2xl">
            {/* {communityEvents.length} */}
            99%
          </div>
          <div className="font-inter font-normal text-secondary text-xs">
            Across All Events
          </div>
        </div>
      </div>
      <div className="pt-6">
        <div className="p-5 rounded-xl border border-[#E4E4E7]">
          <p className="font-inter font-semibold text-sm text-[#18181B] leading-5">Recent Platform Activity</p>
          <div className="pt-4 grid grid-cols-1 gap-3">
            <div className="flex gap-3 items-center font-inter font-normal text-secondary leading-5"><MdOutlinePeople className="text-[#33B570]" />999 new users registered this month</div>
            <div className="flex gap-3 items-center font-inter font-normal text-secondary leading-5"><MdOutlineEvent className="text-[#3363FF]" />"AI Product Design Summit" reached 234 registrations</div>
            <div className="flex gap-3 items-center font-inter font-normal text-secondary leading-5"><MdOutlineFlag className="text-primary" />9 new organizer applications received</div>
            <div className="flex gap-3 items-center font-inter font-normal text-secondary leading-5"><MdOutlinePeople className="text-[#33B570]" />Jakarta AI & ML Club crossed 2000 members</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminOverview;

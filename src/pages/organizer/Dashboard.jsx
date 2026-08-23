import {
  MdOutlineEvent,
  MdOutlinePeople,
  MdOutlineRemoveRedEye,
  MdOutlineEdit,
  MdOutlineBarChart,
} from "react-icons/md";
import { FaArrowTrendUp, FaPlus } from "react-icons/fa6";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// import events from "../../data/events.json";
import { formatEventDate, getProgressColor } from "../../utils/event";
// import communities from "../../data/communities.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function Dashboard() {
  const {events: communityEvents} = useSelector((state) => state.eventState)
  const navigate = useNavigate();
  // const communityEvents = events.filter((e) => e.community_id === "c5");

  const chartData = {
    labels: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Registrations",
        data: [12, 19, 15, 30, 25, 42],
        backgroundColor: "#FF5F2259",
        hoverBackgroundColor: "#ff5f22",
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <main className="px-4 lg:px-29.25 py-8">
      <div className="flex lg:justify-between lg:items-center lg:flex-row flex-col">
        <div>
          <h1 className="font-jakarta font-bold text-2xl">
            Organizer Dashboard
          </h1>
          <h2 className="font-inter font-normal text-secondary text-sm">
            Manage your events and track performance.
          </h2>
        </div>
        <button
          onClick={() => navigate("create-event")}
          className="flex gap-2 items-center px-4 py-2 bg-primary text-white rounded-lg h-fit w-fit mt-4 lg:mt-0 cursor-pointer"
        >
          <span>+</span>
          Create Event
        </button>
      </div>
      <section className="pt-8 grid lg:grid-cols-4 grid-cols-2 gap-4">
        <div className="border border-[#E4E4E7] rounded-xl p-5">
          <div className="flex justify-between font-inter font-medium text-secondary text-xs">
            TOTAL EVENTS
            <span>
              <MdOutlineEvent className="w-4 h-4" />
            </span>
          </div>
          <div className="pt-3 font-jakarta font-bold text-2xl">2</div>
          <div className="font-inter font-normal text-secondary text-xs">
            All Time
          </div>
        </div>
        <div className="border border-[#E4E4E7] rounded-xl p-5">
          <div className="flex justify-between font-inter font-medium text-secondary text-xs">
            TOTAL ATTENDEES
            <span>
              <MdOutlinePeople className="w-4 h-4" />
            </span>
          </div>
          <div className="pt-3 font-jakarta font-bold text-2xl">103</div>
          <div className="font-inter font-normal text-secondary text-xs">
            Across All Events
          </div>
        </div>
        <div className="border border-[#E4E4E7] rounded-xl p-5">
          <div className="flex justify-between font-inter font-medium text-secondary text-xs">
            AVG FILL RATE
            <span>
              <FaArrowTrendUp className="w-4 h-4" />
            </span>
          </div>
          <div className="pt-3 font-jakarta font-bold text-2xl">57%</div>
          <div className="font-inter font-normal text-secondary text-xs">
            Capacity Utilization
          </div>
        </div>
        <div className="border border-[#E4E4E7] rounded-xl p-5">
          <div className="flex justify-between font-inter font-medium text-secondary text-xs">
            EVENT VIEWS
            <span>
              <MdOutlineRemoveRedEye className="w-4 h-4" />
            </span>
          </div>
          <div className="pt-3 font-jakarta font-bold text-2xl">3241</div>
          <div className="font-inter font-normal text-secondary text-xs">
            Last 30 Days
          </div>
        </div>
      </section>
      <div className="pt-8 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3">
        <section>
          <h2 className="font-semibold font-jakarta text-lg">Your Events</h2>
          <div className="pt-4 flex flex-col gap-3">
            {communityEvents.map((e) => {
              const pct = Math.min(100, (e.attendees_count / e.capacity) * 100);

              return (
                <div
                  key={e.id}
                  className="p-4 gap-4 flex rounded-xl border border-[#E4E4E7]"
                >
                  <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={e.image_url}
                      alt={e.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grow">
                    <div className="flex justify-between items-start lg:items-center">
                      <div>
                        <p className="font-jakarta font-semibold text-sm text-secondary">
                          {e.title}
                        </p>
                        <p className="font-inter font-normal text-xs text-secondary">
                          {formatEventDate(e.date)} · {e.location}
                        </p>
                      </div>
                      <div className="px-2 py-0.5 bg-[#33B5701A] text-[#33B570] font-inter font-medium text-xs rounded-full">
                        Active
                      </div>
                    </div>
                    <div className="pt-3">
                      <div className="flex justify-between mb-1 text-xs">
                        <span className="font-medium text-body">
                          {e.attendees_count || 0} Attendees
                        </span>
                        <span className="font-medium text-body">
                          {e.capacity} Capacity
                        </span>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`${getProgressColor(pct)} h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex pt-3 gap-2">
                      <button className="px-3 py-1.5 flex gap-2 border border-[#E4E4E7] rounded-lg font-inter font-medium text-sm text-secondary items-center cursor-pointer">
                        <span>
                          <MdOutlineEdit />
                        </span>
                        Edit
                      </button>
                      <button className="px-3 py-1.5 flex gap-2 border border-[#E4E4E7] rounded-lg font-inter font-medium text-sm text-secondary items-center cursor-pointer">
                        <span>
                          <MdOutlineRemoveRedEye />
                        </span>
                        {e.attendees_count || 0} Attendees
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <section className="grid grid-cols-1 gap-4">
          <div className="border border-[#E4E4E7] rounded-xl p-5">
            <h2 className="flex items-center gap-2 font-inter font-semibold text-sm leading-5">
              <span className="text-secondary">
                <MdOutlineBarChart />
              </span>
              Registrations (6 months)
            </h2>
            <div className="pt-4 h-48 w-full">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
          <div className="border border-[#E4E4E7] rounded-xl p-5">
            <h2 className="font-inter font-semibold text-sm leading-5">
              Quick Actions
            </h2>
            <div className="flex flex-col gap-2 pt-3">
              <button
                onClick={() => navigate("create-event")}
                className="flex justify-center items-center gap-2 rounded-lg px-3 py-1.5 bg-primary text-white font-medium text-sm w-full cursor-pointer"
              >
                <FaPlus />
                Create New Event
              </button>
              <button className="flex justify-center items-center gap-2 rounded-lg px-3 py-1.5 bg-[#F4F4F5] text-[#27272A] font-medium text-sm w-full cursor-pointer">
                <MdOutlineRemoveRedEye />
                Preview as Attendee
              </button>
            </div>
          </div>
          <div className="border border-[#E4E4E7] rounded-xl p-5">
            <h2 className="font-inter font-semibold text-sm leading-5">
              Upcoming Events
            </h2>
            <div className="pt-3 flex flex-col gap-2">
              {communityEvents.map((e) => {
                return (
                  <div
                    key={e.id}
                    className="flex gap-3 py-2 items-center justify-between"
                  >
                    <div className="flex gap-3 items-center">
                      <div className="bg-[#33B570] rounded-full w-1.5 h-1.5"></div>
                      <div>
                        <p className="font-inter font-medium text-xs leading-4 text-[#18181B]">
                          {e.title}
                        </p>
                        <p className="font-inter font-normal text-[10px] leading-3.75 text-[#9F9FA9]">
                          {formatEventDate(e.date)}
                        </p>
                      </div>
                    </div>
                    <p className="font-inter font-normal text-xs leading-4 text-secondary">
                      {e.attendees_count}/{e.capacity}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Dashboard;

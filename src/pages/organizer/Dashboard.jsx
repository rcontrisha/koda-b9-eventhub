import { useEffect } from "react";
import {
  MdOutlineEvent,
  MdOutlinePeople,
  MdOutlineRemoveRedEye,
  MdOutlineEdit,
  MdOutlineBarChart,
} from "react-icons/md";
import { FaArrowTrendUp, FaPlus } from "react-icons/fa6";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { formatEventDate, getProgressColor } from "../../utils/event";
import { getOrganizerDashboard } from "../../redux/slices/OrganizerSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    stats,
    chartData,
    yourEvents,
    upcomingEvents,
    isPending,
    isRejected,
    error,
  } = useSelector((state) => state.organizerState);

  useEffect(() => {
    dispatch(
      getOrganizerDashboard(`${import.meta.env.VITE_API_URL}/organizer/dashboard`)
    );
  }, [dispatch]);

  const chartConfig = {
    labels: chartData.map((item) => item.month),
    datasets: [
      {
        label: "Registrations",
        data: chartData.map((item) => item.total),
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
        ticks: {
          color: "#A1A1AA",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          color: "#A1A1AA",
        },
      },
    },
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-neutral-200 dark:border-neutral-800 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isRejected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <p className="text-red-500 font-inter text-sm">{error || "Failed to load dashboard data"}</p>
        <button
          onClick={() =>
            dispatch(
              getOrganizerDashboard(`${import.meta.env.VITE_API_URL}/organizer/dashboard`)
            )
          }
          className="px-4 py-2 bg-primary text-white text-xs rounded-lg cursor-pointer"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <main className="px-4 lg:px-29.25 py-8 text-neutral-900 dark:text-neutral-100">
      <div className="flex lg:justify-between lg:items-center lg:flex-row flex-col">
        <div>
          <h1 className="font-jakarta font-bold text-2xl text-neutral-900 dark:text-neutral-100">
            Organizer Dashboard
          </h1>
          <h2 className="font-inter font-normal text-secondary dark:text-neutral-400 text-sm">
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
        <div className="border border-[#E4E4E7] dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl p-5">
          <div className="flex justify-between font-inter font-medium text-secondary dark:text-neutral-400 text-xs">
            TOTAL EVENTS
            <span>
              <MdOutlineEvent className="w-4 h-4" />
            </span>
          </div>
          <div className="pt-3 font-jakarta font-bold text-2xl text-neutral-900 dark:text-neutral-100">
            {stats.total_events}
          </div>
          <div className="font-inter font-normal text-secondary dark:text-neutral-400 text-xs">
            All Time
          </div>
        </div>

        <div className="border border-[#E4E4E7] dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl p-5">
          <div className="flex justify-between font-inter font-medium text-secondary dark:text-neutral-400 text-xs">
            TOTAL ATTENDEES
            <span>
              <MdOutlinePeople className="w-4 h-4" />
            </span>
          </div>
          <div className="pt-3 font-jakarta font-bold text-2xl text-neutral-900 dark:text-neutral-100">
            {stats.total_attendees}
          </div>
          <div className="font-inter font-normal text-secondary dark:text-neutral-400 text-xs">
            Across All Events
          </div>
        </div>

        <div className="border border-[#E4E4E7] dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl p-5">
          <div className="flex justify-between font-inter font-medium text-secondary dark:text-neutral-400 text-xs">
            AVG FILL RATE
            <span>
              <FaArrowTrendUp className="w-4 h-4" />
            </span>
          </div>
          <div className="pt-3 font-jakarta font-bold text-2xl text-neutral-900 dark:text-neutral-100">
            {stats.avg_fill_rate}%
          </div>
          <div className="font-inter font-normal text-secondary dark:text-neutral-400 text-xs">
            Capacity Utilization
          </div>
        </div>

        <div className="border border-[#E4E4E7] dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl p-5">
          <div className="flex justify-between font-inter font-medium text-secondary dark:text-neutral-400 text-xs">
            EVENT VIEWS
            <span>
              <MdOutlineRemoveRedEye className="w-4 h-4" />
            </span>
          </div>
          <div className="pt-3 font-jakarta font-bold text-2xl text-neutral-900 dark:text-neutral-100">
            {stats.event_views}
          </div>
          <div className="font-inter font-normal text-secondary dark:text-neutral-400 text-xs">
            Last 30 Days
          </div>
        </div>
      </section>

      <div className="pt-8 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3">
        <section>
          <h2 className="font-semibold font-jakarta text-lg text-neutral-900 dark:text-neutral-100">
            Your Events
          </h2>
          <div className="pt-4 flex flex-col gap-3">
            {yourEvents.map((e) => {
              const pct = e.capacity
                ? Math.min(100, ((e.attendees_count || 0) / e.capacity) * 100)
                : 0;

              return (
                <div
                  key={e.id}
                  className="p-4 gap-4 flex rounded-xl border border-[#E4E4E7] dark:border-neutral-800 bg-white dark:bg-neutral-900"
                >
                  <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={
                        e.image_url?.startsWith("https")
                          ? `${e.image_url}&w=400&auto=format`
                          : e.image_url
                      }
                      alt={e.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grow">
                    <div className="flex justify-between items-start lg:items-center">
                      <div>
                        <p className="font-jakarta font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                          {e.title}
                        </p>
                        <p className="font-inter font-normal text-xs text-secondary dark:text-neutral-400">
                          {formatEventDate(e.start_time)} · {e.location}
                        </p>
                      </div>
                      <div className="px-2 py-0.5 bg-[#33B5701A] text-[#33B570] font-inter font-medium text-xs rounded-full">
                        Active
                      </div>
                    </div>
                    <div className="pt-3">
                      <div className="flex justify-between mb-1 text-xs">
                        <span className="font-medium text-body text-neutral-700 dark:text-neutral-300">
                          {e.attendees_count || 0} Attendees
                        </span>
                        <span className="font-medium text-body text-neutral-700 dark:text-neutral-300">
                          {e.capacity} Capacity
                        </span>
                      </div>
                      <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-2 overflow-hidden">
                        <div
                          className={`${getProgressColor(pct)} h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex pt-3 gap-2">
                      <Link
                        to={`event/${e.id}/edit`}
                        className="px-3 py-1.5 flex gap-2 border border-[#E4E4E7] dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg font-inter font-medium text-sm text-secondary dark:text-neutral-300 items-center cursor-pointer transition-colors"
                      >
                        <MdOutlineEdit />
                        Edit
                      </Link>
                      <button className="px-3 py-1.5 flex gap-2 border border-[#E4E4E7] dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg font-inter font-medium text-sm text-secondary dark:text-neutral-300 items-center cursor-pointer transition-colors">
                        <MdOutlineRemoveRedEye />
                        {e.attendees_count || 0} Attendees
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 h-fit">
          <div className="border border-[#E4E4E7] dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl p-5">
            <h2 className="flex items-center gap-2 font-inter font-semibold text-sm leading-5 text-neutral-900 dark:text-neutral-100">
              <span className="text-secondary dark:text-neutral-400">
                <MdOutlineBarChart />
              </span>
              Registrations
            </h2>
            <div className="pt-4 h-48 w-full">
              <Bar data={chartConfig} options={chartOptions} />
            </div>
          </div>

          <div className="border border-[#E4E4E7] dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl p-5">
            <h2 className="font-inter font-semibold text-sm leading-5 text-neutral-900 dark:text-neutral-100">
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
              <button className="flex justify-center items-center gap-2 rounded-lg px-3 py-1.5 bg-[#F4F4F5] dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-[#27272A] dark:text-neutral-200 font-medium text-sm w-full cursor-pointer transition-colors">
                <MdOutlineRemoveRedEye />
                Preview as Attendee
              </button>
            </div>
          </div>

          <div className="border border-[#E4E4E7] dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-xl p-5">
            <h2 className="font-inter font-semibold text-sm leading-5 text-neutral-900 dark:text-neutral-100">
              Upcoming Events
            </h2>
            <div className="pt-3 flex flex-col gap-2">
              {upcomingEvents.map((e) => (
                <div
                  key={e.id}
                  className="flex gap-3 py-2 items-center justify-between"
                >
                  <div className="flex gap-3 items-center">
                    <div className="bg-[#33B570] rounded-full w-1.5 h-1.5 shrink-0"></div>
                    <div>
                      <p className="font-inter font-medium text-xs leading-4 text-[#18181B] dark:text-neutral-200">
                        {e.title}
                      </p>
                      <p className="font-inter font-normal text-[10px] leading-3.75 text-[#9F9FA9] dark:text-neutral-400">
                        {formatEventDate(e.start_time)}
                      </p>
                    </div>
                  </div>
                  <p className="font-inter font-normal text-xs leading-4 text-secondary dark:text-neutral-400 shrink-0">
                    {e.attendees_count || 0}/{e.capacity}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Dashboard;
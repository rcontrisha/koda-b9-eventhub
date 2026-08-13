const testimonials = [
  {
    name: "Raisa Nurdiana",
    role: "Frontend Engineer",
    company: "Cakrawala Digital",
    review:
      "EventHub completely changed how I network. I met my current co-founder at a Jakarta AI meetup I found here. The community pages make it so easy to find people who are into the same things.",
  },
  {
    name: "Bimo Hartanto",
    role: "Product Manager",
    company: "Nusantara Labs",
    review:
      "We used to manage event registrations over WhatsApp groups. Switching to EventHub as our organizer platform cut our admin overhead in half and attendance actually went up.",
  },
  {
    name: "Indira Kusuma",
    role: "UX Designer",
    company: "Aruna Kreasi Studio",
    review:
      "I love that I can filter by city and category in one place. Found a design sprint workshop in Bandung I never would have discovered otherwise — ended up being one of the best events I've attended.",
  },
];

function TestiCard() {
  return testimonials.map((testi, idx) => {
    return (
      <article key={idx} className="grid grid-cols-1 gap-4 p-5 rounded-xl border-2 border-[#E4E4E7]">
        <div className="text-primary font-inter text-2xl font-normal">"</div>
        <p className="text-secondary text-sm font-normal font-inter">
          {testi.review}
        </p>
        <div className="flex gap-3">
          <div className="w-9 h-9 rounded-full bg-[#3363FF] text-white flex justify-center items-center text-sm font-bold font-inter">
            {testi.name
              .split(" ")
              .map((word) => word[0].toUpperCase())
              .join("")}
          </div>
          <div>
            <p className="text-black font-inter font-semibold text-sm">{testi.name}</p>
            <p className="text-secondary font-inter font-normal text-xs">
              {testi.role} · {testi.company}
            </p>
          </div>
        </div>
      </article>
    );
  });
}

export default TestiCard;

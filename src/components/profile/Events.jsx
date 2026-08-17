import UpcomingEvents from "../my-events/UpcomingEvents"
import PastEvents from "../my-events/PastEvents"

function Events() {
  return (
    <>
      <div>
        <p className="font-inter font-semibold text-sm text-secondary">UPCOMING</p>
        <div>
          <UpcomingEvents />
        </div>
      </div>
      <div className="pt-6">
        <p className="font-inter font-semibold text-sm text-secondary">PAST</p>
        <div>
          <PastEvents />
        </div>
      </div>
    </>
  )
}

export default Events
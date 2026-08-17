const categories = [
  "Technology",
  "Design",
  "Business",
  "Career",
  "AI",
  "Programming",
  "Music",
];
const locations = ["Bandung", "Jakarta", "Surabaya", "Yogyakarta", "Online"];
const sortBy = ["Most Popular", "Almost Full", "Recently Added"];

function Filters() {
  return (
    <>
      <div className="px-1">
        <div>
          <p className="font-inter font-semibold text-secondary text-xs">
            CATEGORY
          </p>
          <div className="flex gap-2 pt-2 flex-wrap">
            <button className="btn btn-primary font-inter font-medium text-xs">
              All
            </button>
            {categories.map((category) => {
              return (
                <button className="btn font-inter font-medium text-xs text-secondary">
                  {category}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-6 pt-4">
          <div>
            <p className="font-inter font-semibold text-secondary text-xs">
              LOCATION
            </p>
            <div className="flex gap-2 pt-2 flex-wrap">
              <button className="btn btn-primary font-inter font-medium text-xs">
                All Locations
              </button>
              {locations.map((location) => {
                return (
                  <button className="btn font-inter font-medium text-xs">
                    {location}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <p className="font-inter font-semibold text-secondary text-xs">
              SORT BY
            </p>
            <div className="flex gap-2 pt-2 flex-wrap">
              <button className="btn btn-primary font-inter font-medium text-xs">
                Upcoming
              </button>
              {sortBy.map((sort) => {
                return (
                  <button className="btn font-inter font-medium text-xs">
                    {sort}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filters;

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

function Filters({ searchParams, setSearchParams }) {
  const currentCat = searchParams.get("cat") || "";
  const currentLoc = searchParams.get("loc") || "";
  // const currentSort = searchParams.get("sort") || "";

  const handleFilterChange = (key, value) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    setSearchParams(searchParams);
  };

  return (
    <>
      <div className="px-1">
        <div>
          <p className="font-inter font-semibold text-secondary text-xs">
            CATEGORY
          </p>
          <div className="flex gap-2 pt-2 flex-wrap">
            <button
              onClick={() => handleFilterChange("cat", "")}
              className={`btn font-inter font-medium text-xs ${
                !currentCat ? "btn-primary" : "text-secondary"
              }`}
            >
              All
            </button>
            {categories.map((category) => {
              const isActive = currentCat === category;
              return (
                <button
                  key={category}
                  onClick={() => handleFilterChange("cat", category)}
                  className={`btn font-inter font-medium text-xs ${
                    isActive ? "btn-primary" : "text-secondary"
                  }`}
                >
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
              <button
                onClick={() => handleFilterChange("loc", "")}
                className={`btn font-inter font-medium text-xs ${
                  !currentLoc ? "btn-primary" : "text-secondary"
                }`}
              >
                All Locations
              </button>
              {locations.map((location) => {
                const isActive = currentLoc === location;
                return (
                  <button
                    key={location}
                    onClick={() => handleFilterChange("loc", location)}
                    className={`btn font-inter font-medium text-xs ${
                      isActive ? "btn-primary" : "text-secondary"
                    }`}
                  >
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

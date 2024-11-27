import React, { useState } from "react";
import { Link } from "react-router-dom";
import ApartmentPic from "../../../assets/ApartmentPic.png";
import House from "../../../assets/House.png";
import RoomPic from "../../../assets/RoomPic.png";
import Apartment from "../../../assets/Apartment.png";

const PropertiesForRent = () => {
  const filters = ["Most Popular", "By Property Type", "By BHK"];
  
  const allProperties = [
    { id: 1, image: ApartmentPic, title: "2 BHK Apartments", type: "Apartment", bhk: "2 BHK", popularity: 80 },
    { id: 2, image: RoomPic, title: "Office Space", type: "Commercial", bhk: null, popularity: 70 },
    { id: 3, image: House, title: "3 BHK Apartments", type: "Apartment", bhk: "3 BHK", popularity: 95 },
    { id: 4, image: Apartment, title: "Flats / Apartments", type: "Apartment", bhk: "1 BHK", popularity: 85 },
    { id: 5, image: House, title: "Commercial Shops", type: "Commercial", bhk: null, popularity: 60 },
  ];

  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [filteredProperties, setFilteredProperties] = useState(allProperties);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);

    // Apply filtering logic
    if (filter === "Most Popular") {
      setFilteredProperties([...allProperties].sort((a, b) => b.popularity - a.popularity));
    } else if (filter === "By Property Type") {
      setFilteredProperties([...allProperties].filter((property) => property.type === "Apartment"));
    } else if (filter === "By BHK") {
      setFilteredProperties([...allProperties].filter((property) => property.bhk && property.bhk.includes("BHK")));
    } else {
      setFilteredProperties(allProperties); // Default to all properties
    }
  };

  return (
    <div className="bg-white text-blue-700 flex flex-col items-center">
      {/* Header */}
      <header className="text-center py-4">
        <h1 className="text-3xl font-bold">Properties for Rent in Nepal</h1>
      </header>

      {/* Filters */}
      <section className="flex justify-center space-x-3 mb-4">
        {filters.map((filter, index) => (
          <button
            key={index}
            onClick={() => handleFilterChange(filter)}
            className={`px-4 py-1 rounded-full text-sm transition border border-blue-600 ${
              selectedFilter === filter
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 hover:bg-blue-600 hover:text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </section>

      {/* Property Cards */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 px-8">
        {filteredProperties.map((property) => (
          <Link
            to={`/rent?type=${encodeURIComponent(property.title)}`} // Pass the title as query parameter
            key={property.id}
            className="bg-white border border-blue-200 rounded-md overflow-hidden shadow-md hover:shadow-lg transition"
          >
            <div className="overflow-hidden group">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-3 bg-blue-600">
              <h3 className="text-sm font-medium text-white text-center">
                {property.title}
              </h3>
            </div>
          </Link>
        ))}
      </section>
      <div className="w-full h-8 bg-white"></div>
    </div>
  );
};

export default PropertiesForRent;

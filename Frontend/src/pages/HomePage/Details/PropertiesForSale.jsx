import React, { useState } from "react";
import { Link } from "react-router-dom";
import ApartmentPic from "../../../assets/ApartmentPic.png";
import House from "../../../assets/House.png";
import RoomPic from "../../../assets/RoomPic.png";
import Apartment from "../../../assets/Apartment.png";

const PropertiesForSale = () => {
  const filters = ["Most Popular", "By Budget", "By Property Type", "By BHK"];
  const allProperties = [
    { id: 1, image: ApartmentPic, title: "Budget above 5 crores", category: "Buy", budget: "above 5 crores", type: "Apartment", bhk: "3 BHK", popularity: 90 },
    { id: 2, image: House, title: "Budget within 2 crores", category: "Buy", budget: "within 2 crores", type: "House", bhk: "4 BHK", popularity: 85 },
    { id: 3, image: RoomPic, title: "Builder Floor", category: "Rent", budget: "above 5 crores", type: "Commercial", bhk: null, popularity: 70 },
    { id: 4, image: Apartment, title: "Flats / Apartments", category: "Buy", budget: "within 2 crores", type: "Apartment", bhk: "2 BHK", popularity: 80 },
    { id: 5, image: Apartment, title: "3 BHK Apartments", category: "Rent", budget: "above 5 crores", type: "Apartment", bhk: "3 BHK", popularity: 95 },
  ];

  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [filteredProperties, setFilteredProperties] = useState(allProperties);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);

    // Apply filtering logic
    if (filter === "Most Popular") {
      setFilteredProperties([...allProperties].sort((a, b) => b.popularity - a.popularity));
    } else if (filter === "By Budget") {
      setFilteredProperties([...allProperties].filter((property) => property.budget === "within 2 crores"));
    } else if (filter === "By Property Type") {
      setFilteredProperties([...allProperties].filter((property) => property.type === "Apartment"));
    } else if (filter === "By BHK") {
      setFilteredProperties([...allProperties].filter((property) => property.bhk && property.bhk.includes("BHK")));
    } else {
      setFilteredProperties(allProperties); // Default to all properties
    }
  };

  return (
    <div className="bg-white text-gray-800 flex flex-col items-center">
      {/* Header */}
      <header className="text-center py-4">
        <h1 className="text-3xl font-bold text-blue-700">
          Properties for Buy in Nepal
        </h1>
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
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 px-6">
        {filteredProperties.map((property) => (
          <Link
            // Dynamically set the path to Buy or Rent based on category
            to={`/${property.category.toLowerCase()}?title=${encodeURIComponent(property.title)}`}
            key={property.id}
            className="bg-white rounded-md overflow-hidden shadow-md hover:shadow-lg transition"
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
      {/* Bottom Margin Area */}
      <div className="w-full h-8 bg-white"></div>
    </div>
  );
};

export default PropertiesForSale;

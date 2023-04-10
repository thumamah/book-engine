import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = (props) => {
  const [searchParams, setSearchParams] = useState({
    destination: "",
    date: [
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ],
    numRooms: 1,
    numAdults: 1,
    numChildren: 0,
  });

  return (
    <SearchContext.Provider value={[searchParams, setSearchParams]}>
      {props.children}
    </SearchContext.Provider>
  );
};

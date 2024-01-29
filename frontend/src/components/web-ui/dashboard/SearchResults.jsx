import { memo } from "react";
import { useRecoilValueLoadable } from "recoil";
import { userSearchQuery } from "@utils/atom";
import Spinner from "@components/display/Spinner";
import ResultDisplay from "./ResultDisplay";


/* eslint-disable react/prop-types */
export default memo(function SearchResults({ query }) {
  const searchResultList = useRecoilValueLoadable(userSearchQuery(query));
  let resultUI;
  const state = searchResultList.state;
  switch (state) {
    case "hasValue":
      resultUI =
        searchResultList.contents.length !== 0 ? (
          searchResultList.contents.map((result, index) => (
            <ResultDisplay
              key={result.id}
              id={index}
              userId={result.id}
              firstname={result.firstname}
              lastname={result.lastname}
              username={result.username}
            />
          ))
        ) : (
          <span className={`text-gray-700`}>No users found</span>
        );
      break;
    case "loading":
      resultUI = (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      );
      break;
  }

  return (
    <div className=" h-96 space-y-3 overflow-auto scroll-smooth px-2 py-2">
      {resultUI}
    </div>
  );
});


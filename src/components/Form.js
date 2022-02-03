import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Card from "./Card";

const Form = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [search, setSearch] = useState("code");
  const [sortGoodBad, setSortGoodBad] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=193cb558cbfba8301e0b80dfd3ab6927&query=${search}&language=fr-FR`
      )
      .then((res) => setMoviesData(res.data.results));
  }, [search]);
  return (
    <div className="form-component">
      <div className="form-container">
        <form action="#">
          <input
            type="text"
            placeholder="Entrrez le titre d'un film"
            id="search-input"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <input type="submit" value="Recherchez" />
        </form>
        <div className="btn-sort-container">
          <div
            className="btn-sort"
            id="goodToBad"
            onClick={() => {
              setSortGoodBad("goodToBad");
            }}
          >
            Top
            <span>→</span>
          </div>
          <div
            className="btn-sort"
            id="badToGood"
            onClick={() => {
              setSortGoodBad("badToGood");
            }}
          >
            Flop
            <span>→</span>
          </div>
        </div>
      </div>
      <div className="result">
        {moviesData
          .slice(0, 12)
          .sort((a, b) => {
            if (sortGoodBad === "goodToBad") {
              return b.vote_average - a.vote_average;
            } else if (sortGoodBad === "badToGood") {
              return a.vote_average - b.vote_average;
            }
          })
          .map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  );
};

export default Form;

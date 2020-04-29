import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const UpdateMovie = (props) => {
  const [update, setUpdate] = useState("");
  const [isPut, setIsPut] = useState(false);

  useEffect(() => {
    const paramItemId = props.match.params.id;

    const SelectedItem = props.movies.find((item) => {
      return item.id === Number(paramItemId);
    });

    if (SelectedItem) {
      setUpdate(SelectedItem);
    }
  }, [props.movies, props.match.params.id]);

  const handleOnChange = (e) => {
    e.persist();

    setUpdate({ ...update, [e.target.name]: e.target.value });
  };
  console.log(update);

  const submitForm = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/movies/${update.id}`, update)
      .then((res) => {
        console.log(res);
        setIsPut(true);
      })
      .catch((err) => console.log(err));

    e.target.reset();
  };

  if (isPut) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <form onSubmit={submitForm}>
        <label>
          <input
            type="text"
            name="title"
            placeholder="update title"
            onChange={handleOnChange}
            values={update}
          ></input>
        </label>
        <label>
          <input
            type="text"
            name="director"
            placeholder="update director"
            onChange={handleOnChange}
            values={update}
          ></input>
        </label>
        <label>
          <input
            type="number"
            name="metascore"
            placeholder="update metascore"
            onChange={handleOnChange}
            values={update}
          ></input>
        </label>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default UpdateMovie;

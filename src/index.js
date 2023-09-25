import React from "react";
import ReactDOM from "react-dom/client";
import StarRating from "./StarRating";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      maxRating={5}
      message={["Terrible", "Bad", "Ok", "Good", "Amazing"]}
    />
    <StarRating size={24} color="green" className="test" defaultRating={3} /> */}
  </React.StrictMode>
);

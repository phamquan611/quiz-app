import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="bg-page-error">
      <Link to="/">
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;

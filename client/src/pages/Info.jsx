import React from "react";
import DefaultLayout from "../components/DefaultLayout";

function Info({ match }) {

  return (
    <div>
      <DefaultLayout>
        <h1>Info</h1>
        {match.params._id}
      </DefaultLayout>
    </div>
  );
}

export default Info;

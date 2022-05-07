import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useParams } from "react-router-dom";

function Info() {
  const { id } = useParams();
  return (
    <div>
      <DefaultLayout>
        <h1>Info</h1>
        {id}
      </DefaultLayout>
    </div>
  );
}

export default Info;

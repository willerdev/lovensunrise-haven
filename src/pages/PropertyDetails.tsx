import React from "react";
import { useParams } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Property Details</h1>
      <p>Property ID: {id}</p>
    </div>
  );
};

export default PropertyDetails;
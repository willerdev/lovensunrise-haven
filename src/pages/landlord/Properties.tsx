import React from "react";

const LandlordProperties = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Empty state */}
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500 mb-4">You haven't added any properties yet.</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add Your First Property
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandlordProperties;
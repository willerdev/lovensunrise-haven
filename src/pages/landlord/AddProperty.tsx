import React from "react";
import { PropertyFormData } from "@/types/propertyTypes";

const AddProperty = () => {
  const handleSubmit = (data: PropertyFormData) => {
    console.log("Property data:", data);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Property</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" name="title" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input type="text" name="price" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
          <input type="text" name="bedrooms" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
          <input type="text" name="bathrooms" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Area</label>
          <input type="text" name="area" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input type="text" name="address" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input type="text" name="city" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">State</label>
          <input type="text" name="state" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Zip Code</label>
          <input type="text" name="zip_code" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select name="status" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Furnishing</label>
          <select name="furnishing" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
            <option value="furnished">Furnished</option>
            <option value="unfurnished">Unfurnished</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select name="type" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
            <option value="house_rent">House Rent</option>
            <option value="house_sell">House Sell</option>
            <option value="apartment_rent">Apartment Rent</option>
            <option value="land_sell">Land Sell</option>
          </select>
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded">Add Property</button>
      </form>
    </div>
  );
};

export default AddProperty;

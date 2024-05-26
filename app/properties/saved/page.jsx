"use client";
import { useEffect, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";
import toast from "react-hot-toast";

const SavedPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const res = await fetch("/api/bookmarks");
        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          console.log(res.statusText);
          toast.error("Error fetching saved properties");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching saved properties");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProperties();
  }, []);
  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <div className="container m-auto py-6 px-6">
      <h1 className="text-2xl font-bold mb-6">Saved Properties</h1>
      {properties.length === 0 ? (
        <p>No saved properties found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPropertiesPage;

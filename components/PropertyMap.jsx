"use client";
import React, { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker, Popup } from "react-map-gl";
import { setDefaults, fromAddress } from "react-geocode";
import Spinner from "./Spinner";
import Image from "next/image";
import pin from "@/assets/images/pin.svg";

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 28.71845,
    longitude: -106.08873,
    zoom: 12,
    width: "100%",
    height: "500px",
  });

  const [loading, setLoading] = useState(true);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY, // Your API key here.
    language: "en", // Default language for responses.
    region: "us", // Default region for responses.
  });

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fromAddress(
          `${property.location.street}, ${property.location.city}, ${property.location.state}`
        );
        setLat(response.results[0].geometry.location.lat);
        setLng(response.results[0].geometry.location.lng);
        setViewport({
          ...viewport,
          latitude: lat,
          longitude: lng,
        });
        console.log(lat, lng);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        console.log(process.env.NEXT_PUBLIC_MAPBOX_TOKEN);
      }
    };

    if (property) {
      fetchCoordinates();
    }
  }, [property]);

  if (loading) {
    return <Spinner loading={loading} />;
  }
  return (
    !loading && (
      <Map
        // {...viewport}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import("mapbox-gl")}
        initialViewState={{
          latitude: lat,
          longitude: lng,
          zoom: 15,
        }}
        style={{ width: "100%", height: "500" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      ></Map>
    )
  );
};

export default PropertyMap;

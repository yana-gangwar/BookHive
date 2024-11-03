import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Image from "../Image.jsx";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null); // Optional error state

  useEffect(() => {
    axios.get('/places')
      .then(response => {
        setPlaces(Array.isArray(response.data) ? response.data : []);  // Check if data is an array
      })
      .catch(error => {
        console.error("Error fetching places:", error);
        setError("Failed to load places. Please try again later.");
      });
  }, []);

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {places.length > 0 ? (
        places.map(place => (
          <Link key={place._id} to={`/place/${place._id}`}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {place.photos?.[0] && (
                <Image
                  className="rounded-2xl object-cover aspect-square"
                  src={place.photos[0]}
                  alt={`Image of ${place.title}`}
                />
              )}
            </div>
            <h2 className="font-bold">{place.address}</h2>
            <h3 className="text-sm text-gray-500">{place.title}</h3>
            <div className="mt-1">
              <span className="font-bold">${place.price}</span> per night
            </div>
          </Link>
        ))
      ) : (
        <p className="text-center text-gray-500">No places available.</p>
      )}
    </div>
  );
}


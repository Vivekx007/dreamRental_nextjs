"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import { FaBookmark } from "react-icons/fa";
import { set } from "mongoose";

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleClick = async () => {
    if (!userId) {
      toast.error("Please sign in to bookmark this property", {
        icon: "🔒",

        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    try {
      const res = await fetch(`/api/bookmarks`, {
        method: "POST",
        body: JSON.stringify({ propertyId: property._id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        const data = await res.json();
        toast.success(data.message, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        setIsBookmarked(data.isBookmarked);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error bookmarking property", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    const checkBookmark = async () => {
      try {
        const res = await fetch(`/api/bookmarks/check`, {
          method: "POST",
          body: JSON.stringify({ propertyId: property._id }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.status === 200) {
          const data = await res.json();
          setIsBookmarked(data.isBookmarked);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      checkBookmark();
    }
  }, [userId, property._id]);

  if (loading) {
    return (
      <button className="bg-gray-500 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
        <FaBookmark className=" mr-2" /> Loading...
      </button>
    );
  }

  return isBookmarked ? (
    <button
      onClick={handleClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className=" mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className=" mr-2" /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;

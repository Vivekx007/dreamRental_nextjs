'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useGlobalContext } from '@/context/GlobalContext';

const Message = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);

  const { setUnreadCount } = useGlobalContext();

  const handleReadClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'PUT',
      });
      if (res.status === 200) {
        const { read } = await res.json();
        setIsRead(read);
        setUnreadCount((prev) => prev + (read ? -1 : 1));
        if (read) toast.success('Message marked as read');
        else toast.success('Message marked as new');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    }
  };

  const handleDeleteClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'DELETE',
      });
      if (res.status === 200) {
        setIsDeleted(true);
        setUnreadCount((prev) => prev - 1);
        toast.success('Message deleted');
        // refresh page
        // window.location.reload();
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    }
  };

  if (isDeleted) return null;
  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
          New
        </span>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span>{' '}
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Name: {''}</strong> {message.sender.username}
        </li>

        <li>
          <strong>Reply Email: {''}</strong>
          <Link href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </Link>
        </li>
        <li>
          <strong>Reply Phone: {''}</strong>
          <Link href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </Link>
        </li>
        <li>
          <strong>Received: {''}</strong>
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className={`mt-4 mr-3 ${
          isRead ? 'bg-gray-300 ' : 'bg-blue-500 text-white hover:bg-blue-600'
        }   py-1 px-3 rounded-md`}
      >
        {isRead ? 'Mark As Unread' : 'Mark As Read'}
      </button>
      <button
        onClick={handleDeleteClick}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default Message;

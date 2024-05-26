import connectDB from '@/config/database';
import User from '@/models/User';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

// GET /api/bookmarks
export const GET = async (req) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;

    // Find user in the database

    const user = await User.findById({ _id: userId });

    // Get all bookmarked properties

    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });

    return new Response(JSON.stringify(bookmarks), { status: 200 });
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
};

// POST /api/bookmarks
export const POST = async (req) => {
  try {
    await connectDB();

    const { propertyId } = await req.json();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;

    // Find user in the database

    const user = await User.findById({ _id: userId });

    //Check if property is bookmarked

    let isBookmarked = user.bookmarks.includes(propertyId);

    let message;
    if (isBookmarked) {
      // if already bookmarked, remove bookmark

      user.bookmarks.pull(propertyId);
      message = 'Property removed from bookmarks';

      isBookmarked = false;
    } else {
      // if not bookmarked, add bookmark
      user.bookmarks.push(propertyId);
      message = 'Property added to bookmarks';
      isBookmarked = true;
    }

    await user.save();
    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
};

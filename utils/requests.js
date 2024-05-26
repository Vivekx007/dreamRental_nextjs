const apiDomain = process.env.NEXT_PUBLIC_API || null;

// fetch all properties
async function fetchProperties({ showFeatured = false } = {}) {
  try {
    // Handle the case where the API domain is not available yet
    if (!apiDomain) {
      return [];
    }
    const res = await fetch(
      `${apiDomain}/properties${showFeatured ? '/featured' : ''}`,
      { cache: 'no-store' },
    ); // Im using this option to ensure that the browser always fetches the latest data from the server
    // cache: "no-store" option is used to ensure that the browser does not cache the response
    if (!res.ok) {
      throw new Error('An error occurred while fetching the data');
    }

    return res.json();
  } catch (error) {
    console.error(error);
  }
}

// fetch single property
async function fetchProperty(id) {
  try {
    // Handle the case where the API domain is not available yet
    if (!apiDomain) {
      return null;
    }
    const res = await fetch(`${apiDomain}/properties/${id}`);

    if (!res.ok) {
      throw new Error('An error occurred while fetching the data');
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { fetchProperties, fetchProperty };

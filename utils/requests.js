const apiDomain = process.env.NEXT_PUBLIC_API || null;

// fetch all properties
async function fetchProperties() {
  try {
    // Handle the case where the API domain is not available yet
    if (!apiDomain) {
      return [];
    }
    const res = await fetch(`${apiDomain}/properties`);

    if (!res.ok) {
      throw new Error("An error occurred while fetching the data");
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
      throw new Error("An error occurred while fetching the data");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { fetchProperties, fetchProperty };

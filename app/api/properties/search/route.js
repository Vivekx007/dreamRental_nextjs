import connectDB from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties/search
export const GET = async (req) => {
    try{
        await connectDB();

        const {searchParams} = new URL(req.url);
        const location = searchParams.get("location");
        const propertyType = searchParams.get("propertyType");
        // console.log(location, propertyType, searchParams);

        const locationPattern = new RegExp(location, "i"); // i for case-insensitive

        // We are creating a query object that will be used to search for properties in the database
        let query = {
            $or: [ // $or is a MongoDB operator that allows us to query for documents that match at least one of the conditions
                { name: locationPattern },
                { description: locationPattern }, // We are querying the name and description fields of the Property model
                {'location.street' : locationPattern},
                {'location.city' : locationPattern},
                {'location.state' : locationPattern},
                {'location.zipCode' : locationPattern},
            ], 
        
        } ;

        // If the propertyType is not "All", we add it to the query object
        if (propertyType && propertyType !== "All") {
            const typePattern = new RegExp(propertyType, "i");
            query.type = typePattern;
        }

        const properties = await Property.find(query);



        return new Response(JSON.stringify(properties), {status: 200});


    } catch (error) {
       console.log(error);
         return new Response(JSON.stringify('Something went wrong'), {status: 500});
    }
}
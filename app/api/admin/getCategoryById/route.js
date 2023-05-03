import connectDB from "../../../database/connectDB";
import Category from "../../../database/models/Category";


export async function GET(req)
{
    await connectDB('category get by id');
    const id = req.nextUrl.searchParams.get('id')
    try
    {
        const data = await Category.findById({_id : id});
        return new Response(JSON.stringify(data), {
            status: 201,
            headers: {
              'content-type': 'application/json',
            },
          });
    }
    catch(error)
    {
        console.log('error in getting category data by id (server) => ' + server)
        return new Response(JSON.stringify({error : 'cannot get category data'}), {
            status: 408,
            headers: {
              'content-type': 'application/json',
            },
          });
    }
    
}
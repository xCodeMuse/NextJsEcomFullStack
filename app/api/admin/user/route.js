import connectDB from "../../../database/connectDB";
import User from "../../../database/models/User";



export async function GET(req,res) {

    await connectDB('user get');

    try {
        const data = await User.find({ "isAdmin": false });
        if (data) { 
            return new Response(JSON.stringify(data), {
                status: 200,
                headers: {
                  'content-type': 'application/json',
                },
              });
        }
        else {
            return new Response(JSON.stringify({ message: "No data found" }), {
                status: 400,
                headers: {
                  'content-type': 'application/json',
                },})
        }

    } catch (err) {
        console.log('error in fetching user data for admin => ' + err)
        return new Response(JSON.stringify({  message: err.message }), {
            status: 500,
            headers: {
              'content-type': 'application/json',
            },})
    }
}

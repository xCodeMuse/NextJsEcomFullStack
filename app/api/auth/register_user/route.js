import connectDB from "../../../database/connectDB";
import User from "../../../database/models/User";

export async function POST(req,res) {
    const data = await req.json();

    // connecting to the database
    await connectDB();

    // destructuring the data
    const { name, email, password } = data;
    console.log(data)
    
    if (!name || !email || !password) {
        return new Response(JSON.stringify({ error: "Please fill all the fields" }), {
            status: 400,
            headers: {
              'content-type': 'application/json',
            },
          });
    }

    try {
        const user = await User.findOne({ email: email });
        if (user) {
            return new Response(JSON.stringify({ error: "Email already exists" }), {
                status: 400,
                headers: {
                  'content-type': 'application/json',
                },
              });
        }
        else {
            await User.create(data);
            return new Response(JSON.stringify({ message: " Account created Successfully " }), {
                status: 201,
                headers: {
                  'content-type': 'application/json',
                },
              });
        }

    } catch (error) {
        console.log("error in saving user data => " + error.message)
        return new Response(JSON.stringify({ message: 'Something went wrong', }), {
            status: 500,
            headers: {
              'content-type': 'application/json',
            },
          });
    }
}

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectDB from "../../../database/connectDB";
import User from "../../../database/models/User";

export async function POST(req,res) {
    const resJson = await req.json();
    const { email, password } = resJson;

    try {
    // connecting to database
    await connectDB();

    if (!email || !password) {
        return new Response(JSON.stringify({ error: "Please enter all fields" }), {
            status: 400,
            headers: {
              'content-type': 'application/json',
            },
          });
    }
        const user = await User.findOne({ email: email });
        if (!user) {
            return new Response(JSON.stringify({error: "User does not exist"}), {
                status: 400,
                headers: {
                  'content-type': 'application/json',
                },
              });
        }else{

          const isMatch = await bcrypt.compare(password, user.password)
          console.log(isMatch)
          if(isMatch){
            const token = jwt.sign({ user }, `${process.env.secret}`, { expiresIn: '30d' });
            const finalData = { token, user }
            return new Response(JSON.stringify(finalData), {
              status: 200,
              headers: {
                'content-type': 'application/json',
              },
            });
          } else {
            return new Response(JSON.stringify({ error: "Password isn't correct" }), {
                status: 400,
                headers: {
                  'content-type': 'application/json',
                },
              });
            
        }
      }
    } catch (error) {
       
        return new Response(JSON.stringify({ error: "Something went wrong" }), {
            status: 500,
            headers: {
              'content-type': 'application/json',
            },
          });
    }
}


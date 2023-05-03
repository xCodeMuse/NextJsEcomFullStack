import connectDB from "../../../database/connectDB";
import cart from "../../../database/models/Cart";


export async function POST(request) {
  await connectDB();
  return await add_to_cart(request)
}

export async function GET(request) {
  await connectDB('product get');
  return await get_cart_data(request)
}

export async function PUT(request) {
  await connectDB();
   await update_cart_data(request)
}

export async function DELETE(request) {
  await connectDB();
  return await delete_cart_data(request)
}



const add_to_cart = async (req, res) => {
    const data = req.body;
    const { productID, user } = data;

    try {

        const checkProd = await cart.findOne({ $and: [{ productID }, { user }] });

        if (checkProd) return new Response(JSON.stringify({ error: "This product already exists in cart" }), {
          status: 401,
          headers: {
            'content-type': 'application/json',
          },
        });

        await cart.create(data);
        return res.status(200).json({ msg: "Product added to cart " })

    } catch (error) {

        console.log('error in adding product to cart (server) => ' + error)
        return new Response(JSON.stringify({ error: "Something went wrong" }), {
          status: 500,
          headers: {
            'content-type': 'application/json',
          },
        });

    }
}


const get_cart_data = async (req, res) => {
    const id = req.nextUrl.searchParams.get('id')
    try {
        const cartData = await cart.find({ user: id });
        return new Response(JSON.stringify(cartData), {
          status: 200,
          headers: {
            'content-type': 'application/json',
          },
        });
    } catch (error) {
        console.log('error in getting cart data (server) => ' + error)
        return res.status(401).json({ error: "Something went wrong" })
    }
}


const delete_cart_data = async (req, res) => {

    const data = req.body;
    const { productID, user } = data;


    try {

        await cart.deleteOne({ $and: [{ productID }, { user }] });
        return res.status(200).json({ msg: "Product deleted from cart " })

    } catch (error) {

        console.log('error in deleting product from cart (server) => ' + error)
        return res.status(401).json({ error: "Something went wrong" })

    }

}


const update_cart_data = async (req, res) => {
    
        const data = req.body;
        const { productID, user, quantity } = data;
    
        try {
    
            await cart.updateOne({ $and: [{ productID }, { user }] }, {productQuantity : quantity });
            return new Response(JSON.stringify({ msg: "Product updated in cart " }), {
              status: 200,
              headers: {
                'content-type': 'application/json',
              },
            });

        } catch (error) {
    
            console.log('error in updating product in cart (server) => ' + error)
            return new Response(JSON.stringify({ error: "Something went wrong" }), {
              status: 500,
              headers: {
                'content-type': 'application/json',
              },
            });
    
        }
}
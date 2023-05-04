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
    const data = await req.json();
    const { productID, user } = data;
    try {

        const checkProd = await cart.findOne({ $and: [{ productID }, { user }] });
        console.log('checkprod',checkProd)
        if (checkProd){ 
          checkProd.productQuantity += 1;
          await checkProd.save()
          return new Response(JSON.stringify({ msg: "Product added to cart",id:checkProd._id }), {
          status: 200,
          headers: {
            'content-type': 'application/json',
          },
        });
        }else{
          const newCartItem = await cart.create(data);
          return res.status(200).json({ msg: "Product added to cart",id:newCartItem._id })
        }

    } catch (error) {

        console.log('error in adding product to cart (server) => ' + error)
        return new Response(JSON.stringify({ msg: "Something went wrong" }), {
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
        return new Response(JSON.stringify({ error: "Something went wrong" }), {
          status: 500,
          headers: {
            'content-type': 'application/json',
          },
        });
    }
}


const delete_cart_data = async (req, res) => {

    console.log(req,'delete request')
    const user = req.nextUrl.searchParams.get('userId')
    const productID = req.nextUrl.searchParams.get('productId')
    
    try { 

        await cart.deleteOne({ $and: [{ productID }, { user }] });
        return new Response(JSON.stringify({ msg: "Product deleted from cart " }), {
          status: 200,
          headers: {
            'content-type': 'application/json',
          },
        });

    } catch (error) {

        console.log('error in deleting product from cart (server) => ' + error)
        return new Response(JSON.stringify({ error: "Something went wrong" }), {
          status: 500,
          headers: {
            'content-type': 'application/json',
          },
        });

    }

}


const update_cart_data = async (req, res) => {
    
        const data = await req.json();
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
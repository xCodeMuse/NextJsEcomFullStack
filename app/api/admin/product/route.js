import connectDB from "../../../database/connectDB";
import Product from "../../../database/models/Product";


export async function POST(request) {
    await connectDB();
    return await addProduct(request)
  }
  
  export async function GET(request) {
    await connectDB();
    return await getProduct(request)
  }
  
  export async function PUT(request) {
    await connectDB();
    return await updateProduct(request)
  }
  
  export async function DELETE(request) {
    await connectDB();
    return await deleteProduct(request)
  }


// adding product

const addProduct = async (req) => {
    const data = await req.json();
    try {
        await Product.create(data);
        return new Response(JSON.stringify({ msg: "Product Added Successfully" }), {
            status: 201,
            headers: {
              'content-type': 'application/json',
            },})
    }
    catch (error) {
        console.log('error in saving product (server) => ' + error)
        return new Response(JSON.stringify({ error: "Cannot Add Product , Retry !" }), {
            status:405,
            headers: {
              'content-type': 'application/json',
            },})
    }
}

// deleting product
const deleteProduct = async (req) => {
    try {
        const id = req.nextUrl.searchParams.get('id')
        console.log(id);
        const productDeletionResult = await Product.findByIdAndDelete(id);
        return new Response(JSON.stringify({ msg: "Product Deleted Successfully" }), {
            status:201,
            headers: {
              'content-type': 'application/json',
            },})
    }
    catch (error) {
        console.log('error in deleting product(server) => ' + error);
        return new Response(JSON.stringify({ error: "can't delete product , Retry !" }), {
            status:405,
            headers: {
              'content-type': 'application/json',
            },})
    }
}

// update Product
const updateProduct = async (req) => {
    const data = await req.json();
    const id = data._id;
    try {
        await Product.findByIdAndUpdate(id, data)
        return new Response(JSON.stringify({ msg: 'Product updated successfully' }), {
            status:200,
            headers: {
              'content-type': 'application/json',
            },})

    }
    catch (error) {
        console.log('error in getting product data by id (server) => ' + error)
        return new Response(JSON.stringify({ error: 'cannot update product data' }), {
            status:405,
            headers: {
              'content-type': 'application/json',
            },})
    }
}


// get Product
const getProduct = async (req) => {
    const status = req.nextUrl.searchParams.get('featured')
    try {
        const searchParams ={}
        if(status && status == 'true'){
          searchParams.featured = true
        }
        const data = await Product.find({...searchParams});
        return new Response(JSON.stringify(data), {
            status:200,
            headers: {
              'content-type': 'application/json',
            },})
    }
    catch (error) {
        console.log('error in getting product (server) => ' + error);
        return new Response(JSON.stringify({ error: "can't get data , Retry !" }), {
            status:405,
            headers: {
              'content-type': 'application/json',
            },})
    }
}

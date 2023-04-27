import connectDB from "../../../database/connectDB";
import Category from "../../../database/models/Category";
import { useSearchParams } from 'next/navigation';

export async function POST(request) {
  await connectDB();
  return await addCategory(request)
}

export async function GET(request) {
  await connectDB();
  return await getCategory(request)
}

export async function PUT(request) {
  await connectDB();
  return await updateCategory(request)
}

export async function DELETE(request) {
  await connectDB();
  return await deleteCategory(request)
}


// Adding Category

const addCategory = async (req) => {
    const data = await req.json();

    const {name , slug , featured , image , description} = data;

    if(!name || !slug || !featured || !image || !description) {
        return new Response(JSON.stringify({error : "Please fill all the fields"}), {
            status: 422,
            headers: {
              'content-type': 'application/json',
            },
          });
    }
    
    try {
        await Category.create(data);
        return new Response(JSON.stringify({msg : 'Category added successfully'}), {
            status: 201,
            headers: {
              'content-type': 'application/json',
            },
          });
    }
    catch (error) {
        console.log('error adding category', error.message);
        return new Response(JSON.stringify({error : "something went wrong"}), {
            status: 500,
            headers: {
              'content-type': 'application/json',
            },
          });
    }
}


// deleting  Category
const deleteCategory = async (req) => {
    const id = req.nextUrl.searchParams.get('id')
    try {
        await Category.findByIdAndDelete(id);
        return new Response(JSON.stringify({ msg: "category deleted successfully" }), {
            status: 200,
            headers: {
              'content-type': 'application/json',
            },
          });
    }
    catch (error) {
        console.log('error in deleting Category data (backend) => ' + error);
        return new Response(JSON.stringify({ error: "cannot delete category" }), {
            status: 405,
            headers: {
              'content-type': 'application/json',
            },
          });
    }
}

// updating Category

const updateCategory = async (req) => {
    const data = await req.json();
    const id = data._id;
    try{
        console.log('yaha')
        const update = await Category.findByIdAndUpdate(id , data)
        console.log(update,'here')
        return new Response(JSON.stringify({msg : 'category updated successfully'}), {
            status: 200,
            headers: {
              'content-type': 'application/json',
            },
          });
    }catch(error){
        console.log('error in getting category data by id (server) => ' + error)
        return new Response(JSON.stringify({error : 'cannot update category data'}), {
            status: 400,
            headers: {
              'content-type': 'application/json',
            },
          });
    }
}


// getting Category
const getCategory = async (req) => {
    try
    {
        const categories = await Category.find({});
        return new Response(JSON.stringify({categories}), {
            status: 200,
            headers: {
              'content-type': 'application/json',
            },
          });
    }
    catch(error)
    {
        console.log('error in getting Categories data (backend) => ' + error);
        return new Response(JSON.stringify({error : "cannot get categories"}), {
            status: 405,
            headers: {
              'content-type': 'application/json',
            },
          });
    }
}
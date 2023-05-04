
// base URl for all api calls
const baseURl = `http://localhost:3001`;


// getting all users data
export const getUserData = async () => {

    try {
        const res = await fetch(`${baseURl}/api/admin/user`, {
            method: 'GET',
        })
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error in fetching user data for admin (services) => ' + error)
    }
}


// Adding Category
export const add_Category = async (category) => {
    try {
        const res = await fetch(`${baseURl}/api/admin/category`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(category)

        })

        const data = await res.json();
        return data

    } catch (err) {
        console.log('Facing error at addCategory client => ' + err);
    }
}


// getting all categories data
export const getCategoriesData = async () => {
    try {
        const res = await fetch(`${baseURl}/api/admin/category`, {
            method: 'GET',
        })
        const data = await res.json();
        return data.categories;
    } catch (error) {
        console.log('error in getting Categories data (services) => ' + error);
    }
}


// deleting  Category
export const deleteCategory = async (id) => {
    try {
        
        const res = await fetch(`${baseURl}/api/admin/category?id=${id}`, {
            method: 'DELETE',
        })
        const data = await res.json()
        return data
    }
    catch (error) {
        console.log('error in deleting category Data => ' + error);
    }
}

// getting Category by id
export const getCategoryById = async (id) => {
    try {
        const res = await fetch(`${baseURl}/api/admin/getCategoryById?id=${id}`, {
            method: 'GET'
        })
        const data = await res.json();
        return data;
    }
    catch (error) {
        console.log('error in getting specific category (services) => ' + error)
    }
}

// updating Category
export const update_Category = async (category) => {
    console.log(' i got call',category)
    try {
        console.log(' i got call',category)
        const res = await fetch(`${baseURl}/api/admin/category`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        })
        const data = await res.json();
        return data;
    }
    catch (error) {
        console.log('error in updating category (services) => ' + error)
    }
}

// ---------------------------------------------- Products---------------------------------------------------------------------------------

// adding Product
export const add_products = async (product) => {
    try {
        const res = await fetch(`${baseURl}/api/admin/product`, {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product)
        })
        const data = await res.json();
        return data;
    }
    catch (error) {
        console.log('error in saving product (services) => ' + error)
    }
}


// getting all products data
export const getProductsData = async (featured) => {
    try {
        const url = featured ? `${baseURl}/api/admin/product?featured=${featured}&limit=8`:`${baseURl}/api/admin/product`
        const res = await fetch(url, {
            method: 'GET',
        })
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error in getting products data (services) => ' + error);
    }
}

// --------------------------------- Add to cart --------------------------------------------------------------------

export const getOneProductById = async (id) => {
    try {
        const res = await fetch(`${baseURl}/api/admin/product?id=${id}`, {
            method: 'GET'
        })
        const data = await res.json();
        return data;
    }
    catch (error) {
        console.log('error in getting specific product (services) => ' + error)
    }
}

// delete specific product
export const delete_Product = async (id) => {
    try {
        const res = await fetch(`${baseURl}/api/admin/product?id=${id}`, {
            method: 'DELETE',
        })
        const data = await res.json()
        return data
    }
    catch (error) {
        console.log('error in deleting product Data (services) => ' + error);
    }
}



// getting Category by id
export const getProductByID = async (id) => {
    try {
        const res = await fetch(`${baseURl}/api/admin/getProductById?id=${id}`, {
            method: 'GET'
        })
        const data = await res.json();
        return data;
    }
    catch (error) {
        console.log('error in getting specific product (services) => ' + error)
    }
}

// updating Category
export const update_product = async (product) => {
    try {
        const res = await fetch(`${baseURl}/api/admin/product`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        const data = await res.json();
        return data;
    }
    catch (error) {
        console.log('error in updating category (services) => ' + error)
    }
}

// --------------------------------- view product by categories --------------------------------------------------------------------



export const get_Product_By_Category = async (id) => {
    try {
        const res = await fetch(`${baseURl}/api/frontend/getProductByCategory?id=${id}`, {
            method: "GET",
        });
        console.log(res)
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error at getting product by category (services) => ' + error)
    }

}

// --------------------------------- Add to cart --------------------------------------------------------------------

export const add_to_cart = async (product) => {
    try {
        const res = await fetch(`${baseURl}/api/frontend/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error at adding product to cart (services) => ' + error)
    }
}


// --------------------------------- get cart data --------------------------------------------------------------------

export const get_cart_data = async (id) => {
    try {
        const res = await fetch(`${baseURl}/api/frontend/cart?id=${id}`, {
            method: 'GET',
        })
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error at getting cart data (services) => ' + error)
    }
}


// --------------------------------- delete cart data --------------------------------------------------------------------

export const delete_cart_data = async (data) => {
    try {
        const res = await fetch(`${baseURl}/api/frontend/cart?productId=${data.productID}&userId=${data.userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const reply = await res.json();
        return reply;
    } catch (error) {
        console.log('error at deleting cart data (services) => ' + error)
    }
}


// --------------------------------- update cart data --------------------------------------------------------------------
export const update_cart_data = async (data) => {
    try {
        const res = await fetch(`${baseURl}/api/frontend/cart?productId=${data.productID}&userId=${data.user}&quantity=${data.quantity}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
            },
        })
        console.log(res,'logger from service')
        const reply = await res.json(); 
        console.log(reply,'reply logg')
        return reply;
    } catch (error) {
        console.log('error at updating cart data (services) => ' + error.message)
    }

}

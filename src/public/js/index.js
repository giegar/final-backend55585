const socket = io()

socket.on('products', products =>{
    const productsList = document.getElementById('productsList')
    let html = ''

    products.reverse().forEach(product => {
        html += `
        <h4>${product.title}</h4>
        <p>${product.description}</p>
        <p>${product.category}</p>
        <p>${product.price}</p>
        <p>${product.thumbnail}</p>
        <p>${product.code}</p>
        <p>${product.stock}</p>
        <p>${product.status ? 'Disponible':'No disponible'}</p>
        `
    })

    productsList.innerHTML = html    
})

const form = document.getElementById('product-form')

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const category = document.getElementById('category').value
    const price = document.getElementById('price').value
    const thumbnail = document.getElementById('thumbnail').value
    const stock = document.getElementById('stock').value
    const code = document.getElementById('code').value

    const newProduct = {
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
        category: category, 
    };

    socket.emit('newProduct', newProduct)

    form.reset
})
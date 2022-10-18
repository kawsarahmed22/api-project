const loadAllProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products')
    const data = await response.json()
    return data

}

const setAllMenu = async () => {
    const data = await loadAllProducts()
    const menu = document.getElementById('all-menu')
    const uniqueArray = []

    for (const product of data) {
        if (uniqueArray.indexOf(product.category) === -1) {
            uniqueArray.push(product.category)
            const li = document.createElement('li')
            li.innerHTML = `<a>${product.category}</a>`
            menu.appendChild(li)
        }
        // console.log(product.category);

    }
}


setAllMenu()

const searchField = document.getElementById("search-field")
searchField.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
        const searchValue = searchField.value;
        const allProducts = await loadAllProducts()
        foundProducts = allProducts.filter(product => product.category.includes(searchValue))
        // console.log(foundProducts);
        const productsContainer = document.getElementById("products-container")
        productsContainer.textContent = ''

        const notFound = document.getElementById("not-found")
        notFound.textContent = ''
        if(foundProducts.length === 0){
            notFound.innerHTML =`<p class="text-2xl text-orange-500 text-center">Not Found</p>`
        }

        foundProducts.forEach(product => {
            const {category, image, title, description, rating} = product

            // const rating = product.rating;
            // console.log(product.rating.rate);
          

          


       
            const div = document.createElement("div")
            div.innerHTML = `
            <div class="card card-compact w-full bg-base-100 shadow-xl">
            <figure><img class="h-60 w-full" src="${image}" alt="Shoes" /></figure>
            <div class="card-body">
              <h2 class="card-title">${category}</h2>
              <p>${title.length > 20 ? title.slice(0, 20) + '...' : title}</p>
              <div class="card-actions justify-end">
               
                <label for="my-modal-3" onclick="showModal('${description}', '${image}', '${rating.rate}')" class="btn btn-primary modal-button">Show Details</label>
              </div>
            </div>
          </div>

      `
            productsContainer.appendChild(div)
        });
    }

})


const showModal = (description, image, rating)=>{
    
console.log(rating);
const modalBody = document.getElementById("modal-body")
modalBody.textContent = ''
modalBody.innerHTML = `
<h3 class="text-lg font-bold">${description}</h3>
<h3 class="text-lg font-bold">${rating}</h3>


<img src="${image}">



`

}
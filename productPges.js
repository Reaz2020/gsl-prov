document.addEventListener('DOMContentLoaded', function () {
    const cartCountElement = document.getElementById('ClicksCounterForPrdct');

   
    let cartCountNumber = sessionStorage.getItem('cartCountNumber');
 
    if(cartCountNumber!==null){
       cartCountNumber= parseInt(cartCountNumber)
    }
    else{
        cartCountNumber=0;
    }


    cartCountElement.textContent = cartCountNumber; 

    function populateProducts(products, section) { 
        
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('productitem');
            productItem.dataset.id = product.id;

            productItem.innerHTML = `
                <img src="${product.image}" alt="${'problem Loading Product'}">
                <p>${product.name}</p>
                <p>$${product.price}</p>
                <p class="description"></p>
                <button class="addToCart">Add to Cart</button>
                <button class="viewPrdctBtn">View + -</button>
            `;

            section.appendChild(productItem);
        });

      
        const viewItemButtons = section.querySelectorAll('.viewPrdctBtn');
       
        viewItemButtons.forEach(button => {
            button.addEventListener('click', function() {
               
                const productItem = button.closest('.productitem');
                productItem.classList.toggle('enlarge');
                
            });
        });

      
        const addToCartButtons = section.querySelectorAll('.addToCart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
              
                cartCountNumber++;
                cartCountElement.textContent = cartCountNumber; 
                
                sessionStorage.setItem('cartCountNumber', cartCountNumber);
            });
        });
    }

  // sending the json file (from where ill populate the products and section name in which ill populate the products)
    function loadProducts(jsonFilNam, secId) {
        const section = document.getElementById(secId);
        if (!section) return; 

        let storedProducts = sessionStorage.getItem(jsonFilNam);

        if (storedProducts) {
            // I have converted to js object by parsing , to make it easy to populate and save 
            storedProducts = JSON.parse(storedProducts); 
            populateProducts(storedProducts, section);
        } else {
           
            fetch(jsonFilNam)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response failed');
                    }
                    return response.json();
                })
                .then(fetchedProducts => {
                 
                    sessionStorage.setItem(jsonFilNam, JSON.stringify(fetchedProducts));// converting obj to string caz session store can only store string 
                    const savedProducts = JSON.parse(sessionStorage.getItem(jsonFilNam));
                   
                     populateProducts(savedProducts, section);
 
                })
                .catch(error => console.error('Error fetching products:', error));
        }
    }




   
    const page = window.location.pathname.split('/'); // after spliting the rest part will be the file name so I are fethcing it here 
    switch (page.pop()) { // then using the file name I am making a if else , switch case ti see which page is it 
        case 'menCloths.html':
            loadProducts('products/manCloths.json', 'mensClothSection'); // if the page is mans clothe I will populate mensClothe section through this function
            break;
        case 'menAccecories.html':
            loadProducts('products/manAcces.json', 'mensAccesSection');
            break;
        case 'womenCloths.html':
            loadProducts('products/womenCloths.json', 'womenClothsSection');
            break;
        case 'womenAccessories.html':
                loadProducts('products/womenAcces.json', 'womensAccesSection');
                break;
        case 'kidsCloths.html':
            loadProducts('products/KidsCloths.json', 'kidsClothssSection');
            break;
        case 'kidAccecories.html':
                loadProducts('products/kidsAcces.json', 'kidsAccesSection');
                break;    
    }





});

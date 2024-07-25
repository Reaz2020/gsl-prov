document.getElementById('menButton').addEventListener('click', function() {
    window.location.href = 'men.html';
});
document.getElementById('womenButton').addEventListener('click', function() {
    window.location.href = 'women.html';
});
document.getElementById('kidsButton').addEventListener('click', function() {
    window.location.href = 'kids.html';
});

//back img and changing , 
  document.addEventListener('DOMContentLoaded', function () {
    const imageUrls = [
      
        'images/cloth6.jpg',
        'images/cloth8.jpg'
    ];

    let currentIndex = 0;

    function changeBackgroundImage() {
        

        setTimeout(function () {
            document.querySelector('.body').style.backgroundImage = `url('${imageUrls[currentIndex]}')`;
            currentIndex = (currentIndex +=1) % imageUrls.length;
        }, 700);
    }

    setInterval(changeBackgroundImage, 3000);
});


document.addEventListener('DOMContentLoaded', function () {
   
    let currentImgIndx = 0;
    let imagesUrls = []; 
    const TrendImg = document.getElementById("TrendImg");

   
    function changeImage(direction) {

        currentImgIndx += direction;

    if (currentImgIndx >= imagesUrls.length) {
            currentImgIndx = 0;
        }

        TrendImg.src = imagesUrls[currentImgIndx];
    }


    function fetchingImgsFromJsonFile() {
        fetch('products/trending.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network not responded');
                }
                return response.json();
            })
            .then(fetchedProducts => {
                imagesUrls = fetchedProducts.images; // Storing the fetched image URLs in the images array ****
                if (imagesUrls.length > 0) { 
                    TrendImg.src = imagesUrls[0]; // put the first image in the url source of html page 
                }
            })
            .catch(error => console.error('Error  while fetching images:', error));
    }
    setInterval(() => changeImage(1), 2000);
    fetchingImgsFromJsonFile();
    
   
});


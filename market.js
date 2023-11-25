const previewContainer = document.querySelector(".products-preview");
const preview = previewContainer.querySelectorAll(".preview");
const vegetables=['p4','p5','p6','p7']



document.querySelectorAll(".products-container .product").forEach(product=>{
    product.addEventListener("click", () => {
        previewContainer.style.display = "flex";
        let name = product.getAttribute("data-name");
        preview.forEach(preview =>{
           let target = preview.getAttribute("data-target");
           if (name === target){
            preview.classList.add("active");
           }
        })
    })
})




preview.forEach(close => {
    close.querySelector(".fa-times").addEventListener("click", () =>{
        close.classList.remove("active");
        previewContainer.style.display = "none";
    })
})
let currentPosition=0
function moveLeft(divSlider) {
    console.log(divSlider)
     currentPosition += 15; // Adjust the value based on the width of your product items
    if (currentPosition < 0) {
      currentPosition = 0;
    }
    document.getElementById(divSlider).style.transform = `translateX(${-currentPosition}rem)`;
    if(currentPosition>=60){
        currentPosition=0
        document.getElementById(divSlider).style.transform = `translateX(${-currentPosition}rem)`;
      
    }
  }
  
function moveRight(divSlider) {
    console.log(divSlider)
     currentPosition-= 15; // Adjust the value based on the width of your product items
    document.getElementById(divSlider).style.transform = `translateX(${-currentPosition}rem)`;
    if(currentPosition<=0){
        currentPosition=0
        document.getElementById(divSlider).style.transform = `translateX(${-currentPosition}rem)`;
    }
  }


  

  
  function toggleDropdown() {
    const dropdownContent = document.getElementById('dropdownOptions');
    dropdownContent.classList.toggle('show');
  }
  
  function filtering(category) {
    const allTypes = ['vegetables', 'fruits', 'localFood'];
  
    allTypes.forEach((type) => {
      const elements = document.getElementsByClassName(type);
  
      for (let i = 0; i < elements.length; i++) {
        if (category === 'all' || type === category) {
          // Show the selected category or all categories
          elements[i].style.display = 'block';
        } else {
          // Hide other categories
          elements[i].style.display = 'none';
        }
      }
    });
  
    // Close the dropdown after selecting a category
    toggleDropdown();
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      const dropdowns = document.getElementsByClassName('dropdown-content');
      for (let i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  };
  
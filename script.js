const previewContainer = document.querySelector(".products-preview");
const preview = previewContainer.querySelectorAll(".preview");

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


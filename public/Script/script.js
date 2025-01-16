(function () {
    'use strict'
  
    var forms = document.querySelectorAll('.needs-validation')
  
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

  let priceToggle = document.getElementById("flexSwitchCheckDefault");
  let taxInfoElements = document.querySelectorAll(".tax-info");
  
  priceToggle.addEventListener("click", () => {
      if (priceToggle.checked) {
          taxInfoElements.forEach(taxInfo => {
              taxInfo.style.display = "inline";
          });
      } else {
          taxInfoElements.forEach(taxInfo => {
              taxInfo.style.display = "none";
          });
      }
  });
  document.getElementById("scrollLeft").addEventListener("click", function() {
    document.querySelector(".filters-wrapper").scrollBy({
        left: -200,
        behavior: "smooth"
    });
});

document.getElementById("scrollRight").addEventListener("click", function() {
    document.querySelector(".filters-wrapper").scrollBy({
        left: 200,
        behavior: "smooth"
    });
});

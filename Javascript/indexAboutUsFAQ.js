document.addEventListener("DOMContentLoaded", () => {
    const seccionesOcultas = document.querySelectorAll(".hidden-section");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.3 });

    seccionesOcultas.forEach(section => observer.observe(section));
});

document.addEventListener("DOMContentLoaded", function () {
    const faqItems = document.querySelectorAll(".faq-question");

    faqItems.forEach(item => {
        item.addEventListener("click", function () {
            // Encuentra el siguiente elemento que es la respuesta
            const answer = this.nextElementSibling;
            
            // Alternar la visibilidad de la respuesta
            if (answer.style.display === "block") {
                answer.style.display = "none";
                this.querySelector(".icon").textContent = "+"; // Cambia el ícono
            } else {
                answer.style.display = "block";
                this.querySelector(".icon").textContent = "−"; // Cambia el ícono
            }
        });
    });
});

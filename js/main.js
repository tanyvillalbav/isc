/* =========================================================
   Instituto de Sistemas Cusco — UNSAAC
   Script principal: menú móvil, año del footer (si se usa)
   y animación de aparición de bloques al hacer scroll.
   No requiere librerías externas.
   ========================================================= */

(function () {
  "use strict";

  /* ---------- Menú móvil ---------- */
  var botonAbrir = document.getElementById("navToggle");
  var botonCerrar = document.getElementById("menuMovilCerrar");
  var menu = document.getElementById("menuMovil");
  var fondo = document.getElementById("menuMovilFondo");

  function abrirMenu() {
    menu.classList.add("esta-abierto");
    fondo.classList.add("esta-abierto");
    botonAbrir.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function cerrarMenu() {
    menu.classList.remove("esta-abierto");
    fondo.classList.remove("esta-abierto");
    botonAbrir.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (botonAbrir) botonAbrir.addEventListener("click", abrirMenu);
  if (botonCerrar) botonCerrar.addEventListener("click", cerrarMenu);
  if (fondo) fondo.addEventListener("click", cerrarMenu);

  var enlacesMenuMovil = document.querySelectorAll(".menu-movil__enlaces a, .menu-movil__ctas a");
  enlacesMenuMovil.forEach(function (enlace) {
    enlace.addEventListener("click", cerrarMenu);
  });

  /* ---------- Animación al aparecer en pantalla ---------- */
  var elementosAnimados = document.querySelectorAll(".anima-al-scroll");

  // Escalona la aparición de las tarjetas de curso según su posición
  var tarjetasCurso = document.querySelectorAll(".tarjeta-curso.anima-al-scroll");
  tarjetasCurso.forEach(function (tarjeta, indice) {
    tarjeta.style.setProperty("--indice", indice % 3);
  });

  if ("IntersectionObserver" in window) {
    var observador = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("es-visible");
            observador.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    elementosAnimados.forEach(function (el) {
      observador.observe(el);
    });
  } else {
    // Sin soporte de IntersectionObserver: mostrar todo directamente
    elementosAnimados.forEach(function (el) {
      el.classList.add("es-visible");
    });
  }
})();

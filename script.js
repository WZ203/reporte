document.addEventListener("DOMContentLoaded", function () {
  const boton = document.querySelector("button[type='button']");
  const ubicacionInput = document.getElementById("ubicacion");
  const delitoInput = document.getElementById("delito");
  const fechaHora = document.getElementById("fechaHora");
  const formulario = document.getElementById("formulario");

  // Mostrar fecha y hora actual
  const ahora = new Date();
  fechaHora.textContent = ahora.toLocaleString("es-CL");

  // Obtener ubicación al presionar el botón
  boton.addEventListener("click", function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          ubicacionInput.value = `${lat}, ${lng}`;
        },
        function () {
          alert("No se pudo obtener la ubicación.");
        }
      );
    } else {
      alert("Tu navegador no permite obtener ubicación.");
    }
  });

  // Enviar formulario
  formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const datos = {
      fechaHora: fechaHora.textContent,
      ubicacion: ubicacionInput.value,
      delito: delitoInput.value
    };

    fetch("https://script.google.com/macros/s/AKfycbyOtzB7m9ArflaWZqh6qs8L3bLw0qqORKvN3UYHgGpKRIS8oQ_HCFTR9vhJQu1CtwQk/exec", {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.text())
      .then(data => {
        alert("Reporte enviado correctamente.");
        delitoInput.value = "";
        ubicacionInput.value = "";
      })
      .catch(err => {
        alert("Hubo un error al enviar el reporte.");
        console.error(err);
      });
  });
});

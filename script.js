<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Reporte Marinos</title>
</head>
<body>
  <h1>Formulario de Reporte</h1>
  <form id="formulario">
    <p id="fechaHora"></p>
    <label for="delito">Delito:</label>
    <input type="text" id="delito" required>
    <br>
    <label for="ubicacion">Ubicación:</label>
    <input type="text" id="ubicacion" readonly>
    <br>
    <button type="submit">Enviar Reporte</button>
  </form>

  <script>
    document.addEventListener("DOMContentLoaded", function () {
      const boton = document.querySelector("button");
      const ubicacionInput = document.getElementById("ubicacion");
      const delitoInput = document.getElementById("delito");
      const fechaHora = document.getElementById("fechaHora");

      // Mostrar fecha y hora actual
      const ahora = new Date();
      fechaHora.textContent = ahora.toLocaleString("es-CL");

      // Obtener ubicación
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
      }

      // Enviar datos
      document.getElementById("formulario").addEventListener("submit", function (e) {
        e.preventDefault();

        fetch("https://script.google.com/macros/s/AKfycbyOtzB7m9ArflaWZqh6qs8L3bLw0qqORKvN3UYHgGpKRIS8oQ_HCFTR9vhJQu1CtwQk/exec", {
          method: "POST",
          body: JSON.stringify({
            fechaHora: fechaHora.textContent,
            ubicacion: ubicacionInput.value,
            delito: delitoInput.value
          }),
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
        });
      });
    });
  </script>
</body>
</html>

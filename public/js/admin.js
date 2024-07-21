
async function searchHotels() {
    const query = document.getElementById('search-query').value;
    const response = await fetch(`/api/hoteles/search?query=${query}`);
    const hotels = await response.json();

    const hotelsList = document.getElementById('hotels-list');
    hotelsList.innerHTML = '';

    hotels.forEach(hotel => {
        const hotelItem = document.createElement('li');
        hotelItem.className = 'hotel-item';

        hotelItem.innerHTML = `
            <h3>${hotel.nombre}</h3>
            <img src="${hotel.imagen_principal_1}" width="250">
            <img src="${hotel.imagen_principal_2}" width="250">
            <img src="${hotel.imagen_principal_3}" width="250">
            <form action="/api/hoteles/${hotel.id}?_method=PUT" method="POST" class="flex flex-col gap-3">
                <div class="form-group">
                    <label for="nombre">Nombre</label>
                    <input type="text" id="nombre" name="nombre" value="${hotel.nombre}" required>
                </div>
                <div class="form-group">
                    <label for="tipo_alojamiento">Tipo de Alojamiento</label>
                    <input type="text" id="tipo_alojamiento" name="tipo_alojamiento" value="${hotel.tipo_alojamiento}" required>
                </div>
                <div class="form-group">
                    <label for="localidad">Localidad</label>
                    <input type="text" id="localidad" name="localidad" value="${hotel.localidad}" required>
                </div>
                <div class="form-group">
                    <label for="disponibilidad">Disponibilidad</label>
                    <input type="checkbox" id="disponibilidad" name="disponibilidad" ${hotel.disponibilidad ? 'checked' : ''}>
                </div>
                <div class="form-group">
                    <label for="precio">Precio</label>
                    <input type="number" id="precio" name="precio" value="${hotel.precio}" required>
                </div>
                <div class="form-group">
                    <label for="datos">Datos</label>
                    <textarea id="datos" name="datos" required>${hotel.datos}</textarea>
                </div>
                <div class="form-group">
                    <label for="cochera">Cochera</label>
                    <input type="checkbox" id="cochera" name="cochera" ${hotel.cochera ? 'checked' : ''}>
                </div>
                <div class="form-group">
                    <label for="link_booking">Link de Booking</label>
                    <input type="url" id="link_booking" name="link_booking" value="${hotel.link_booking}" required>
                </div>
                <div class="form-group">
                    <label for="link_maps">Link de Maps</label>
                    <input type="url" id="link_maps" name="link_maps" value="${hotel.link_maps}" required>
                </div>
                <div class="form-group">
                    <label for="imagen_principal_1">Imagen Principal 1</label>
                    <input type="url" id="imagen_principal_1" name="imagen_principal_1" value="${hotel.imagen_principal_1}" required>
                </div>
                <div class="form-group">
                    <label for="imagen_principal_2">Imagen Principal 2</label>
                    <input type="url" id="imagen_principal_2" name="imagen_principal_2" value="${hotel.imagen_principal_2}" required>
                </div>
                <div class="form-group">
                    <label for="imagen_principal_3">Imagen Principal 3</label>
                    <input type="url" id="imagen_principal_3" name="imagen_principal_3" value="${hotel.imagen_principal_3}" required>
                </div>
                <div class="form-group">
                    <label for="calificacion">Calificación (Estrellas)</label>
                    <input type="number" id="calificacion" name="calificacion" value="${hotel.calificacion}" min="1" max="5" required>
                </div>
                <div class="form-group">
                    <label for="huespedes">Cantidad de Personas</label>
                    <input type="number" id="huespedes" name="huespedes" value="${hotel.huespedes}" required>
                </div>
                <div class="form-group">
                    <label for="direccion">Dirección</label>
                    <input type="text" id="direccion" name="direccion" value="${hotel.direccion}" required>
                </div>
                <div class="form-group">
                    <label for="servicios">Servicios</label>
                    <input type="text" id="servicios" name="servicios" value="${hotel.servicios}" required>
                </div>
                <button type="submit" class="btn">Editar</button>
            </form>
            <form action="/api/hoteles/${hotel.id}?_method=DELETE" method="POST">
                <button type="submit" class="btn delete-btn">Eliminar</button>
            </form>
        `;
        hotelsList.appendChild(hotelItem);
    });
}
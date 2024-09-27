document.getElementById('climaForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const ciudad = document.getElementById('ciudad').value;

    try {
        const responseClima = await fetch(`/clima/${ciudad}`);
        const datosClima = await responseClima.json();
        const climaInfo = `
            Ciudad: ${datosClima.ciudad}<br>
            País: ${datosClima.pais}<br>
            Temperatura: ${datosClima.temperatura}°C<br>
            Humedad: ${datosClima.humedad}%<br>
            Descripción: ${datosClima.descripcion}
        `;
        document.getElementById('clima').innerHTML = climaInfo;

        const responsePronostico = await fetch(`/pronostico/${ciudad}`);
        const datosPronostico = await responsePronostico.json();
        document.getElementById('pronostico').innerText = `Temperatura: ${datosPronostico.temperatura}°C`;
    } catch (error) {
        document.getElementById('clima').innerText = 'Error al obtener el clima';
        document.getElementById('pronostico').innerText = 'Error al obtener el pronóstico';
    }
});

document.getElementById('criptoForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const criptomoneda = document.getElementById('criptomoneda').value;
    try {
        const precioResponse = await fetch(`/precio/${criptomoneda}`);
        const precioData = await precioResponse.json();
        document.getElementById('precio').textContent = `USD ${precioData.precio}`;

        const historicoResponse = await fetch(`/historico/${criptomoneda}`);
        const historicoData = await historicoResponse.json();
        const historicoList = document.getElementById('historico');
        historicoList.innerHTML = '';
        historicoData.forEach(entry => {
            const listItem = document.createElement('li');
            listItem.textContent = `Fecha: ${entry.fecha}, Precio: USD ${entry.precio}`;
            historicoList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error al obtener los datos de la criptomoneda:', error);
    }
});

document.getElementById('alertarBtn').addEventListener('click', async function() {
    const criptomoneda = document.getElementById('criptomoneda').value;
    const valorObjetivo = parseFloat(document.getElementById('valorObjetivo').value);
    
    try {
        const valorActual = await obtenerPrecioActual(criptomoneda);
        
        // Comparar el valor actual con el valor objetivo solo si el valor objetivo está definido
        if (!isNaN(valorObjetivo)) {
            if (valorActual >= valorObjetivo) {
                const mensaje = `¡Alerta para la moneda ${criptomoneda} con éxito! Ha alcanzado el valor objetivo de ${valorObjetivo}. Valor actual: ${valorActual}`;
                document.getElementById('alerta').innerText = mensaje;
            } else {
                const mensaje = `La criptomoneda ${criptomoneda} tiene un valor de ${valorActual}, valor alertado de ${valorObjetivo}`;
                document.getElementById('alerta').innerText = mensaje;
            }
        } else {
            document.getElementById('alerta').innerText = `Por favor, ingrese un valor objetivo válido.`;
        }
    } catch (error) {
        console.error('Error al obtener el precio actual:', error);
        document.getElementById('alerta').innerText = `Error al obtener el precio actual de la criptomoneda.`;
    }
});

async function obtenerPrecioActual(criptomoneda) {
    try {
        const response = await fetch(`/precio/${criptomoneda}`);
        const data = await response.json();
        return data.precio;
    } catch (error) {
        console.error('Error al obtener el precio actual:', error);
        return 0; // Valor de ejemplo en caso de error
    }
}
const preguntas = [
    { texto: "¿Te gusta la U de Chile o Colo Colo?", opciones: ["u", "colo colo"] },
    { texto: "¿Te gusta el sushi?", opciones: ["si", "no"] },
    { texto: "¿Frío o calor?", opciones: ["frio", "calor"] },
    { texto: "¿Cuál es peor, reggaetón o trap?", opciones: ["reggaeton", "trap"] },
    { texto: "¿Playa o bosque?", opciones: ["playa", "bosque"] },
    { texto: "¿Casado o soltero(a)?", opciones: ["casado", "soltero"] },
    { texto: "¿Tienes hijos?", opciones: ["si", "no"] },
    { texto: "¿Android o Apple?", opciones: ["android", "apple"] }
];

const votos = JSON.parse(localStorage.getItem('votos')) || preguntas.map(() => ({}));

const votar = (preguntaIndex, opcion) => {
    const opcionLower = opcion.toLowerCase();
    if (!preguntas[preguntaIndex].opciones.includes(opcionLower)) {
        console.log("Opción no válida.");
        return;
    }
    
    votos[preguntaIndex][opcionLower] = (votos[preguntaIndex][opcionLower] || 0) + 1;
    localStorage.setItem('votos', JSON.stringify(votos));
};

const mostrarResultados = () => {
    console.log("Resultados de la encuesta:");
    preguntas.forEach((pregunta, index) => {
        console.log(`Pregunta ${index + 1}: ${pregunta.texto}`);
        Object.entries(votos[index]).forEach(([opcion, cantidad]) => {
            console.log(`   ${opcion}: ${cantidad} votos`);
        });
    });
};

const iniciarEncuesta = () => {
    preguntas.forEach((pregunta, index) => {
        let respuesta;
        do {
            respuesta = prompt(`${pregunta.texto} (${pregunta.opciones.join('/')})`).toLowerCase();
        } while (!pregunta.opciones.includes(respuesta));
        votar(index, respuesta);
    });
    mostrarResultados();
};

iniciarEncuesta();
class Encuesta {
    constructor(titulo, preguntas) {
        this.titulo = titulo;
        this.preguntas = preguntas;
        this.votos = JSON.parse(localStorage.getItem('votos')) || Array(preguntas.length).fill().map(() => ({}));
    }
    
    votar(preguntaIndex, opcion) {
        if (preguntaIndex < 0 || preguntaIndex >= this.preguntas.length) {
            console.log("Pregunta no válida.");
            return;
        }
    
    opcion = opcion.toLowerCase();
        if (!this.votos[preguntaIndex][opcion]) {
            this.votos[preguntaIndex][opcion] = 0;
        }
        this.votos[preguntaIndex][opcion]++;
        localStorage.setItem('votos', JSON.stringify(this.votos));
    }

    mostrarResultados() {
        console.log(`Resultados de la encuesta: ${this.titulo}`);
        this.preguntas.forEach((pregunta, index) => {
            console.log(`Pregunta ${index + 1}: ${pregunta.texto}`);
            for (let [opcion, votos] of Object.entries(this.votos[index])) {
                console.log(`   ${opcion}: ${votos} votos`);
            }
        });
    }

    iniciarEncuesta() {
        this.preguntas.forEach((pregunta, index) => {
            let respuesta;
            do {
                respuesta = prompt(`${pregunta.texto} (${pregunta.opciones.join('/')})`).toLowerCase();
            } while (!pregunta.opciones.map(op => op.toLowerCase()).includes(respuesta));
            this.votar(index, respuesta);
        });
        this.mostrarResultados();
    }
}

testEncuesta = new Encuesta("Encuesta de Preferencias", [
    { texto: "¿Te gusta la U de Chile o Colo Colo?", opciones: ["U", "Colo Colo"] },
    { texto: "¿Te gusta el sushi?", opciones: ["Si", "No"] },
    { texto: "¿Frío o calor?", opciones: ["Frio", "Calor"] },
    { texto: "¿Cuál es peor, reggaetón o trap?", opciones: ["Reggaeton", "Trap"] },
    { texto: "¿Playa o bosque?", opciones: ["Playa", "Bosque"] },
    { texto: "¿Casado o soltero(a)?", opciones: ["Casado", "Soltero"] },
    { texto: "¿Tienes hijos?", opciones: ["si", "No"] },
    { texto: "¿Android o Apple?", opciones: ["Android", "Apple"] }
]);

testEncuesta.iniciarEncuesta(); 
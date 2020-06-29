class Interfaz {

    constructor() {
        this.init()
    }
    init() {
        this.construirSelect()
    }

    construirSelect() {
        cotizador.obtenerMonedasAPI()
            .then(monedas => {
                const select = document.querySelector('#criptomoneda')
                for(const [key,value] of Object.entries(monedas.monedas.Data)) {
                    const opcion = document.createElement('option')
                    opcion.value = value.Symbol
                    opcion.appendChild(document.createTextNode(value.CoinName))
                    select.appendChild(opcion)
                }
            })
    }

    mostrarMensaje(mensaje, clases) {
        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));

        // seleccionar mensajes
        const divMensaje = document.querySelector('.mensajes');
        divMensaje.appendChild(div);

        // mostrar contenido
        setTimeout(() => {
             document.querySelector('.mensajes div').remove();
        }, 3000);
   }

   mostrarResultado(resultado, moneda, crypto) {
    const resultadoAnterior = document.querySelector('#resultado > div')
    if(resultadoAnterior) resultadoAnterior.remove()
    const datosMoneda = resultado[crypto][moneda]
    let precio = datosMoneda.PRICE.toFixed(2)
    let porcentaje = datosMoneda.CHANGEPCTDAY.toFixed(2)
    let actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString()
    let templateHTML = `
        <div class="card bg-warning">
            <div class="card-body text-light">
                <h2 class="card-title">Resultado:</h2>
                <p>Precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de: $${precio}</p>
                <p>Variación último día: %${porcentaje}</p>
                <p>Última actualización ${actualizado}</p>
            </div>
        </div>
    `;
    this.mostrarOculataSpinner('block')
    setTimeout(() => {
        document.querySelector('#resultado').innerHTML = templateHTML
        this.mostrarOculataSpinner('none')
    }, 3000);
   }

   mostrarOculataSpinner(vista) {
       const spinner = document.querySelector('.contenido-spinner')
       spinner.getElementsByClassName.display = vista
   }
}
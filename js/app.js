const cotizador = new API('ee77d928e8d77a9eadce5b3847816e21088fc39da2de3f6c172f39b0697a2cd3')
const ui = new Interfaz()
const formulario = document.querySelector('#formulario')

formulario.addEventListener('submit', e =>{
    e.preventDefault()
    
    const monedaSelect = document.querySelector('#moneda')
    const monedaSelecionada = monedaSelect.options[monedaSelect.selectedIndex].value

    const criptoMonedaSelect = document.querySelector('#criptomoneda')
    const criptoMonedaSelecionada = criptoMonedaSelect.options[criptoMonedaSelect.selectedIndex].value
    
    if(monedaSelecionada === '' || criptoMonedaSelecionada === '') {
        ui.mostrarMensaje('Ambos campos son obligatorios', 'alert bg-danger text-center')
    } else {
        cotizador.obtenerValores(monedaSelecionada, criptoMonedaSelecionada)
        .then(data => ui.mostrarResultado(data.resultado.RAW, monedaSelecionada, criptoMonedaSelecionada))
    }
})
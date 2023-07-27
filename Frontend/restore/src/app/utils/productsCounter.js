export default function productsCounter(estado) {
    const cantidadEstados = {};
  
    for (let i = 0; i < estado.length; i++) {
      const elemento = estado[i];
  
      if (!cantidadEstados.hasOwnProperty(elemento)) {
        cantidadEstados[elemento] = 1;
      } else {
        cantidadEstados[elemento]++;
      }
    }
  
    return cantidadEstados;
  }
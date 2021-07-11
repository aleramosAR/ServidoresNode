const generarNumeros = (cant) => {
  const numeros = {}

  for (let i = 0; i < cant; i++) {
      const numero = parseInt(Math.random() * 1000) + 1
      if (!numeros[numero]) {
          numeros[numero] = 0
      }
      numeros[numero]++
  }
  return numeros;
}

process.on('message', msg => {
  const cant = process.argv[2];
  if (msg == 'calcular') {
    const numeros = generarNumeros(cant);
    process.send(numeros);
  }
});
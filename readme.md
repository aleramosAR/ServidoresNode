# Servidores Node

<br />

**Tomando con base el proyecto que vamos realizando, agregar un parámetro más en la ruta de comando que permita ejecutar al servidor en modo fork o cluster. Dicho parámetro será 'FORK' en el primer caso y 'CLUSTER' en el segundo, y de no pasarlo, el servidor iniciará en modo fork.**<br />

Como la aplicación ya tenia una funcionalidad que permitía pasar los parámetros de conexión de FB, tengo que hacer una diferenciación dependiendo de que scripts se usa para saber si los argumentos que vienen son los códigos de FB o el Puerto o algún otro tipo de variable.<br />
Para eso estoy leyendo **process.env.npm_lifecycle_event** que me devuelve el nombre del script que se llamo desde ```npm run```, si el script es start, startFB, cluster, fork, etc.<br />
En utils.js donde defino las variables de puerto, facebook ID etc. segun el vnombre de ese script le digo que lea unos u otros argumentos de la llamada.
<br />
Los scripts que use son los siguientes:<br />
```
"scripts": {
  "start": "node server.js",
  "startFB": "node server.js 559885825005670 6a2926fd1ded556381f2275ddfbee1f2",
  "fork": "nodemon server.js",
  "cluster": "nodemon server.js",
  "forever": "forever start -w server.js",
  "pm2fork": "pm2 start server.js --name='server' --watch",
  "pm2cluster": "pm2 start server.js --name='server' --watch -i max -- 8080"
}
```
<br />

###### Inicializar la app en modo standard:<br />
```npm start``` -> Corre el código ```node server.js```<br />
```npm run startFB``` -> Corre el código ```node server.js 559885825005670 6a2926fd1ded556381f2275ddfbee1f"```, permitiendo que se pasen los datos de conexión de FB a mano, en este caso use los mismos de la app que cree.

<hr />

**Agregar en la vista info, el número de procesadores presentes en el servidor.**<br />
Agregue el dato “Número de CPUs” en http://localhost:8080/info

<hr />

**Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node.**<br />

```npm run fork``` -> Corre el código ```nodemon server.js```, y pasa **fork** como **npm_lifecycle_event**.<br />
Se le puede pasar el puerto para que abra diferentes forks, por ejemplo:

```
npm run fork 8080
npm run fork 8081
npm run fork 8082
```

<br />
Se puede ver el puerto y proceso entrando a la ruta<br />
http://localhost:[PUERTO]/fork
<br />

Por ejemplo:
http://localhost:8080/fork
http://localhost:8081/fork
http://localhost:8082/fork
http://localhost:8083/fork
etc..

```npm run cluster``` -> Corre el código ```nodemon server.js```, y pasa **cluster** como **npm_lifecycle_event**.
Levanta un PID master que lo muestra x consola y (en mi caso) 8 workers.
http://localhost:8080/cluster

**Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su correcta operación. Listar los procesos por Forever y por sistema operativo.**<br />
"npm run forever" -> Corre el código "forever start -w server.js".
Levanta 2 procesos, uno de “forever” y el otro del JS.
uid	 command		script	forever	pid	id logfile 
 [0] oLz	/usr/local/bin/node	server.js	98727	98728	/Users/aleramos/.forever/oLz_.log

 <hr />

**Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus modos modo fork y cluster. Listar los procesos por PM2 y por sistema operativo.**<br />
Hay 2 scripts:
```npm run pm2fork``` -> Corre el script ```pm2 start server.js --name='server' --watch```<br />
```npm run pm2cluster``` -> Corre el script ```pm2 start server.js --name='server' --watch -i max -- 8080```<br />
Para correr en modo fork se le puede pasar el parámetro de puerto
```
npm run pm2fork 8080
npm run pm2fork 8081
npm run pm2fork 8082
```
<hr />

**Tanto en Forever como en PM2 permitir el modo escucha, para que la actualización del código del servidor se vea reflejado inmediatamente en todos los procesos.**<br />
En **forever** lo hice agregando el parámetro **-w**<br />`forever start -w server.js`.
En **PM2** lo hice agregando el parametro **--watch**<br />`pm2 start server.js --name='server' --watch`

<hr />

**Hacer pruebas de finalización de procesos fork y cluster en los casos que corresponda.**<br />
`npm run fork`
Se abren dos procesos, uno de nodemon y otro de la app.
Al cerrar el de nodemon se cierra todo sin error, y al cerrar la app da un mensaje de "app crashed".<br />

`npm run cluste`r
Se abre un proceso master y, en mi caso, 8 workers.
Si se cierra el proceso master se cierra todo con un mensaje de "app crashed". Si se cierra uno de los procesos workers se abre uno nuevo para reemplazarlo.<br />

`npm run pm2fork`
Abre un proceso de PM2 y otro de la aplicación.
Al cerrar el proceso de PM2 se cierra todo.
Al cerrar el proceso de la aplicacion abre un proceso nuevo.<br />

`npm run pm2cluster`
Abre un proceso de PM2 y 8 workers.
Al cerrar el proceso de PM2 se cierra todo.
Al cerrar el proceso de la aplicacion abre un proceso nuevo.<br />

<hr />

**NOTA:
Es probable que en el caso de tener activo el child process fork (realizado en el entregable anterior) aparezcan más procesos de node activos que la cantidad esperada. Desactivar el código del fork y su endpoint '/randoms' y verificar que ahora la cantidad de procesos de node corresponda.**<br />
Anule la ruta `/randoms` para evitar problemas con lo la cantidad de procesos.
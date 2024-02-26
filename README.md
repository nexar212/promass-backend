﻿
Prueba técnica Grupo Promass

Ing Software Alexis Ramiro Félix Rosales

=== Instalación ===

1.- Asegúrate de tener Node.js y npm instalados en tu máquina.

2.- Clona este repositorio a tu máquina local utilizando el siguiente comando: git clone https://github.com/nexar212/promass-backend.git

3.- Navega al directorio del proyecto: cd .\promass-backend\

4.- Instala las dependencias utilizando npm: npm install

=== Uso ===

Es necesario contar con un servidor de base datos SQL Server para el guardado de la información.

Una vez que hayas instalado las dependencias y tengas tu servidor de SQL Server, abre el archivo connection.js ubicado en la carpeta database.

Modifica la cadena de conexión con la información de tu servidor SQL Server, solo se debe cambiar el usuario, password, server, puerto y la database.

const dbSettings = {
    user: 'promass-user', //Cambiar
    password: 'password', //Cambiar
    server: 'localhost',  //Cambiar
    port: 1433, //Cambiar
    database: 'promass', //Cambiar
    options: {
      encrypt: true, 
      trustServerCertificate: true 
    }
};


Puedes iniciar el servidor de desarrollo con el siguiente comando: npm run dev

Esto iniciará el servidor.

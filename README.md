# OpenWhisk RSE - Rastreador de Precios

Monitoriza precios de productos y recibe notificaciones cuando cambien usando funciones serverless de OpenWhisk.

## Requisitos Previos

- Docker & Docker Compose
- Node.js 18+
- OpenWhisk CLI (wsk)
- Token de Bot de Telegram (para notificaciones)
- PostgreSQL (se instala automáticamente con Docker)


## Instrucciones de Instalación

1. Iniciar el entorno OpenWhisk:
```
docker compose up --build
```

2. Instalar dependencias
```
npm install
```


3. Empaquetar dependencias

```
webpack
```

4. Configurar credenciales OpenWhisk 
```
wsk property set --apihost http://localhost:3233 --auth 23bc46b1-71f6-4ed5-8c54-816aa4f8c502:123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP
```


5. Desplegar el proyecto en OpenWhisk
```
wsk project deploy
```
6. Añadir un producto 
```
wsk action invoke lib/addProduct -r -p name "Ordenador1" -p price "349" -p url "https://deplatec.com/torres-de-oficina/63886-pctec-office-of3-ryzen-7-5700g-16gb-1tb.html" -p teleid "6963596982"
```
Tras todos estos comandos se comprobará cada minuto si los precios han bajado y en caso de hacerlo se enviará una notificación al id de telegram añadido al crear el producto. En el ejemplo se añade el id de uno de los alumnos, en caso de querer probarlo se deberá añadir un nuevo id de telegram. 

## Acciones

```
wsk action invoke lib/scraper -r -p url "https://deplatec.com/torres-de-oficina/63886-pctec-office-of3-ryzen-7-5700g-16gb-1tb.html"
```

```
wsk action invoke lib/enviarNotificacion -r -p "mensaje" "Hola, esto es una prueba" -p teleid "6963596982"
```

```
wsk action invoke lib/deleteProduct -r -p "id" "1"
```

```
wsk action invoke lib/listProducts -r
```

```
wsk action invoke lib/runtime -r
```



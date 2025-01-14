# Openwhisk RSE

Para probar:

Opción 1 (Comandos docker):

docker run -it -v /var/run/docker.sock:/var/run/docker.sock -p 3233:3233 -p 3232:3232 openwhisk/standalone:8f8a4aa 

docker run -d --name my-postgres-db -e POSTGRES_USER=rse_user -e POSTGRES_PASSWORD=rse_password -e POSTGRES_DB=mydb -p 5432:5432 -v postgres_data:/var/lib/postgresql/data postgres:latest

Opción 2 (Docker compose):

docker compose up

1. npm install

2. webpack

3. wsk project deploy

4. wsk action invoke lib/scraper -r -p "url" "https://deplatec.com/torres-gaming/63909-pctec-gaming-ga5-ryzen-5-5500-32gb-1tb-rtx-4060-ti.html"

5. wsk action invoke lib/enviarNotificacion -r -p "mensaje" "Hola, esto es una prueba"

6. wsk action invoke lib/addProduct -r -p "name" "PCTEC - GAMING GA5 RYZEN 5 5500 | 32GB | 1TB | RTX 4060 TI" -p  "price" "769" -p "url" "https://deplatec.com/torres-gaming/63909-pctec-gaming-ga5-ryzen-5-5500-32gb-1tb-rtx-4060-ti.html"

7. wsk action invoke lib/deleteProduct -r -p "id" "1"

8. wsk action invoke lib/listProducts -r

9. wsk action invoke lib/runtime -r

10. wsk action invoke lib/scheduler -r

## NOTA:

Dejo WSK.exe que es la CLI de openwhisk para windows.

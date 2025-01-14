# Openwhisk RSE

Para probar:

Instrucciones:

1. docker run -it -v /var/run/docker.sock:/var/run/docker.sock -p 3233:3233 -p 3232:3232 openwhisk/standalone:8f8a4aa 

2. docker run -d --name my-postgres-db -e POSTGRES_USER=rse_user -e POSTGRES_PASSWORD=rse_password -e POSTGRES_DB=mydb -p 5432:5432 -v postgres_data:/var/lib/postgresql/data postgres:latest

3. npm install

4. webpack

5. wsk property set --apihost http://localhost:3233 --auth 23bc46b1-71f6-4ed5-8c54-816aa4f8c502:123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP

5. wsk project deploy

6. wsk action invoke lib/scraper -r -p "url" "https://deplatec.com/torres-de-oficina/63886-pctec-office-of3-ryzen-7-5700g-16gb-1tb.html"

7. wsk action invoke lib/enviarNotificacion -r -p "mensaje" "Hola, esto es una prueba"

8. wsk action invoke lib/addProduct -r -p "name" "PCTEC OFFICE OF3 RYZEN 7 5700G | 16GB | 1TB" -p  "price" "349" -p "url" "https://deplatec.com/torres-de-oficina/63886-pctec-office-of3-ryzen-7-5700g-16gb-1tb.html"

8. wsk action invoke lib/deleteProduct -r -p "id" "1"

9. wsk action invoke lib/listProducts -r

10. wsk action invoke lib/runtime -r

11. wsk action invoke lib/scheduler -r

## NOTA:

Dejo WSK.exe que es la CLI de openwhisk para windows.

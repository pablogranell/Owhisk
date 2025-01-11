Para probar:

wsk project deploy

wsk action invoke /guest/chollometro2/testeos -r

Ya no es necesaria la compilacion, usa: https://mega.co.nz/#!0g0XkJiQ!Lk7XCyGwi_R1E_NhoXnL_k3ZrHhO1h0tOW18Wa9G44I

Para ejectuar(CMD):
1. abrir docker desktop
2. java -jar .\openwhisk-standalone.jar
3. wsk.exe project deploy
4. (Para probar) http://localhost:3233/api/v1/web/guest/chollometro2/hola-mundo
o
5. wsk action invoke chollometro2/hola-mundo -r

Pido perdon por cambiar la rama por defecto a main, habia intentado poner LFS pero no me funcionaba.

Compilacion:

Necesita java, su SDK, docker y node para compilar

Dejo WSK.exe que es la CLI


NUEVA DOCU


docker run -it -v /var/run/docker.sock:/var/run/docker.sock -p 3233:3233 -p 3232:3232 openwhisk/standalone:8f8a4aa 


docker run -d --name my-postgres-db -e POSTGRES_USER=rse_user -e POSTGRES_PASSWORD=rse_password-e POSTGRES_DB=mydb -p 5432:5432 -v postgres_data:/var/lib/postgresql/data postgres:latest
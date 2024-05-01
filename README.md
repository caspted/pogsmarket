Instructions:

1.) Go to "server" folder and copy/rename "env.test" into ".env.test"

2.) Replace the "DATABASE_URL" with your database details

3.) Run the following in order:

---------------------------
cd ./server

npm i

yarn migrate:test

npx prisma db seed


yarn dev:test

---------------------------
cd ../client

npm i

yarn dev

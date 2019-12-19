pm2 start ./test-eg2/server.js --name "eg"

pm2 start ./api-auth/app.js --name "api-auth"
pm2 start ./api-crud/app.js --name "api-crud"

cd ./0-react-client/ && npm run start
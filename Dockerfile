FROM node:10-alpine
WORKDIR /app
COPY ${PWD}/package.json ./
# RUN yarn
RUN npm install
COPY . .
# RUN yarn build
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

# CMD ["npm", "run", "start:prod"]
# CMD ["sh", "-c", "yarn typeorm migration:run & yarn start:prod"]

# when have a change inm the code, use: 
# docker-compose up --build 
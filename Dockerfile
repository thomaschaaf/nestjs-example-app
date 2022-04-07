FROM node:14-alpine AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies

RUN npm run ci

COPY . .
RUN npm run build

FROM node:14-alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]

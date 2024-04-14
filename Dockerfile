FROM node:19.3.0
RUN npm install -g pnpm http-server
WORKDIR /src
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN npm run build
ENTRYPOINT [ "npm", "run", "dev" ]

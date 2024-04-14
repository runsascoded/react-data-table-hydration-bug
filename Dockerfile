FROM node:19.3.0
RUN npm install -g pnpm
WORKDIR /src
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
ENTRYPOINT [ "npm", "run", "dev" ]

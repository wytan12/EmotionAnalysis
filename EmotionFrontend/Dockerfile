FROM node:18 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
RUN npm install -g @angular/cli
COPY . .
RUN npm run build --prod
FROM nginx:alpine
COPY --from=build /app/dist/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

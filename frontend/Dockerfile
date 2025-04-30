# Step 1: Build React app
FROM node:18-alpine AS builder

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:stable-alpine

# Copy custom Nginx config (optional, shown below)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built React files
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

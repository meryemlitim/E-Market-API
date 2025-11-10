# Use official lightweight Node image
FROM node:20-alpine

# 1️⃣ Set the working directory
WORKDIR /app

# 2️⃣ Copy package files first (for caching)
COPY package*.json ./

# 3️⃣ Install dependencies
RUN npm install

# 4️⃣ Copy all project files (not just src)
COPY . .

# 5️⃣ Expose the port your API uses
EXPOSE 3000

# 6️⃣ Start the app
CMD ["npm", "start"]

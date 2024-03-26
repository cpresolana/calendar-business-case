export default defineNuxtConfig({
  runtimeConfig: {
    mongoUrl: process.env.MONGO_URL,
  },
  nitro: {
    plugins: ["~/server/index.ts"],
  },
});
module.exports = {
  apps: [
    {
      name: process.env.PM2_APP_NAME || "hobesoundfarms",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3010",
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3010,
      },
    },
  ],
};

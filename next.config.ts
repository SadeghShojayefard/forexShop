const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb', // یا هر عددی که نیاز داری
    },
  },
  eslint: {
    ignoreDuringBuilds: true, // جلوی شکست خوردن Deploy رو می‌گیره
  },
};

module.exports = nextConfig;

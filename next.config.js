/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    services: {
      laser: {
      translationKeyPrefix: 'laser',
      provider_vector: 'Laser'}
    }
  },
  serverRuntimeConfig: {
    services: {
      laser: {
        providerConfig_vector: {
          
        }
      }
    }
  }
}

module.exports = nextConfig

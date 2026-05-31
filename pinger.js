export default {
  urlsToPing: [
    "https://example1.com",
    "https://example2.com",
    "https://example3.com",
  ],

  async scheduled(event, env, ctx) {
    for (const url of this.urlsToPing) {
      try {
        const response = await fetch(url);
        console.log(`✅ ${url} - ${response.status}`);
      } catch (error) {
        console.error(`❌ ${url} - ${error.message}`);
      }
    }
  },

  async fetch(request) {
    return new Response("SoeMoePing is running! Pinging every minute.", { status: 200 });
  }
};

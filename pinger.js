export default {
  urlsToPing: [
    "https://example1.com",
    "https://example1.com",
    "https://example1.com",
    "https://example1.com",
    "https://example1.com"
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
    let text = "Pinging these URLs:\n\n";
    for (const url of this.urlsToPing) {
      text = text + url + "\n";
    }
    return new Response(text, { status: 200 });
  }
};

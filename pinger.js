export default {
  urlsToPing: [
    "https://example1.com",
    "https://example2.com",
    "https://example3.com",
  ],

  async scheduled(event, env, ctx) {
    console.log(`🕐 Ping started at ${new Date().toISOString()}`);
    
    for (const url of this.urlsToPing) {
      try {
        const startTime = Date.now();
        const response = await fetch(url);
        const elapsed = Date.now() - startTime;
        console.log(`✅ ${url} - ${response.status} (${elapsed}ms)`);
      } catch (error) {
        console.error(`❌ ${url} - ${error.message}`);
      }
    }
    
    console.log(`🏁 Ping completed at ${new Date().toISOString()}`);
  },

  async fetch(request) {
    // Get current time
    const now = new Date();
    const myanmarTime = now.toLocaleString('en-US', { timeZone: 'Asia/Yangon' });
    
    // Get last ping status (from environment or just show config)
    const urlsList = this.urlsToPing.map(url => `   • ${url}`).join("\n");
    
    return new Response(
      `🤖 SoeMoePing Status\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `📊 Status: Active\n` +
      `🕐 Current Time (Myanmar): ${myanmarTime}\n` +
      `⏰ Schedule: Every minute (Cron: * * * * *)\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `🔗 URLs being pinged:\n${urlsList}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `📝 Check Cloudflare Logs for ping results\n` +
      `   (Workers Dashboard → Logs tab)`,
      { 
        status: 200,
        headers: { "Content-Type": "text/plain" }
      }
    );
  }
};

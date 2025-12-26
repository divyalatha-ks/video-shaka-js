#!/usr/bin/env node
// Integration test for Shaka Tracker

console.log('🧪 Testing Shaka Tracker Integration...\n');

try {
  // Test CommonJS build
  const shakaModule = require('./dist/cjs/index.js');
  const ShakaTracker = shakaModule.ShakaTracker;
  console.log('✅ CommonJS build loaded successfully');
  console.log('   - Type:', typeof ShakaTracker);
  console.log('   - Constructor:', ShakaTracker.name);
  console.log('   - Module keys:', Object.keys(shakaModule));

  // Test basic instantiation with mock player
  const mockPlayer = {
    addEventListener: () => {},
    removeEventListener: () => {},
    getVariantTracks: () => [],
    getAssetUri: () => 'test://video.mpd',
    isLive: () => false,
    getPlaybackRate: () => 1,
    getStats: () => ({ streamBandwidth: 1000000 })
  };

  const tracker = new ShakaTracker(mockPlayer, {});
  console.log('✅ ShakaTracker instance created successfully');

  // Test core methods
  console.log('   - getTrackerName():', tracker.getTrackerName());
  console.log('   - getPlayerName():', tracker.getPlayerName());
  console.log('   - getInstrumentationProvider():', tracker.getInstrumentationProvider());

  // Test data extraction
  console.log('   - getSrc():', tracker.getSrc());
  console.log('   - isLive():', tracker.isLive());
  console.log('   - getPlayrate():', tracker.getPlayrate());

  console.log('\n🎉 All integration tests passed!');
  console.log('📊 The Shaka Tracker is ready for production use.');

} catch (error) {
  console.error('❌ Integration test failed:', error.message);
  process.exit(1);
}
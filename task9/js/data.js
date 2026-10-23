const regions = ['India', 'Europe', 'North America', 'Asia Pacific'];
const sources = ['Organic', 'Direct', 'Social', 'Referral', 'Email'];
const devices = ['Desktop', 'Mobile', 'Tablet'];

const rnd = (min, max) => Math.random() * (max - min) + min;
const rndInt = (min, max) => Math.floor(rnd(min, max));

function generateData() {
  const data = [];
  
  // Ponytail optimization: Precompute integer timestamps for O(1) mathematical comparisons
  const endTs = new Date('2026-09-28T12:00:00Z').getTime();
  const ONE_DAY = 86400000;

  // Generate 90 days
  for (let i = 89; i >= 0; i--) {
    const currentTs = endTs - (i * ONE_DAY);
    const dateStr = new Date(currentTs).toISOString().split('T')[0];

    // Seasonal factor for realistic looking curves
    const seasonal = Math.sin(i / 14) * 0.2 + 1; 

    regions.forEach(region => {
      sources.forEach(source => {
        devices.forEach(device => {
          
          let regionWeight = region === 'North America' ? 1.5 : (region === 'Europe' ? 1.2 : (region === 'India' ? 1.8 : 0.8));
          let sourceWeight = source === 'Organic' ? 2.0 : (source === 'Direct' ? 1.5 : (source === 'Social' ? 1.2 : 0.8));
          let deviceWeight = device === 'Mobile' ? 1.8 : (device === 'Desktop' ? 1.2 : 0.5);
          
          let baseMultiplier = regionWeight * sourceWeight * deviceWeight * seasonal;
          
          // Core counts
          const sessions = rndInt(50, 250) * baseMultiplier;
          const activeUsers = Math.floor(sessions * rnd(0.5, 0.85));
          
          // View specific metrics
          const engagementRate = rnd(50, 85) + (device === 'Desktop' ? 5 : 0); 
          const conversionRate = rnd(2, 10) + (source === 'Organic' ? 2 : 0);
          
          const newUsers = Math.floor(activeUsers * rnd(0.2, 0.6));
          const bounceRate = rnd(35, 65) - (source === 'Direct' ? 5 : 0);
          const cpa = rnd(10, 45) * (region === 'North America' ? 1.5 : 0.8);
          
          const sessionDuration = rndInt(90, 360) * (device === 'Desktop' ? 1.2 : 1);
          const pagesPerSession = rnd(1.5, 6.0);
          const retentionRate = rnd(15, 45);

          data.push({
            timestamp: currentTs, // Ultra-fast integer for filtering
            date: dateStr,
            region,
            source,
            device,
            overview: {
              sessions,
              activeUsers,
              engagementRate,
              conversionRate
            },
            acquisition: {
              sessions,
              newUsers,
              bounceRate,
              cpa
            },
            engagement: {
              activeUsers,
              sessionDuration,
              pagesPerSession,
              retentionRate
            }
          });
        });
      });
    });
  }
  return data;
}

const lumenData = generateData();

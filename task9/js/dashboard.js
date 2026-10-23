// Configuration and State
const state = {
  view: 'overview',
  dateRange: 30,
  region: 'all',
  sortCol: 'timestamp',
  sortDir: 'desc'
};

const viewConfigs = {
  overview: [
    { key: 'sessions', label: 'Sessions', format: 'number' },
    { key: 'activeUsers', label: 'Active Users', format: 'number' },
    { key: 'engagementRate', label: 'Engagement', format: 'percent' },
    { key: 'conversionRate', label: 'Conversion', format: 'percent' }
  ],
  acquisition: [
    { key: 'sessions', label: 'Sessions', format: 'number' },
    { key: 'newUsers', label: 'New Users', format: 'number' },
    { key: 'bounceRate', label: 'Bounce Rate', format: 'percent' },
    { key: 'cpa', label: 'CPA', format: 'currency' }
  ],
  engagement: [
    { key: 'activeUsers', label: 'Active Users', format: 'number' },
    { key: 'sessionDuration', label: 'Avg Duration', format: 'time' },
    { key: 'pagesPerSession', label: 'Pages/Session', format: 'decimal' },
    { key: 'retentionRate', label: 'Retention', format: 'percent' }
  ]
};

const END_TS = new Date('2026-09-28T12:00:00Z').getTime();
const ONE_DAY = 86400000;

// Cached formatters for maximum performance (avoids instantiating Intl inside loops)
const formatters = {
  number: new Intl.NumberFormat('en-US'),
  date: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
};

const formatValue = (val, format) => {
  if (val === undefined || isNaN(val)) return '-';
  switch (format) {
    case 'number': return formatters.number.format(Math.round(val));
    case 'percent': return val.toFixed(1) + '%';
    case 'currency': return '$' + val.toFixed(2);
    case 'time': return Math.floor(val / 60) + 'm ' + Math.round(val % 60) + 's';
    case 'decimal': return val.toFixed(1);
    case 'date': return formatters.date.format(val);
    default: return val;
  }
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  initUIPreferences();
  attachEventListeners();
  renderDashboard();
});

function initUIPreferences() {
  const density = loadPreference();
  document.body.classList.toggle('compact', density === 'compact');
  document.getElementById('densityToggle').value = density;
}

function attachEventListeners() {
  // Event Delegation for Navigation
  document.getElementById('navMenu').addEventListener('click', (e) => {
    const btn = e.target.closest('.nav-item');
    if (!btn) return;
    
    document.querySelectorAll('.nav-item').forEach(b => {
      b.classList.remove('active');
      b.removeAttribute('aria-current');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-current', 'page');
    
    state.view = btn.dataset.view;
    document.getElementById('viewTitle').textContent = btn.textContent;
    state.sortCol = 'timestamp';
    state.sortDir = 'desc';
    renderDashboard();
  });

  // Filters
  document.getElementById('dateFilter').addEventListener('change', (e) => {
    state.dateRange = parseInt(e.target.value, 10);
    renderDashboard();
  });

  document.getElementById('regionFilter').addEventListener('change', (e) => {
    state.region = e.target.value;
    renderDashboard();
  });

  // Density
  document.getElementById('densityToggle').addEventListener('change', (e) => {
    const density = e.target.value;
    savePreference(density);
    document.body.classList.toggle('compact', density === 'compact');
  });

  // Event Delegation for Table Sorting
  document.getElementById('tableHead').addEventListener('click', (e) => {
    const th = e.target.closest('th');
    if (!th || !th.dataset.col) return;
    
    const col = th.dataset.col;
    if (state.sortCol === col) {
      state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      state.sortCol = col;
      state.sortDir = 'desc';
    }
    renderDashboard();
  });
}

// Data Processing - O(N) Single-Pass Architecture
function processDashboardData() {
  const currentStartTs = END_TS - ((state.dateRange - 1) * ONE_DAY);
  const prevStartTs = currentStartTs - (state.dateRange * ONE_DAY);
  
  const metrics = viewConfigs[state.view];
  
  // Use Object.create(null) for dictionary objects without prototype chain overhead
  const byDate = Object.create(null);
  const bySource = Object.create(null);
  const curTotals = Object.create(null);
  const prevTotals = Object.create(null);
  
  for (let j = 0; j < metrics.length; j++) {
    curTotals[metrics[j].key] = 0;
    prevTotals[metrics[j].key] = 0;
  }
  
  let curCount = 0, prevCount = 0;
  
  // SINGLE PASS LOOP
  for (let i = 0, len = lumenData.length; i < len; i++) {
    const row = lumenData[i];
    
    if (state.region !== 'all' && row.region !== state.region) continue;
    
    const ts = row.timestamp;
    
    // Current Period Bucket
    if (ts >= currentStartTs && ts <= END_TS) {
      curCount++;
      const dKey = row.timestamp; // use timestamp directly as faster key
      const sKey = row.source;
      const viewData = row[state.view];
      
      if (!byDate[dKey]) byDate[dKey] = { timestamp: ts, count: 0 };
      if (!bySource[sKey]) bySource[sKey] = { source: sKey, count: 0 };
      
      byDate[dKey].count++;
      bySource[sKey].count++;
      
      for (let j = 0; j < metrics.length; j++) {
        const mk = metrics[j].key;
        const val = viewData[mk];
        byDate[dKey][mk] = (byDate[dKey][mk] || 0) + val;
        bySource[sKey][mk] = (bySource[sKey][mk] || 0) + val;
        curTotals[mk] += val;
      }
    } 
    // Previous Period Bucket
    else if (ts >= prevStartTs && ts < currentStartTs) {
      prevCount++;
      const viewData = row[state.view];
      for (let j = 0; j < metrics.length; j++) {
        prevTotals[metrics[j].key] += viewData[metrics[j].key];
      }
    }
  }

  // Averages for non-cumulative metrics
  const normalize = (obj, itemCnt) => {
    if (!itemCnt) return;
    for (let j = 0; j < metrics.length; j++) {
      const m = metrics[j];
      if (m.format !== 'number') {
        obj[m.key] /= itemCnt;
      }
    }
  };

  const datesArr = Object.values(byDate);
  const sourcesArr = Object.values(bySource);
  
  for (let i = 0; i < datesArr.length; i++) normalize(datesArr[i], datesArr[i].count);
  for (let i = 0; i < sourcesArr.length; i++) normalize(sourcesArr[i], sourcesArr[i].count);
  
  normalize(curTotals, curCount);
  normalize(prevTotals, prevCount);

  return { dates: datesArr, sources: sourcesArr, curTotals, prevTotals };
}

// Rendering
function renderDashboard() {
  const data = processDashboardData();
  const metrics = viewConfigs[state.view];

  if (data.dates.length === 0) {
    renderEmptyState();
    return;
  }

  renderKPIs(metrics, data.curTotals, data.prevTotals);
  renderTrendChart(metrics[0], data.dates);
  renderSourceChart(metrics[0], data.sources);
  renderTable(metrics, data.dates);
}

function renderEmptyState() {
  const emptyHtml = `<div class="empty-state">No data available for the selected filters.</div>`;
  document.getElementById('kpiContainer').innerHTML = emptyHtml;
  document.getElementById('trendChartContainer').innerHTML = emptyHtml;
  document.getElementById('sourceChartContainer').innerHTML = emptyHtml;
  document.getElementById('tableBody').innerHTML = `<tr><td colspan="10" style="text-align: center;">No data found</td></tr>`;
}

function renderKPIs(metrics, currentTotals, prevTotals) {
  const html = metrics.map(m => {
    const curVal = currentTotals[m.key];
    const prevVal = prevTotals[m.key];
    
    let changePct = 0;
    if (prevVal && prevVal > 0) {
      changePct = ((curVal - prevVal) / prevVal) * 100;
    }
    
    let changeClass = 'neutral';
    let changeText = '0.0%';
    let changeSign = '';
    
    if (changePct > 0.1) {
      changeClass = ['bounceRate', 'cpa'].includes(m.key) ? 'negative' : 'positive';
      changeSign = '+';
      changeText = changePct.toFixed(1) + '%';
    } else if (changePct < -0.1) {
      changeClass = ['bounceRate', 'cpa'].includes(m.key) ? 'positive' : 'negative';
      changeText = changePct.toFixed(1) + '%';
    }

    return `
      <div class="kpi-card">
        <div class="kpi-label">${m.label}</div>
        <div class="kpi-value">${formatValue(curVal, m.format)}</div>
        <div class="kpi-context ${changeClass}">
          ${changeSign}${changeText} vs previous
        </div>
      </div>
    `;
  }).join('');
  
  document.getElementById('kpiContainer').innerHTML = html;
}

function renderTrendChart(primaryMetric, datesData) {
  document.getElementById('trendChartTitle').textContent = `${primaryMetric.label} Trend`;
  
  datesData.sort((a, b) => a.timestamp - b.timestamp);
  
  const width = 800, height = 240;
  const padding = { top: 20, right: 20, bottom: 30, left: 60 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  
  const maxVal = Math.max(...datesData.map(d => d[primaryMetric.key])) * 1.1 || 1;
  const dataLen = datesData.length;
  
  const points = datesData.map((d, i) => {
    const x = padding.left + (i / (dataLen - 1 || 1)) * innerWidth;
    const y = padding.top + innerHeight - (d[primaryMetric.key] / maxVal) * innerHeight;
    return `${x},${y}`;
  });

  const areaPoints = `${padding.left},${height - padding.bottom} ${points.join(' ')} ${padding.left + innerWidth},${height - padding.bottom}`;

  const yLabels = 4;
  let yAxisGroup = '';
  for(let i = 0; i <= yLabels; i++) {
    const yVal = maxVal * (i / yLabels);
    const yPos = padding.top + innerHeight - (i / yLabels) * innerHeight;
    yAxisGroup += `
      <line x1="${padding.left}" y1="${yPos}" x2="${width - padding.right}" y2="${yPos}" class="chart-axis-line" stroke-dasharray="4 4" opacity="0.4" />
      <text x="${padding.left - 10}" y="${yPos + 4}" text-anchor="end" class="chart-axis-label">${formatValue(yVal, 'number')}</text>
    `;
  }
  
  let xAxisGroup = '';
  if (dataLen > 1) {
    const xLabelsData = [
      { idx: 0, anchor: 'start' },
      { idx: Math.floor(dataLen / 2), anchor: 'middle' },
      { idx: dataLen - 1, anchor: 'end' }
    ];
    xAxisGroup = xLabelsData.map(lbl => {
      const d = datesData[lbl.idx];
      const xPos = padding.left + (lbl.idx / (dataLen - 1)) * innerWidth;
      return `<text x="${xPos}" y="${height - 5}" text-anchor="${lbl.anchor}" class="chart-axis-label">${formatValue(d.timestamp, 'date')}</text>`;
    }).join('');
  }

  document.getElementById('trendChartContainer').innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">
      ${yAxisGroup}
      ${xAxisGroup}
      <polyline points="${areaPoints}" class="chart-area" />
      <polyline points="${points.join(' ')}" class="chart-line" />
    </svg>
  `;
}

function renderSourceChart(primaryMetric, sourcesData) {
  document.getElementById('sourceChartTitle').textContent = `${primaryMetric.label} by Source`;

  sourcesData.sort((a, b) => b[primaryMetric.key] - a[primaryMetric.key]);
  
  const width = 400, height = 240;
  const padding = { top: 20, right: 40, bottom: 20, left: 80 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  
  const maxVal = Math.max(...sourcesData.map(d => d[primaryMetric.key])) * 1.1 || 1;
  const barHeight = Math.min(24, (innerHeight / sourcesData.length) - 8);

  const barsGroup = sourcesData.map((d, i) => {
    const yPos = padding.top + (i * (innerHeight / sourcesData.length)) + (innerHeight / sourcesData.length / 2) - (barHeight / 2);
    const barWidth = (d[primaryMetric.key] / maxVal) * innerWidth;
    return `
      <text x="${padding.left - 10}" y="${yPos + barHeight / 2 + 4}" text-anchor="end" class="chart-axis-label">${d.source}</text>
      <rect x="${padding.left}" y="${yPos}" width="${barWidth}" height="${barHeight}" rx="2" class="chart-bar" />
      <text x="${padding.left + barWidth + 8}" y="${yPos + barHeight / 2 + 4}" class="chart-axis-label">${formatValue(d[primaryMetric.key], 'number')}</text>
    `;
  }).join('');

  document.getElementById('sourceChartContainer').innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">
      ${barsGroup}
    </svg>
  `;
}

function getSortIndicator(col) {
  if (state.sortCol !== col) return '<span class="sort-indicator">&#8597;</span>';
  return state.sortDir === 'asc' 
    ? '<span class="sort-indicator" style="color:var(--accent-primary)">&#8593;</span>' 
    : '<span class="sort-indicator" style="color:var(--accent-primary)">&#8595;</span>';
}

function renderTable(metrics, datesData) {
  // Render Headers
  let headersHtml = `<th data-col="timestamp">Date ${getSortIndicator('timestamp')}</th>`;
  headersHtml += metrics.map(m => `<th data-col="${m.key}">${m.label} ${getSortIndicator(m.key)}</th>`).join('');
  document.getElementById('tableHead').innerHTML = `<tr>${headersHtml}</tr>`;

  // Sort Data mathematically via precomputed integer
  datesData.sort((a, b) => {
    const valA = a[state.sortCol];
    const valB = b[state.sortCol];
    if (valA < valB) return state.sortDir === 'asc' ? -1 : 1;
    if (valA > valB) return state.sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  // Render Rows utilizing rapid map->join instead of looped DOM appendChild 
  document.getElementById('tableBody').innerHTML = datesData.map(d => {
    const cells = metrics.map(m => `<td>${formatValue(d[m.key], m.format)}</td>`).join('');
    return `<tr><td><strong>${formatValue(d.timestamp, 'date')}</strong></td>${cells}</tr>`;
  }).join('');
}

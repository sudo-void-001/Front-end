const DENSITY_KEY = 'lumenDensity';

function savePreference(density) {
  localStorage.setItem(DENSITY_KEY, density);
}

function loadPreference() {
  return localStorage.getItem(DENSITY_KEY) || 'comfortable';
}

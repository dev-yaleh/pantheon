export const PLAYTIME_RANGES = [
  { id: '', label: 'Qualquer duração' },
  { id: 'short', label: 'Curto (até 5h)', test: (h) => h > 0 && h <= 5 },
  { id: 'medium', label: 'Médio (5–20h)', test: (h) => h > 5 && h <= 20 },
  { id: 'long', label: 'Longo (20h+)', test: (h) => h > 20 },
]
export const matchesPlaytime = (hours, id) => !id || PLAYTIME_RANGES.find((r) => r.id === id).test(hours)
export const formatPlaytime = (h) => (h ? `~${h}h` : 'Tempo n/d')

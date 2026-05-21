import { ref, computed, watch, onBeforeUnmount } from 'vue'

const ITEM_LIFESPAN     = { jacket:72, shirt:30, pants:48, dress:42, shoes:48, sweater:60 }
const MATERIAL_MODIFIER = { wool:1.40, leather:1.50, denim:1.20, linen:1.10, cotton:1.00, polyester:0.85, silk:0.70 }
const MATERIAL_ENV      = { wool:72, linen:78, cotton:62, denim:55, leather:48, polyester:28, silk:55 }
const QUALITY_MOD       = { fast:0.75, mid:1.0, premium:1.25, luxury:1.40 }
const ITEM_ICONS        = { jacket:'🧥', shirt:'👕', pants:'👖', dress:'👗', shoes:'👟', sweater:'🧣' }

export const ANALYZING_MSGS = [
  'Checking fabric durability…',
  'Calculating cost per wear…',
  'Reading material data…',
  'Estimating lifespan…',
]

export function useLifetimeValueAnalyzer() {
  // ── Inputs ──────────────────────────────────────────────────────────────
  const itemType      = ref('')
  const material      = ref('')
  const price         = ref(null)
  const quality       = ref('mid')
  const wearsPerMonth = ref(4)
  const washFrequency = ref(3)
  const tumbleDry     = ref(false)
  const properStorage = ref(true)

  // ── UI state ─────────────────────────────────────────────────────────────
  const hasAnalyzed      = ref(false)
  const recentlySelected = ref(null)
  const btnReady         = ref(false)
  const isAnalyzing      = ref(false)
  const animatedScore    = ref(0)
  const currentTipIndex  = ref(0)
  const analyzingMsgIdx  = ref(0)
  const ringPulsed       = ref(false)
  let tipTimer           = null
  let analyzingMsgTimer  = null

  // ── Validation ───────────────────────────────────────────────────────────
  const isPriceValid = computed(() => price.value !== null && price.value > 0)
  const canAnalyze   = computed(() => isPriceValid.value)

  // ── Core calculation ─────────────────────────────────────────────────────
  const calc = computed(() => {
    if (!isPriceValid.value) return {
      lifespan:0, totalWears:0, costPerWear:0, breakEvenWears:0,
      overallScore:0, cpwScore:0, longevityScore:0, envScore:50, usageScore:0,
    }
    const p       = price.value
    const matMod  = MATERIAL_MODIFIER[material.value] || 1.0
    const qualMod = QUALITY_MOD[quality.value] || 1.0
    const base    = ITEM_LIFESPAN[itemType.value] || 36

    let lm = base * matMod * qualMod
    lm *= Math.pow(0.96, washFrequency.value)
    if (tumbleDry.value)      lm *= 0.80
    if (!properStorage.value) lm *= 0.88
    lm *= Math.max(0.7, 1 - (wearsPerMonth.value - 4) * 0.005)

    const lifespan      = Math.max(0.5, lm / 12)
    const totalWears    = Math.round(wearsPerMonth.value * 12 * lifespan)
    const costPerWear   = p / Math.max(1, totalWears)
    const breakEvenWears = Math.ceil(p / 2.5)

    let cpwScore
    if      (costPerWear < 0.25) cpwScore = 100
    else if (costPerWear < 0.50) cpwScore = 90
    else if (costPerWear < 1.00) cpwScore = 70
    else if (costPerWear < 2.00) cpwScore = 45
    else if (costPerWear < 3.50) cpwScore = 25
    else                         cpwScore = 10

    const longevityScore = Math.min(100, Math.max(5, (lifespan / 5) * 100))

    let envScore = MATERIAL_ENV[material.value] || 50
    envScore -= washFrequency.value * 1.5
    if (tumbleDry.value)          envScore -= 12
    if (quality.value === 'fast') envScore -= 15
    if (quality.value === 'premium') envScore += 8
    envScore = Math.max(5, Math.min(100, envScore))

    const usageScore   = Math.min(100, (wearsPerMonth.value / 20) * 100)
    const overallScore = Math.min(100, Math.max(0,
      cpwScore * 0.35 + longevityScore * 0.30 + envScore * 0.20 + usageScore * 0.15
    ))

    return { lifespan, totalWears, costPerWear, breakEvenWears, overallScore, cpwScore, longevityScore, envScore, usageScore }
  })

  // ── Derived display values ───────────────────────────────────────────────
  const displayScore = computed(() => hasAnalyzed.value ? animatedScore.value : 0)

  const itemTypeIcon = computed(() => ITEM_ICONS[itemType.value] || '')

  const valueLabel = computed(() => {
    const s = calc.value.overallScore
    if (s >= 80) return 'Excellent Value'
    if (s >= 65) return 'Good Value'
    if (s >= 50) return 'Fair Value'
    if (s >= 35) return 'Poor Value'
    return 'Very Poor Value'
  })

  const scoreDescription = computed(() => {
    const s = calc.value.overallScore
    if (s >= 80) return 'Outstanding investment with excellent long-term return.'
    if (s >= 65) return 'Solid choice. Good value potential over its lifetime.'
    if (s >= 50) return "You're getting decent value from this item."
    if (s >= 35) return 'Borderline. Review your care and usage habits to improve.'
    return 'This item may not justify its cost at current usage levels.'
  })

  const badgeStyle = computed(() => {
    const s = calc.value.overallScore
    if (s >= 65) return { background:'#e8f5e9', color:'#1c4a1c', border:'1px solid #a5d6a7' }
    if (s >= 50) return { background:'#fff8e1', color:'#e65100', border:'1px solid #ffe082' }
    return              { background:'#fce4ec', color:'#b71c1c', border:'1px solid #f48fb1' }
  })

  const heroSubline = computed(() => {
    if (!hasAnalyzed.value) return "Here's your item's full lifetime value report."
    const s = calc.value.overallScore
    if (s >= 80) return `Outstanding investment. $${calc.value.costPerWear.toFixed(2)}/wear across ${calc.value.lifespan.toFixed(1)} years.`
    if (s >= 65) return `Good value. Break-even in ${Math.ceil(calc.value.breakEvenWears / wearsPerMonth.value)} months at current wear rate.`
    if (s >= 50) return 'Decent value with room to improve. A few habit changes could add months of life.'
    return 'Worth a closer look. Wearing more often would change these numbers significantly.'
  })

  const usageLabel = computed(() => {
    if (wearsPerMonth.value <= 2)  return 'Occasional use, low value'
    if (wearsPerMonth.value <= 6)  return 'Regular use, moderate value'
    if (wearsPerMonth.value <= 15) return 'Frequent use, good value'
    return 'Heavy use, maximizing value'
  })

  const washLabel = computed(() => {
    if (washFrequency.value === 0) return 'Not washed yet (not recommended)'
    if (washFrequency.value <= 2)  return 'Minimal washing, extends lifespan'
    if (washFrequency.value <= 6)  return 'Moderate washing, acceptable'
    if (washFrequency.value <= 12) return 'Frequent washing, reduces lifespan'
    return 'Very frequent washing, significant lifespan reduction'
  })

  const valueRecoveredPct = computed(() =>
    Math.min(100, Math.round((calc.value.totalWears / Math.max(1, calc.value.breakEvenWears)) * 100))
  )

  const scoreBreakdown = computed(() => [
    { label:'Cost Efficiency',      score:calc.value.cpwScore,      color:'#1c4a1c' },
    { label:'Longevity',            score:calc.value.longevityScore, color:'#2d7a2d' },
    { label:'Care & Maintenance',   score:calc.value.usageScore,     color:'#5a8c2a' },
    { label:'Environmental Impact', score:calc.value.envScore,       color:'#7aad3a' },
  ])

  const resultMetrics = computed(() => [
    { label:'Estimated Lifespan', value:`${calc.value.lifespan.toFixed(1)} yrs`, icon:'⏳' },
    { label:'Cost / Wear',        value:`$${calc.value.costPerWear.toFixed(2)}`,  icon:'💵' },
    { label:'Total Wears',        value:calc.value.totalWears,                    icon:'👕' },
    { label:'Break-even Point',   value:`${calc.value.breakEvenWears} wears`,     icon:'📈' },
    { label:'Environmental Score',value:`${Math.round(calc.value.envScore)}/100`, icon:'🌿' },
    { label:'Value Rating',       value:valueLabel.value,                         icon:'⭐' },
  ])

  const recommendationTips = computed(() => {
    const tips = []
    if (tumbleDry.value)
      tips.push(`Air dry instead of tumble dry to extend lifespan by up to ${Math.round(calc.value.lifespan * 12 * 0.2)} months.`)
    if (washFrequency.value > 5)
      tips.push(`Wash less often — try every 2–3 wears. Halving wash frequency could add ${Math.round(washFrequency.value * 0.4)} months of life.`)
    if (wearsPerMonth.value < 5)
      tips.push(`Wearing this item ${5 - wearsPerMonth.value}x more each month would cut cost-per-wear by nearly half.`)
    if (!properStorage.value)
      tips.push('Proper storage on a hanger or folded flat can extend lifespan by up to 12%.')
    if (quality.value === 'fast')
      tips.push('Mid-range or premium quality typically lasts 1.5x longer than fast fashion at a modest price difference.')
    if (tips.length === 0)
      tips.push(`Great care habits! Keep wearing regularly — at ${wearsPerMonth.value}x/month you'll break even in ${Math.ceil(calc.value.breakEvenWears / wearsPerMonth.value)} months.`)
    return tips
  })

  // ── Watchers ─────────────────────────────────────────────────────────────
  watch(() => calc.value.overallScore, v => { if (hasAnalyzed.value) animatedScore.value = v })

  watch(canAnalyze, (val, prev) => {
    if (val && !prev) {
      btnReady.value = true
      setTimeout(() => { btnReady.value = false }, 700)
    }
  })

  // ── Actions ───────────────────────────────────────────────────────────────
  function flash(field) {
    recentlySelected.value = field
    setTimeout(() => { recentlySelected.value = null }, 550)
  }

  function startTipCycle() {
    clearInterval(tipTimer)
    currentTipIndex.value = 0
    tipTimer = setInterval(() => {
      currentTipIndex.value = (currentTipIndex.value + 1) % recommendationTips.value.length
    }, 4000)
  }

  function animateScore() {
    const target = calc.value.overallScore
    animatedScore.value = 0
    const inc = target / (1200 / 16)
    let cur = 0
    const t = setInterval(() => {
      cur += inc
      if (cur >= target) { animatedScore.value = target; clearInterval(t) }
      else animatedScore.value = cur
    }, 16)
  }

  function handleAnalyze() {
    if (!canAnalyze.value) return
    isAnalyzing.value = true
    analyzingMsgIdx.value = 0
    analyzingMsgTimer = setInterval(() => {
      analyzingMsgIdx.value = (analyzingMsgIdx.value + 1) % ANALYZING_MSGS.length
    }, 400)
    setTimeout(() => {
      clearInterval(analyzingMsgTimer)
      isAnalyzing.value = false
      hasAnalyzed.value = true
      animateScore()
      startTipCycle()
      if (calc.value.overallScore >= 65) setTimeout(() => { ringPulsed.value = true }, 1250)
    }, 1400)
  }

  function resetAll() {
    clearInterval(tipTimer)
    clearInterval(analyzingMsgTimer)
    hasAnalyzed.value = false; isAnalyzing.value = false
    animatedScore.value = 0; currentTipIndex.value = 0; ringPulsed.value = false
    itemType.value = ''; material.value = ''; price.value = null; quality.value = 'mid'
    wearsPerMonth.value = 4; washFrequency.value = 3; tumbleDry.value = false; properStorage.value = true
  }

  onBeforeUnmount(() => { clearInterval(tipTimer); clearInterval(analyzingMsgTimer) })

  return {
    // Inputs
    itemType, material, price, quality, wearsPerMonth, washFrequency, tumbleDry, properStorage,
    // UI state
    hasAnalyzed, recentlySelected, btnReady, isAnalyzing, animatedScore,
    currentTipIndex, analyzingMsgIdx, ringPulsed,
    // Computed
    isPriceValid, canAnalyze, calc, displayScore, itemTypeIcon, valueLabel,
    scoreDescription, badgeStyle, heroSubline, usageLabel, washLabel,
    valueRecoveredPct, scoreBreakdown, resultMetrics, recommendationTips,
    // Actions
    flash, handleAnalyze, resetAll,
  }
}

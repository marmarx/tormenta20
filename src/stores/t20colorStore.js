import { ref, computed, watchEffect } from 'vue'

const hexToRgba = (hex, alpha = 0.3) => {
  let r = parseInt(hex.slice(1, 3), 16)
  let g = parseInt(hex.slice(3, 5), 16)
  let b = parseInt(hex.slice(5, 7), 16)
  console.log('hexToRgba', `rgba(${r}, ${g}, ${b}, ${alpha})`)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const t20color = ref('#b72a2b')
const t20trans = computed(() => hexToRgba(t20color.value))

watchEffect(() => {
  document.documentElement.style.setProperty('--t20-color', t20color.value)
  document.documentElement.style.setProperty('--t20-trans', t20trans.value)
})

const t20border = computed(() => {
  const rawsvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="922pt" height="852pt" fill="${t20color.value}" viewBox="0 0 922 852">
      <g transform="translate(0,852) scale(.1,-.1)">
        <path fill="${t20color.value}" d="M140 7107 l0 -1412 35 -52 ..."/>
      </g>
    </svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(rawsvg)}") 4% repeat`
})

export { t20border, t20color }

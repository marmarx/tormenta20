import {computed,ref} from 'vue'

const t20color = ref('#b72a2b');
const t20border = computed(() => {
  document.querySelector(':root').style.setProperty('--t20-color',t20color.value);
  const rawsvg = 
    `<svg xmlns="http://www.w3.org/2000/svg" width="922pt" height="852pt" fill="${t20color.value}" viewBox="0 0 922 852">
      <g transform="translate(0,852) scale(.1,-.1)">
        <path fill="${t20color.value}" d="M140 7107 l0 -1412 35 -52 c19 -29 35 -57 35 -64 0 -6 -16 -29 -35 -52 l-35 -41 0 -883 0 -884 -50 -53 -51 -54 51 -42 50 -42 0 -461 0 -461 27 -28 27 -28 -37 -38 -37 -38 0 -188 0 -188 35 -59 c19 -33 35 -64 35 -69 0 -5 -16 -36 -35 -69 l-35 -59 0 -284 -1 -283 -38 -45 -39 -45 44 -47 44 -47 0 -474 0 -473 -36 -35 c-20 -18 -45 -46 -56 -61 l-19 -28 4550 0 c2503 0 4551 4 4551 8 0 5 -20 35 -45 66 l-45 58 0 823 0 823 55 41 c30 23 55 43 55 45 0 2 -25 20 -55 40 -54 35 -55 37 -55 84 l0 48 80 39 c44 21 80 44 80 50 0 5 -34 32 -75 59 l-75 48 0 119 0 118 -30 23 c-35 26 -37 38 -10 63 20 18 20 31 20 781 l0 762 52 45 53 45 -53 56 -52 55 0 585 0 586 -90 76 c-71 61 -88 80 -80 93 5 9 45 52 89 96 l81 80 0 1342 0 1343 -4440 0 -4440 0 0 -1413z"/>
      </g>
    </svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(rawsvg)}") 4% repeat`
})

export {t20border,t20color}
<script setup>
import {useSpellStore} from '@/stores/archive/old_spellsStore'
const fetchSpells = async () => {
  spellList.value = await useSpellStore(props.all,props.list)
}
onMounted(fetchSpells); //Fetch spells when component is mounted
//Watch for changes in `list` and refetch; 'deep:true' is used to detect changes to an object's property, an array's elements, or nested structures (like objects inside arrays)
watch(() => props.list,fetchSpells,{deep:true});
</script>
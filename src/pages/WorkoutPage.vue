<template>
  <q-page>
    <div class="q-pa-md row items-start q-gutter-md">
       <workout-card
        title="Cardio"
        description="Cardiovascular exercises"
        :exercises="[{id:1,  name: 'Running'}, {id: 2, name:'Cycling'}, {id: 3, name: 'Swimming'}]"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import WorkoutCard from 'components/WorkoutCard.vue'

export default defineComponent({
  name: 'WorkoutPage',
  components: { WorkoutCard },

  setup () {
    return {
      expanded: ref(false)
    }
  }
})
</script>

<style scoped>

</style>

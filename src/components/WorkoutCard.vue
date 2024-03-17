<template>
  <q-card class="my-card" flat bordered>
    <q-img
      :src="image"
    />

    <q-card-section>
      <div class="text-h5 q-mt-sm q-mb-xs">{{ title }}</div>
      <div class="text-caption text-grey">
        {{ description }}
    </div>
  </q-card-section>

  <q-card-actions>
    <q-btn flat color="primary" label="Share" />
    <q-btn flat color="secondary" label="Book" />

    <q-space />

    <q-btn
      color="grey"
      round
      flat
      dense
      :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
      @click="expanded = !expanded"
    />
  </q-card-actions>

  <q-slide-transition>
    <div v-show="expanded">
      <q-separator />
      <q-card-section>
        <q-list v-for="exercise in exercises" :key="exercise.id">
          <q-item>
            <q-item-section>
              <q-item-label>{{ exercise?.name }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator spaced inset />
        </q-list>
      </q-card-section>
    </div>
  </q-slide-transition>
</q-card>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'WorkoutCard',

  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: 'https://cdn.quasar.dev/img/parallax2.jpg'
    },
    exercises: {
      type: Array,
      default: () => []
    }
  },

  setup () {
    const expanded = ref(false)

    return {
      expanded
    }
  }
})
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 350px;
}
</style>

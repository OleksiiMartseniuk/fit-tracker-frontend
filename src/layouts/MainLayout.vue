<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          FitTracker
        </q-toolbar-title>

        <div class="q-pa-md q-gutter-sm">
          <q-avatar color="orange" text-color="white">
            {{ userData?.username[0].toUpperCase() }}
            <q-menu fit>
              <q-list style="min-width: 100px">
                <q-item>
                  <q-item-section>{{ userData?.username }}</q-item-section>
                </q-item>
                <q-separator />
                <q-item :to="{name: 'user-settings'}" clickable>
                  <q-item-section>Settings</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section @click="logout">Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-avatar>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import EssentialLink from 'components/EssentialLink.vue'
import { useRouter } from 'vue-router'

const linksList = [
  {
    title: 'Home',
    caption: 'home',
    icon: 'home',
    link: 'home'
  },
  {
    title: 'Workout',
    caption: 'workout',
    icon: 'fitness_center',
    link: 'workout'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const $q = useQuasar()
    const router = useRouter()
    const leftDrawerOpen = ref(false)
    const userData = $q.cookies.get('userData')

    const logout = () => {
      $q.loading.show()
      api.get('account/logout')
        .then(() => {
          $q.cookies.remove('token')
          $q.cookies.remove('userData')
          $q.loading.hide()
          if (router.currentRoute.value.name !== 'login') {
            router.push({ name: 'login' })
          }
        })
        .catch((response) => {
          $q.loading.hide()
          $q.notify({
            color: 'negative',
            position: 'top',
            message: response.response.data?.detail,
            icon: 'report_problem'
          })
        })
    }

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      userData,
      logout,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>

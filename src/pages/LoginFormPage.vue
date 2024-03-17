<template>
  <q-page class="flex flex-center">
    <q-form @submit.prevent="login" style="max-width: 400px; width: 100%;">
      <q-card class="flex-block">
        <q-card-section>
          <div class="text-h6 text-center">Login in</div>
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="username"
            label="Username"
            type="text"
            class="q-mb-md"
            dense
            :rules="[requiredValidator]"
          />

          <q-input
            v-model="password"
            label="Password"
            type="password"
            dense
            :rules="[requiredValidator]"
          />

          <div class="flex flex-center q-mt-md">
            <q-btn
              type="submit"
              color="primary"
              label="Submit"
              class="q-mt-md"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
import { ref, defineComponent } from 'vue'
import { requiredValidator } from 'src/utils/validators'
import { api } from 'boot/axios'
import { useQuasar, Cookies } from 'quasar'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoginFormPage',
  methods: { requiredValidator },

  setup () {
    const $q = useQuasar()
    const router = useRouter()
    const username = ref('')
    const password = ref('')

    const login = () => {
      $q.loading.show()
      api.post('account/login', {
        username: username.value,
        password: password.value
      })
        .then((response) => {
          api.defaults.headers.common.Authorization = 'Bearer ' + response.data.access_token
          Cookies.set('token', response.data.access_token)
          setUserData()
          setTimeout(() => {
            $q.loading.hide()
            router.replace('/')
          }, 2000)
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

    const setUserData = () => {
      api.get('account/user')
        .then((response) => {
          Cookies.set('userData', response.data)
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
      username,
      password,
      login
    }
  }
})
</script>

<style scoped>
</style>

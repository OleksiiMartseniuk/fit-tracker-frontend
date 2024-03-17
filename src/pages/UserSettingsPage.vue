<template>
  <q-page>
    <div class="q-pa-md items-start q-gutter-md">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">User Settings</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form>
            <div class="row">
              <div class="col-3 q-my-md q-mx-md">
                <q-input
                  v-model="username"
                  label="Username"
                  type="text"
                  :rules="[requiredValidator]"
                  dense
                />
                <q-input
                  v-model="email"
                  label="Email"
                  type="text"
                  :rules="[requiredValidator]"
                  dense
                />
              </div>
              <div class="col-3 q-my-md q-mx-md">
                <q-input
                  v-model="firstName"
                  label="First Name"
                  type="text"
                  :rules="[requiredValidator]"
                  dense
                />
              </div>
              <div class="col-3 q-my-md q-mx-md">
                <q-input
                  v-model="lastName"
                  label="Last Name"
                  type="text"
                  :rules="[requiredValidator]"
                  dense
                />
              </div>
            </div>

            <div class="q-my-md q-mx-md">
              <q-btn
                type="submit"
                color="primary"
                label="Update"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { requiredValidator } from 'src/utils/validators'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

export default defineComponent({
  name: 'UserSettingsPage',
  methods: { requiredValidator },

  setup () {
    const $q = useQuasar()

    const username = ref('')
    const firstName = ref('')
    const lastName = ref('')
    const email = ref('')

    onMounted(() => {
      getUserData()
    })

    const getUserData = async () => {
      $q.loading.show()
      const response = await api.get('account/user')
      if (response.status !== 200) {
        $q.notify({
          type: 'negative',
          message: 'Error fetching user data'
        })
        $q.loading.hide()
        return
      }

      username.value = response.data.username
      firstName.value = response.data.first_name
      lastName.value = response.data.last_name
      email.value = response.data.email

      $q.loading.hide()
    }
    return {
      username,
      firstName,
      lastName,
      email
    }
  }
})
</script>

<style scoped>

</style>

<script>
export default {
  layout: 'empty',
  middleware: [
    ({ store, redirect }) => {
      if (store.getters['user/access_token'] && store.getters['user/user']) {
        return redirect('/');
      }
    }
  ],
  data() {
    return {
      loginRules: [
        v => !!v || 'Введите логин'
      ],
      passwordRules: [
        v => !!v || 'Ввудите пароль'
      ],
      authData: {
        login: '',
        password: ''
      },
      validForm: true,
      snackbar: {
        visible: false,
        text: '',
        color: 'info'
      }
    };
  },
  methods: {
    async login() {
      const { error, info } = await this.$store.dispatch('user/authUser', this.authData);

      if (error) {
        this.snackbar.text = error;
        this.snackbar.color = 'error';
        this.snackbar.visible = true;
        return;
      }

      if (info) {
        this.snackbar.text = info;
        this.snackbar.color = 'info';
        this.snackbar.visible = true;
        return;
      }

      this.$router.replace('/');
    }
  }
};
</script>

<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-col
      cols="12"
      sm="6"
      md="6"
    >
      <v-card class="elevation-12">
        <v-toolbar
          color="primary"
          dark
          flat
        >
          <v-toolbar-title>Авторизация</v-toolbar-title>
          <v-spacer />
          <nuxt-link :style="{color: 'white'}" to="/register">
            Регистрация
          </nuxt-link>
        </v-toolbar>
        <v-card-text>
          <v-form
            v-model="validForm"
          >
            <v-text-field
              v-model="authData.login"
              label="Логин"
              name="login"
              prepend-icon="mdi-account"
              type="text"
              :rules="loginRules"
            />

            <v-text-field
              id="password"
              v-model="authData.password"
              label="Пароль"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              :rules="passwordRules"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn :disabled="!validForm" color="primary" @click="login">
            Войти
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>

    <v-snackbar
      v-model="snackbar.visible"
      top
      :color="snackbar.color"
    >
      {{ snackbar.text }}
    </v-snackbar>
  </v-row>
</template>

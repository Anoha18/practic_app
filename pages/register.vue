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
      user: {
        name: '',
        lastname: '',
        login: '',
        password: ''
      },
      nameRules: [
        v => !!v || 'Укажите свое имя'
      ],
      loginRules: [
        v => !!v || 'Введите логин'
      ],
      passwordRules: [
        v => !!v || 'Введите пароль'
      ],
      confirmedPasswordRules: [
        v => v === this.user.password || 'Пароли не совпадают'
      ],
      validForm: false,
      confirmedPassword: '',
      loading: false,
      isLogin: false,
      checkLoginTimeout: null
    };
  },
  watch: {
    'user.login'(val) {
      return this.checkLogin();
    }
  },
  methods: {
    async checkLogin() {
      const { login } = this.user;
      if (!login) {
        this.isLogin = false;
        // if (this.loginRules.length > 1) { this.loginRules.slice(-1); }
        return;
      }

      if (this.checkLoginTimeout) {
        clearTimeout(this.checkLoginTimeout);
        this.checkLoginTimeout = null;
      }

      await this.$nextTick();
      const vm = this;
      this.checkLoginTimeout = setTimeout(async() => {
        let response;
        try {
          response = await this.$axios.$get('/api/auth/check_login', {
            params: {
              login
            }
          });
        } catch (error) {
          console.error(error);
          return this.displayError(error);
        }
        const { error, result } = response;
        if (error) {
          return this.displayError(error);
        }

        vm.isLogin = result;
        // if (result) {
        //   if (vm.loginRules.length < 2) { vm.loginRules.push('Введенный логин уже существует. Придумайте другой'); }
        // } else if (vm.loginRules.length > 1) { vm.loginRules.slice(-1); }
      }, 300);
    },
    async register() {
      this.$refs.regForm.validate();
      await this.$nextTick();
      if (!this.validForm) { return; }

      this.loading = true;
      let response;
      try {
        response = await this.$axios.$post('/api/auth/register', this.user);
      } catch (error) {
        this.loading = false;
        console.error(error);
        return this.displayError(error.message);
      }
      const { error, result } = response;
      if (error) {
        this.loading = false;
        return this.displayError(error);
      }

      if (!result) {
        this.loading = false;
        return;
      }

      return this.login();
    },
    async login() {
      const { login, password } = this.user;
      const authData = {
        login,
        password
      };
      const { error, info } = await this.$store.dispatch('user/authUser', authData);
      if (error) {
        this.loading = false;
        return this.displayError(error);
      }
      if (info) {
        this.loading = false;
        return this.$store.commit('SET_GLOBAL_SNACKBAR', {
          ...this.$store.getters.globalSnackbar,
          ...{
            visible: true,
            text: info,
            color: 'info'
          }
        });
      }

      this.$router.replace('/');
      this.loading = false;
    },
    displayError(error) {
      this.$store.commit('SET_GLOBAL_BOTTOM_SHEET', {
        ...this.$store.getters.globalBottomSheet,
        ...{
          visible: true,
          text: `Произошла ошибка при регистрации.<br> Сообщение ошибки: "${error}"`
        }
      });
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
      sm="4"
      md="4"
    >
      <v-card class="elevation-12">
        <v-toolbar
          color="primary"
          dark
          flat
        >
          <v-toolbar-title>Регистрация</v-toolbar-title>
          <v-spacer />
          <nuxt-link :style="{color: 'white'}" to="/login">
            Авторизация
          </nuxt-link>
        </v-toolbar>
        <v-card-text>
          <v-form
            ref="regForm"
            v-model="validForm"
          >
            <v-text-field
              v-model="user.name"
              label="Имя*"
              name="name"
              prepend-icon="mdi-account"
              type="text"
              :rules="nameRules"
            />

            <v-text-field
              v-model="user.lastname"
              label="Фамилия"
              name="lastname"
              prepend-icon="mdi-account"
              type="text"
            />

            <v-text-field
              v-model="user.login"
              label="Логин*"
              name="login"
              prepend-icon="mdi-account"
              type="text"
              :rules="[...loginRules, isLogin ? 'Введенный логин уже существует. Придумайте другой' : null]"
            />

            <v-text-field
              id="password"
              v-model="user.password"
              label="Пароль*"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              :rules="passwordRules"
            />
            <v-text-field
              id="confirmedPassword"
              v-model="confirmedPassword"
              label="Подтверждение пароля*"
              name="confirmedPassword"
              prepend-icon="mdi-lock"
              type="password"
              :rules="confirmedPasswordRules"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn :loading="loading" :disabled="!validForm" color="primary" @click="register">
            Зарегистрироваться
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

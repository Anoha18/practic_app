<script>
import {
  mdiLogoutVariant,
  mdiClipboardListOutline,
  mdiHomeGroup,
  mdiCarMultiple
} from '@mdi/js';

export default {
  props: {
    drawer: {
      type: Boolean,
      required: true
    },
    miniVariant: {
      type: Boolean,
      required: true
    },
    clipped: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      mdiLogoutVariant,
      items: [
        {
          icon: mdiClipboardListOutline,
          title: 'Маршруты',
          to: '/'
        },
        {
          icon: mdiHomeGroup,
          title: 'Базы',
          to: '/base'
        },
        {
          icon: mdiCarMultiple,
          title: 'Спецтехника',
          to: '/cars'
        }
      ]
    };
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout');
      this.$router.replace('/login');
    }
  }
};
</script>

<template>
  <v-navigation-drawer
    :value="drawer"
    :mini-variant="miniVariant"
    :clipped="false"
    fixed
    app
    :mobile-breakpoint="0"
    @input="(val) => $emit('onChangeDrawer', val)"
  >
    <v-list>
      <v-list-item two-line :class="miniVariant && 'px-1'">
        <v-list-item-content>
          <v-list-item-title>Вывоз ТБО в Чувашской<br>Республике</v-list-item-title>
          <!-- <v-list-item-subtitle>Subtext</v-list-item-subtitle> -->
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        router
        exact
        color="red"
        @click="logout"
      >
        <v-list-item-action>
          <v-icon color="red">
            mdi-logout-variant
          </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="color-red" v-text="'Выход'" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

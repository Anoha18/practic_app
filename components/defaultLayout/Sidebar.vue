<script>
import { mdiLogoutVariant } from '@mdi/js';

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
          icon: 'mdi-apps',
          title: 'Мои маршруты',
          to: '/'
        }
      ]
    };
  },
  methods: {
    logout() {
      console.log('logout');
    }
  }
};
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="miniVariant"
    :clipped="clipped"
    fixed
    app
  >
    <v-list>
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

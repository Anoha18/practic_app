<script>
import AddBaseModal from '~/components/base/AddBaseModal';
import BaseTable from '~/components/base/BaseTable';

export default {
  components: {
    AddBaseModal,
    BaseTable
  },
  async asyncData({ store }) {
    const title = 'Базы';
    store.commit('SET_HEADER_TITLE', title);

    const { result } = await store.dispatch('base/getBaseList');

    return {
      title,
      baseList: result || []
    };
  },
  data() {
    return {
      addModalVisible: false
    };
  },
  methods: {
    reloadBaseList() {}
  },
  head() {
    return {
      title: this.title
    };
  }
};
</script>

<template>
  <div :style="{height: '100%', padding: '15px 15px 0 15px'}">
    <v-row>
      <v-col>
        <v-btn rounded @click="addModalVisible = true">
          <v-icon dark>
            mdi-plus
          </v-icon>
          Добавить базу
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <base-table :base-list="[]" />
      </v-col>
    </v-row>

    <add-base-modal :visible="addModalVisible" @reloadBaseList="reloadBaseList" @onClose="addModalVisible = false" />
  </div>
</template>

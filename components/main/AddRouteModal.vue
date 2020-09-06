<script>
import { mdiCalendar, mdiClockTimeFiveOutline } from '@mdi/js';

export default {
  props: {
    visible: {
      type: Boolean,
      defaulf: false
    }
  },
  data() {
    return {
      mdiCalendar,
      mdiClockTimeFiveOutline,
      valid: true,
      route: {
        name: '',
        date: '',
        timeStart: '',
        timeEnd: '',
        priorityId: 2,
        description: ''
      },
      nameRules: [
        v => !!v || 'Наименование обязательно'
      ],
      menuDatePicker: false,
      datePicker: '',
      menuTimeStartPicker: false,
      menuTimeEndPicker: false,
      routesPriorityList: []
    };
  },
  watch: {
    datePicker(val) {
      this.route.date = this.formatDate(this.datePicker);
    },
    async visible(val) {
      if (val && !this.routesPriorityList.length) {
        await this.loadPriorityList();
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('onClose');
    },
    async saveRoute() {
      let response;
      try {
        response = await this.$axios.$put('/api/routes/new', this.route);
      } catch (error) {
        console.error(error);
        return this.$store.commit('SET_GLOBAL_SNACKBAR', {
          ...this.$store.getters.globalSnackbar,
          ...{
            visible: true,
            text: 'Произошла ошибка при сохранении маршрута. Сообщение ошибки: ' + error,
            timeout: 7000,
            color: 'error'
          }
        });
      }

      this.$store.commit('SET_GLOBAL_SNACKBAR', {
        ...this.$store.getters.globalSnackbar,
        ...{
          visible: true,
          text: 'Маршрут успешно сохранен',
          timeout: 3000,
          color: 'success'
        }
      });
      this.closeModal();
      this.clearData();
      this.$emit('reloadRouteList', true);
    },
    clearData() {
      this.route.name = '';
      this.route.date = '';
      this.route.timeStart = '';
      this.route.timeEnd = '';
      this.route.priorityId = 2;
      this.route.description = '';
    },
    formatDate(date) {
      if (!date) { return null; }

      const [year, month, day] = date.split('-');
      return `${day}.${month}.${year}`;
    },
    async loadPriorityList() {
      try {
        const { result } = await this.$axios.$get('/api/routes_priority/list');

        if (!result || !result.length) { return; }

        this.routesPriorityList = result;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<template>
  <v-dialog
    :value="visible"
    :max-width="800"
    @click:outside="closeModal"
  >
    <v-card>
      <v-card-title>
        <span class="headline">Добавление маршрута</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="routeForm" v-model="valid" lazy-validation>
          <v-text-field v-model="route.name" placeholder="Вывоз ТБО по улице Университесткая" label="Наименование" required :rules="nameRules" />
          <v-menu
            v-model="menuDatePicker"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="route.date"
                label="Дата"
                :prepend-icon="mdiCalendar"
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <v-date-picker v-model="datePicker" @input="menuDatePicker = false" />
          </v-menu>
          <v-menu
            ref="menuTimeStart"
            v-model="menuTimeStartPicker"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="route.timeStart"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="route.timeStart"
                label="Время начала работы"
                :prepend-icon="mdiClockTimeFiveOutline"
                readonly
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <v-time-picker
              v-if="menuTimeStartPicker"
              v-model="route.timeStart"
              full-width
              @click:minute="$refs.menuTimeStart.save(route.timeStart)"
            />
          </v-menu>
          <v-menu
            ref="menuTimeEnd"
            v-model="menuTimeEndPicker"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="route.timeEnd"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="route.timeEnd"
                label="Время окончание работы"
                :prepend-icon="mdiClockTimeFiveOutline"
                readonly
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <v-time-picker
              v-if="menuTimeEndPicker"
              v-model="route.timeEnd"
              full-width
              @click:minute="$refs.menuTimeEnd.save(route.timeEnd)"
            />
          </v-menu>
          <v-select
            v-model="route.priorityId"
            :items="routesPriorityList"
            label="Приоритет"
            item-text="name"
            item-value="id"
          />
          <v-textarea
            v-model="route.description"
            name="input-7-1"
            label="Описание"
            clearable
            placeholder="Укажите описание к маршруту"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="() => {clearData(); closeModal();}">
          Отменить
        </v-btn>
        <v-btn text @click="saveRoute">
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

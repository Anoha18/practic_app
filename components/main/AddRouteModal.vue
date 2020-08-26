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
        timeEnd: ''
      },
      nameRules: [
        v => !!v || 'Наименование обязательно'
      ],
      menuDatePicker: false,
      datePicker: '',
      menuTimeStartPicker: false,
      menuTimeEndPicker: false
    };
  },
  watch: {
    datePicker(val) {
      this.route.date = this.formatDate(this.datePicker);
    }
  },
  methods: {
    closeModal() {
      this.$emit('onClose');
    },
    saveRoute() {
      this.closeModal();
    },
    formatDate(date) {
      if (!date) { return null; }

      const [year, month, day] = date.split('-');
      return `${day}.${month}.${year}`;
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
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="closeModal">
          Отменить
        </v-btn>
        <v-btn text @click="saveRoute">
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiCalendar, mdiClockTimeFiveOutline } from '@mdi/js';
import SearchAddressInput from '~/components/SearchAddress/SearchAddressInput';

export default {
  components: {
    SearchAddressInput
  },
  props: {
    visible: {
      type: Boolean,
      defaulf: false
    },
    routeId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      mdiCalendar,
      mdiClockTimeFiveOutline,
      valid: true,
      route: {
        name: '',
        timeStart: '',
        timeEnd: '',
        address: null,
        lat: null,
        lng: null,
        priority: 1,
        comment: '',
        weight: null,
        price: null,
        routeId: this.routeId
      },
      nameRules: [
        v => !!v || 'Название обязательно'
      ],
      addressRules: [
        v => !!v || 'Укажите адрес'
      ],
      weightRules: [
        v => (!!+v || v === '') || 'Только цифры'
      ],
      priceRules: [
        v => (!!+v || v === '') || 'Только цифры'
      ],
      menuDatePicker: false,
      datePicker: '',
      menuTimeStartPicker: false,
      menuTimeEndPicker: false,
      priorityList: []
    };
  },
  watch: {
    datePicker(val) {
      this.route.date = this.formatDate(this.datePicker);
    },
    async visible(val) {
      if (val && !this.priorityList.length) {
        await this.loadPriorityList();
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('onClose');
    },
    async loadPriorityList() {
      let response;
      try {
        response = await this.$axios.$get('/api/addresses_priority/list');
      } catch (error) {
        console.error(error);
        return this.$store.commit('SET_GLOBAL_BOTTOM_SHEET', {
          ...this.$store.getters.globalBottomSheet,
          ...{
            visible: true,
            text: 'Произошла ошибка при загрузке списка приоритетов адресов. Сообщение ошибки: ' + error.message
          }
        });
      }

      const { error, result } = response;
      if (error) {
        console.error(error);
        return this.$store.commit('SET_GLOBAL_BOTTOM_SHEET', {
          ...this.$store.getters.globalBottomSheet,
          ...{
            visible: true,
            text: 'Произошла ошибка при загрузке списка приоритетов адресов. Сообщение ошибки: ' + error
          }
        });
      }
      this.priorityList = result || [];
    },
    async saveRoute() {
      let response;
      try {
        response = await this.$axios.$put('/api/addresses/new', this.route);
      } catch (error) {
        console.error(error);
        return this.$store.commit('SET_GLOBAL_SNACKBAR', {
          ...this.$store.getters.globalSnackbar,
          ...{
            visible: true,
            text: 'Произошла ошибка при сохранении адреса. Сообщение ошибки: ' + error.message,
            timeout: 7000,
            color: 'error'
          }
        });
      }

      console.log('SUBMIT: ', this.route);
      this.$emit('onSaveAddress', true);
      this.closeModal();
      this.clearData();
    },
    formatDate(date) {
      if (!date) { return null; }

      const [year, month, day] = date.split('-');
      return `${day}.${month}.${year}`;
    },
    clearData() {
      this.route.name = '';
      this.route.comment = '';
      this.route.timeStart = '';
      this.route.timeEnd = '';
      this.route.address = null;
      this.route.lat = null;
      this.route.lng = null;
      this.route.priority = 1;
      this.route.weight = null;
      this.route.price = null;
    },
    handleSelectAddress(value) {
      if (!value) {
        this.route.address = null;
        this.route.lat = null;
        this.route.lng = null;
      } else {
        this.route.address = value.address.display_name;
        this.route.lng = value.lng;
        this.route.lat = value.lat;
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
        <span class="headline">Добавление адреса</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="routeForm" v-model="valid" lazy-validation>
          <v-text-field
            v-model="route.name"
            :style="{marginBottom: '10px'}"
            placeholder="Вывоз ТБО Университетская 11"
            label="Название*"
            required
            :rules="nameRules"
          />
          <search-address-input label="Адрес*" required :rules="addressRules" @onSelectAddress="handleSelectAddress" />
          <v-text-field
            v-model="route.weight"
            placeholder="50"
            label="Вес (кг)"
            :rules="weightRules"
          />
          <v-text-field
            v-model="route.price"
            placeholder="1000"
            label="Цена, ₽"
            :rules="priceRules"
          />
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
            v-model="route.priority"
            :items="priorityList"
            label="Приоритет"
            item-text="name"
            item-value="id"
          />
          <v-textarea
            v-model="route.comment"
            name="input-7-1"
            label="Комментарий"
            clearable
            placeholder="Укажите комментарий к адресу"
          />
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

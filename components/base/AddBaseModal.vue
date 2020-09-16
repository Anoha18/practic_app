<script>
import { mdiClockTimeFiveOutline } from '@mdi/js';
import SearchAddressInput from '~/components/SearchAddress/SearchAddressInput';

export default {
  components: {
    SearchAddressInput
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mdiClockTimeFiveOutline,
      valid: false,
      base: {
        name: '',
        timeStart: null,
        timeEnd: null,
        address: null,
        lat: null,
        lng: null,
        comment: ''
      },
      nameRules: [
        v => !!v || 'Название обязательно'
      ],
      addressRules: [
        v => !!v || 'Укажите адрес'
      ],
      menuDatePicker: false,
      datePicker: '',
      menuTimeStartPicker: false,
      menuTimeEndPicker: false
    };
  },
  methods: {
    async saveBase() {
      this.$refs.baseForm.validate();
      await this.$nextTick();
      if (!this.valid) { return; }

      let respone;
      try {
        respone = await this.$axios.$put('/api/base/new', this.base);
      } catch (error) {
        console.error(error);
        return this.displayError(error.message);
      }
      const { result, error } = respone;

      if (error) { return this.displayError(error); }

      this.$emit('onSaveBase', result);
      this.clearData();
      this.closeModal();
    },
    displayError(error) {
      this.$store.commit('SET_GLOBAL_BOTTOM_SHEET', {
        ...this.$store.getters.globalBottomSheet,
        ...{
          visible: true,
          text: 'Произошла ошибка при сохранении базы. Сообщение ошибки: ' + error
        }
      });
    },
    closeModal() {
      this.$emit('onClose');
    },
    clearData() {
      this.base.name = '';
      this.base.timeStart = null;
      this.base.timeEnd = null;
      this.base.address = null;
      this.base.lat = null;
      this.base.lng = null;
      this.base.comment = '';
    },
    handleSelectAddress(value) {
      if (!value) {
        this.base.address = null;
        this.base.lat = null;
        this.base.lng = null;
      } else {
        this.base.address = value.address.display_name;
        this.base.lng = value.lng;
        this.base.lat = value.lat;
      }
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
        <span class="headline">Добавление базы</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="baseForm" v-model="valid" lazy-validation>
          <v-text-field
            v-model="base.name"
            :style="{marginBottom: '10px'}"
            placeholder="Заволжье"
            label="Название*"
            required
            :rules="nameRules"
          />
          <search-address-input label="Адрес*" required :rules="addressRules" @onSelectAddress="handleSelectAddress" />
          <v-menu
            ref="menuTimeStart"
            v-model="menuTimeStartPicker"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="base.timeStart"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="base.timeStart"
                label="Время начала работы"
                :prepend-icon="mdiClockTimeFiveOutline"
                readonly
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <v-time-picker
              v-if="menuTimeStartPicker"
              v-model="base.timeStart"
              full-width
              @click:minute="$refs.menuTimeStart.save(base.timeStart)"
            />
          </v-menu>
          <v-menu
            ref="menuTimeEnd"
            v-model="menuTimeEndPicker"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="base.timeEnd"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="base.timeEnd"
                label="Время окончание работы"
                :prepend-icon="mdiClockTimeFiveOutline"
                readonly
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <v-time-picker
              v-if="menuTimeEndPicker"
              v-model="base.timeEnd"
              full-width
              @click:minute="$refs.menuTimeEnd.save(base.timeEnd)"
            />
          </v-menu>
          <v-textarea
            v-model="base.comment"
            name="input-7-1"
            label="Комментарий"
            clearable
            placeholder="Укажите комментарий к базе"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="closeModal">
          Отменить
        </v-btn>
        <v-btn :disabled="!valid" text @click="saveBase">
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

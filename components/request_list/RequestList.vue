<script>
export default {
  data() {
    return {
      requestList: [
        {
          subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid numquam, accusamus consequuntur nostrum deserunt nulla. Vitae voluptatum itaque vero. Quod earum vitae facere neque dolorum ut dignissimos? Dicta, voluptates doloremque.',
          title: 'Lorem ipsum dolor sit amet consectetur'
        },
        {
          subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid numquam, accusamus consequuntur nostrum deserunt nulla. Vitae voluptatum itaque vero. Quod earum vitae facere neque dolorum ut dignissimos? Dicta, voluptates doloremque.',
          title: 'Lorem ipsum dolor sit amet consectetur'
        },
        {
          subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid numquam, accusamus consequuntur nostrum deserunt nulla. Vitae voluptatum itaque vero. Quod earum vitae facere neque dolorum ut dignissimos? Dicta, voluptates doloremque.',
          title: 'Lorem ipsum dolor sit amet consectetur'
        },
        {
          subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid numquam, accusamus consequuntur nostrum deserunt nulla. Vitae voluptatum itaque vero. Quod earum vitae facere neque dolorum ut dignissimos? Dicta, voluptates doloremque.',
          title: 'Lorem ipsum dolor sit amet consectetur'
        },
        {
          subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid numquam, accusamus consequuntur nostrum deserunt nulla. Vitae voluptatum itaque vero. Quod earum vitae facere neque dolorum ut dignissimos? Dicta, voluptates doloremque.',
          title: 'Lorem ipsum dolor sit amet consectetur'
        },
        {
          subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid numquam, accusamus consequuntur nostrum deserunt nulla. Vitae voluptatum itaque vero. Quod earum vitae facere neque dolorum ut dignissimos? Dicta, voluptates doloremque.',
          title: 'Lorem ipsum dolor sit amet consectetur'
        },
        {
          subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid numquam, accusamus consequuntur nostrum deserunt nulla. Vitae voluptatum itaque vero. Quod earum vitae facere neque dolorum ut dignissimos? Dicta, voluptates doloremque.',
          title: 'Lorem ipsum dolor sit amet consectetur'
        },
        {
          subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid numquam, accusamus consequuntur nostrum deserunt nulla. Vitae voluptatum itaque vero. Quod earum vitae facere neque dolorum ut dignissimos? Dicta, voluptates doloremque.',
          title: 'Lorem ipsum dolor sit amet consectetur'
        },
        {
          subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid numquam, accusamus consequuntur nostrum deserunt nulla. Vitae voluptatum itaque vero. Quod earum vitae facere neque dolorum ut dignissimos? Dicta, voluptates doloremque.',
          title: 'Lorem ipsum dolor sit amet consectetur'
        },
        {
          subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid numquam, accusamus consequuntur nostrum deserunt nulla. Vitae voluptatum itaque vero. Quod earum vitae facere neque dolorum ut dignissimos? Dicta, voluptates doloremque.',
          title: 'Lorem ipsum dolor sit amet consectetur'
        },
        {
          subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid numquam, accusamus consequuntur nostrum deserunt nulla. Vitae voluptatum itaque vero. Quod earum vitae facere neque dolorum ut dignissimos? Dicta, voluptates doloremque.',
          title: 'Lorem ipsum dolor sit amet consectetur'
        },
        {
          subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid numquam, accusamus consequuntur nostrum deserunt nulla. Vitae voluptatum itaque vero. Quod earum vitae facere neque dolorum ut dignissimos? Dicta, voluptates doloremque.',
          title: 'Lorem ipsum dolor sit amet consectetur'
        },
        {
          subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid numquam, accusamus consequuntur nostrum deserunt nulla. Vitae voluptatum itaque vero. Quod earum vitae facere neque dolorum ut dignissimos? Dicta, voluptates doloremque.',
          title: 'Lorem ipsum dolor sit amet consectetur'
        },
        {
          subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid numquam, accusamus consequuntur nostrum deserunt nulla. Vitae voluptatum itaque vero. Quod earum vitae facere neque dolorum ut dignissimos? Dicta, voluptates doloremque.',
          title: 'Lorem ipsum dolor sit amet consectetur'
        },
        {
          subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid numquam, accusamus consequuntur nostrum deserunt nulla. Vitae voluptatum itaque vero. Quod earum vitae facere neque dolorum ut dignissimos? Dicta, voluptates doloremque.',
          title: 'Lorem ipsum dolor sit amet consectetur'
        },
        {
          subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid numquam, accusamus consequuntur nostrum deserunt nulla. Vitae voluptatum itaque vero. Quod earum vitae facere neque dolorum ut dignissimos? Dicta, voluptates doloremque.',
          title: 'Lorem ipsum dolor sit amet consectetur'
        },
        {
          subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid numquam, accusamus consequuntur nostrum deserunt nulla. Vitae voluptatum itaque vero. Quod earum vitae facere neque dolorum ut dignissimos? Dicta, voluptates doloremque.',
          title: 'Lorem ipsum dolor sit amet consectetur'
        },
        {
          subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid numquam, accusamus consequuntur nostrum deserunt nulla. Vitae voluptatum itaque vero. Quod earum vitae facere neque dolorum ut dignissimos? Dicta, voluptates doloremque.',
          title: 'Lorem ipsum dolor sit amet consectetur'
        }
      ]
    };
  }
};
</script>

<template>
  <v-list
    :style="{overflowY: 'auto'}"
  >
    <v-list-item
      v-for="(request, index) in requestList"
      :key="index"
      two-line
    >
      <v-list-item-content>
        <v-list-item-title>
          {{ request.title }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ request.subTitle }}
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-list-item-action-text>00:23 10.08.2020</v-list-item-action-text>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

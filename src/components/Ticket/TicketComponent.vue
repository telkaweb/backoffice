<template>
  <div>
    <div v-for="(child, index) in children" :key="index" class="message-card">
      <v-card  :class="[child.crm_id ? 'crm-card' : 'user-card', 'card-show']" width="45vw">
        <v-card-text>
          {{ child.content }}
        </v-card-text>
      </v-card>
      <TicketComponent :children="child.children_recursive"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "TicketComponent",
  props: {
    children: {
      type: Array,
      required: true,
    },
  }
}
</script>
<style>
.message-card {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.crm-card {
  align-self: flex-end;
}

.user-card {
  align-self: flex-start;
}
</style>
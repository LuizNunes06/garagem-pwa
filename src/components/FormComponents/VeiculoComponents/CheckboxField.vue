<script setup>
import { ref } from "vue";

defineProps(["label", "list", "func"]);
const model = defineModel();

const expandCheckbox = ref(false);
</script>

<template>
  <span class="input-container">
    <p>{{ label }}:</p>
    <div :class="!expandCheckbox ? 'checkbox-container' : 'expanded-list'">
      <span class="checkbox-input" v-for="i in list" :key="i">
        <input type="checkbox" id="checkbox" @change="func(i.id)" />
        <label for="checkbox">{{ i.descricao }} ({{ i.id }})</label>
      </span>
    </div>
    <button @click="expandCheckbox = !expandCheckbox" class="open-checkbox-btn">
      <i
        :class="
          !expandCheckbox
            ? 'mdi mdi-12px mdi-arrow-down '
            : 'up-arrow-icon mdi mdi-12px mdi-arrow-down '
        "
      ></i>
    </button>
  </span>
</template>

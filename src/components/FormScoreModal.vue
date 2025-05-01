<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ counter: number }>()

const emits = defineEmits<{
  formSubmit: [name: string]
}>()

const error = ref(false)
const title = ref('')

function formSubmitHandler() {
  if (title.value.trim().length <= 3) {
    error.value = true
  } else {
    emits('formSubmit', title.value)
    title.value = ''
    error.value = false
  }
}
</script>

<template>
  <article>
    <h1>Add new score</h1>
    <form @submit.prevent="formSubmitHandler">
      <div class="title">
        <input
          type="text"
          v-model="title"
          placeholder="Player Name"
          name="title"
          @input="!error"
          :aria-invalid="error === true || undefined"
        />
        <small v-if="error"> Player name needs to be more than 3 characters </small>

        <strong>
          <span>Elapsed Time: </span>
          <span>{{ props.counter }}</span>
          <span> s</span>
        </strong>
      </div>
      <div class="btn-container">
        <button>Submit</button>
      </div>
    </form>
  </article>
</template>

<style scoped>
article  {
  box-shadow: 2px 2px 20px 1px;
}

h1 {
  text-align: center;
}

strong {
  margin: auto;
}

span {
  font-size: x-large;
}

span:nth-child(2) {
  font-weight: 800;
}

form {
  margin-top: 0.5rem;
}

form > * + * {
  margin-top: 0.5rem;
}

div {
  display: flex;
  flex-direction: column;
}

input {
  padding: 0.5rem 1rem;
}

.btn-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}
</style>

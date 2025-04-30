<script setup lang="ts">
import { computed, onBeforeMount, onMounted, onUnmounted, ref, watch } from 'vue'
import CardComponent from '@/components/CardComponent.vue'
import ContainerWrapper from '@/components/ContainerWrapper.vue'
import FormScoreModal from '@/components/FormScoreModal.vue'
import { useStore } from '@/composable/useStore'
import router from '@/router'
import type { Pokemon } from '@/types'

let intervalId: number | undefined

const { pokemons, addScore, setPokemonFound } = useStore()
const counter = ref(0)
const openSaveScoreModal = ref(false)
const pokemonPairs = ref<Pokemon[]>([])

function setCounter() {
  counter.value = counter.value + 1
}

function select(cardItem: Pokemon) {
  pokemonPairs.value.push({ ...cardItem })
}

function formSaveScoreSubmit(name: string) {
  addScore(name, counter.value)

  router.push('/score')
}

function handleCloseScoreModalClick() {
  openSaveScoreModal.value = false
}

const isPair = computed(() => {
  if (pokemonPairs.value.length == 2) {
    return pokemonPairs.value[0].id === pokemonPairs.value[1].id
  } else {
    return false
  }
})

const isGameOver = computed(() => pokemons.value.every((item) => item.isFound))

watch(isPair, (newVal) => {
  if (newVal) {
    setPokemonFound(pokemonPairs.value[0].id)
  }
})

watch(
  pokemonPairs,
  (newVal) => {
    if (newVal.length === 2) {
      setTimeout(() => {
        pokemonPairs.value = []
      }, 1000)
    }
  },
  { deep: true },
)

watch(isGameOver, (newVal) => {
  if (newVal) {
    clearInterval(intervalId)
    openSaveScoreModal.value = true
  }
})

onBeforeMount(() => {
  if (pokemons.value.length === 0) {
    router.push('/')
  }
})
onMounted(() => (intervalId = setInterval(setCounter, 1000)))
onUnmounted(() => clearInterval(intervalId))
</script>

<template>
  <ContainerWrapper class="game-wrapper">
    <p>
      <span>Elapsed Time: </span>
      <span>{{ counter }}</span>
      <span> s</span>
    </p>
    <div class="card-wrapper">
      <CardComponent
        v-for="(pokemon, index) in pokemons"
        :key="pokemon.name + index"
        :pokemon="pokemon"
        :pokemon-pairs="pokemonPairs"
        @select="select"
      />
    </div>
    <Teleport to="body">
      <dialog :open="openSaveScoreModal && isGameOver" @click.self="handleCloseScoreModalClick">
        <FormScoreModal @form-submit="formSaveScoreSubmit" :counter="counter" />
      </dialog>
    </Teleport>
  </ContainerWrapper>
</template>

<style scoped>
span {
  font-size: x-large;
}

span:nth-child(2) {
  font-weight: 800;
}

.card-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}
</style>

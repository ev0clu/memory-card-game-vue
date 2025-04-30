<script setup lang="ts">
import ContainerWrapper from '@/components/ContainerWrapper.vue'
import { useStore } from '@/composable/useStore'
import { format } from 'date-fns'

const { getScores } = useStore()

const scoreHistory = getScores()
</script>

<template>
  <ContainerWrapper>
    <h1>Scores</h1>
    <div class="score" v-if="scoreHistory !== null && scoreHistory.length > 0">
      <table class="striped">
        <thead data-theme="light">
          <tr>
            <th scope="col">Order</th>
            <th scope="col">Name</th>
            <th scope="col">Time (s)</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(score, index) in scoreHistory" :key="score.id">
            <td>{{ index + 1 }}</td>
            <td>{{ score.name }}</td>
            <td>{{ score.time }}</td>
            <td>{{ format(new Date(score.createdAt), 'MM/dd/yyyy - HH:mm') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <strong v-else>There is still no history scores!</strong>
  </ContainerWrapper>
</template>

<style scoped>
.score {
  overflow: auto;
  height: 350px;
  width: 100%;
}

thead {
  position: sticky;
  top: 0;
  z-index: 1;
}
</style>

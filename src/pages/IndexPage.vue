<template>
  <q-page class="flex flex-center">
    <q-input filled v-model="numero" label="Numero" />
    <q-btn @click="Discar(numero)" label="Discar" class="q-ml-sm" />
    <q-btn v-if="incall" @click="Desligar" color="red" label="Desligar" class="q-ml-sm" />
  </q-page>
  <incallPopup />
</template>

<script setup>
import useWebRTC from 'src/state/webrtc'
import incallPopup from 'src/components/incallPopup.vue'

const { numero, Discar, Desligar, incall } = useWebRTC()
</script>

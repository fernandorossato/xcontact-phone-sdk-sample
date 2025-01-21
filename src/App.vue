<template>
  <router-view />
</template>

<script setup>
navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then(function () {
    console.log('You let me use your mic!')
  })
  .catch(function (err) {
    console.log('No mic for you!')
    console.error(err)
  })

import useWebRTC from './state/webrtc'

const { RegistrarRamal } = useWebRTC()

RegistrarRamal()
</script>

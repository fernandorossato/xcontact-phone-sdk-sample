<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Netwall phone </q-toolbar-title>

        <div>Status: {{ status }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import useWebRTC from 'src/state/webrtc'

const { status } = useWebRTC()
</script>

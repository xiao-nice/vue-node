<template>
  <div>
    111
  </div>
</template>

<script lang="ts" setup>
  import { useUserStroe } from '@/store/modules/user'
  const userInfo = useUserStroe()
  console.log(userInfo.userInfo, 'userInfo');
  
</script>
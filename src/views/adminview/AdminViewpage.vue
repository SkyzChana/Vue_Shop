<template>
  <div>
    <h1>THIS IS ADMIN PAGE</h1>
    
    <!-- แสดงข้อมูลที่ดึงมาจากการ Login -->
    <div v-if="userInfo">
      <p><b>Username:</b> {{ userInfo.username }}</p>
      <p><b>Role:</b> {{ userInfo.role }}</p>
      <p><b>User ID:</b> {{ userInfo.user_id }}</p>
      <p><b>Token:</b> {{ userInfo.token}}</p>
    </div>
    <div v-else>
      <p>กำลังโหลดข้อมูล หรือยังไม่ได้เข้าสู่ระบบ...</p>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            userInfo: null
        }
    },
    mounted() {
        // ดึงข้อมูลที่เก็บไว้ตอน Login กลับมาแปลงเป็น Object
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            this.userInfo = JSON.parse(storedUser)
        }
    }
}
</script>

<style>
</style>
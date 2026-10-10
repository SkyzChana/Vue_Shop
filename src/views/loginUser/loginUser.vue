<template>
  <div>
    <form @submit.prevent="getData">
      <div>
        <label>Username</label>
        <input type="text" v-model="username" required />
      </div>

      <div>
        <label>Password</label>
        <input type="password" v-model="password" required />
      </div>

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
import axios from 'axios'

export default {
    data(){
        return {
            username: '',
            password: '',
            apidata: null
        }
    },
    methods:{
        getData(){
            axios.post('http://localhost:3000/api/v1/login', {
                username: this.username,
                password: this.password
            }).then(response => {
                console.log(response.data)
                // Backend ส่งข้อมูลกลับมาในรูปแบบ { status, message, data: { user_id, username, role, approved, token } }
                this.apidata = response.data.data 
                
                // เก็บ token และข้อมูลลง localStorage ไว้ใช้งานต่อ (เช่น Header Authorization)
                // localStorage.setItem('token', this.apidata.token)
                localStorage.setItem('user', JSON.stringify(this.apidata))

                // เช็คว่า approved เป็น true หรือไม่
                if (this.apidata.approved === true){
                    if(this.apidata.role === "admin"){
                        this.$router.push({ path: '/admin' })
                    } else {
                        this.$router.push({ path: '/user' },this.apidata)
                    }
                } else {
                    // กรณี approved เป็น false (Backend ส่ง status 401 แต่ถ้าผ่าน .then แสดงว่าดักไว้)
                    alert(response.data.message || 'รอ Admin อนุมัติการใช้งาน')
                }
            }).catch(error => {
                console.error(error)
                // ดึงข้อความ error จาก Backend (เช่น "invlid username or password." หรือ "wait admin approve.")
                const errorMsg = error.response && error.response.data && error.response.data.message 
                                 ? error.response.data.message 
                                 : 'เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์'
                
                // กรณี Backend ส่ง status 401 กลับมาเพราะยังไม่อนุมัติ (บางคนอาจมองว่าเป็น Error)
                if (error.response && error.response.status === 401) {
                    alert(error.response.data.message || 'รอ Admin อนุมัติการใช้งาน')
                } else {
                    alert(errorMsg)
                }
            })
        }
    }
}
</script>

<style>
</style>
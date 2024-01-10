<template>
  <section>
    <Loading v-if="loading" />
    <div class="mainContainer flex">
      <div class="left w-1/2">
        <div class="container">
          <div class="title flex flex-col items-center">
            <div class="firstTitle">Sign Up With</div>
            <div class="mainTitle">FOOTZONE</div>
          </div>
        </div>
      </div>
      <div class="right w-1/2 px-64 justify-center flex relative">
        <div class="container flex flex-col items-center justify-center gap-10">
          <div class="rightTitle">Create an Account</div>
          <div class="formContainer w-full">
            <UForm class="space-y-10" @submit="onSubmit">
              <UFormGroup label="Email" name="email">
                <UInput v-model="email" />
              </UFormGroup>

              <UFormGroup label="Username" name="username">
                <UInput v-model="username" />
              </UFormGroup>

              <UFormGroup label="Password" name="password">
                <UInput v-model="password" type="password" />
              </UFormGroup>

              <UButton type="submit" class="w-full justify-center">
                Create Account
              </UButton>
            </UForm>
          </div>

          <div class="lower flex items-center justify-end">
            <div class="text flex flex-col">
              <div class="upperText">For The Love of</div>
              <div class="lowerText">FOOTBALL</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { supabase } from "../src/lib/supabaseClient";

export default {
  name: "signup",
  data() {
    return {
      email: "",
      password: "",
      username: "",
      loading: false,
    };
  },
  methods: {
    clearForm() {
      this.username = "";
      this.password = "";
      this.email = "";
    },
    async onSubmit() {
      const toast = useToast();

      this.loading = true;
      const { data, error } = await supabase.auth.signUp({
        email: this.email,
        password: this.password,
        options: {
          data: {
            username: this.username,
          },
        },
      });

      if (data) {
        this.loading = false;

        toast.add({
          id: "account_created",
          title: "Account Created",
          timeout: 5000,
        });
        console.log("form", data);
      } else {
        this.loading = false;

        console.log("error", error);
      }
      this.setUserBalance();
      this.setUserPlayers();

      this.setUserTeam();

      this.clearForm();
    },
    async setUserBalance() {
      const { data, error } = await supabase
        .from("users")
        .insert({ username: this.username, coinBalance: 50000 })
        .select();
    },
    async setUserPlayers() {
      const { data, error } = await supabase
        .from("players")
        .insert({ username: this.username, players: {} })
        .select();
    },
    async setUserTeam() {
      const { data, error } = await supabase
        .from("teams")
        .insert({ username: this.username, team: {} })
        .select();
    },
  },
};
</script>
<script setup>
definePageMeta({
  layout: "custom",
});
</script>
<style scoped>
.mainContainer {
  height: 100vh;
}
.left {
  background: url("../assets/bannerSignup.png"),
    lightgray 2.446px 1.345px / 100% 104.037% no-repeat;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  padding: 100px 0 0;
  background-position: center;
}
.right {
  padding-top: 100px;
  height: 100%;
}
.firstTitle {
  color: #fff;
  font-family: Poppins;
  font-size: 48px;
  font-style: normal;
  font-weight: 400;
}
.mainTitle {
  color: #16c432;
  font-family: Poppins;
  font-size: 48px;
  margin-top: -20px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
}
.rightTitle {
  color: #fff;
  font-family: Poppins;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.lower {
  position: absolute;
  right: 15px;
  bottom: 5px;
}
.upperText {
  color: #fff;
  font-family: Poppins;
  font-size: 22px;
  font-style: normal;
  font-weight: 300;
  /* line-height: normal; */
}
.lowerText {
  font-family: Poppins;
  font-size: 32px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  background: linear-gradient(90deg, #7beb8d 3.33%, #15451d 125.15%);
  background-clip: text;
  -webkit-background-clip: text;
  margin-top: -15px;
  -webkit-text-fill-color: transparent;
}
</style>

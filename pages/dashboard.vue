<script setup>
import { ref } from "vue";
import { reloadNuxtApp } from "nuxt/app";

const formData = ref({
  title: "",
  start: "",
  end: "",
});

const submitForm = async () => {
  const id = Date.now();

  try {
    const response = await useFetch("http://localhost:3000/api/events", {
      method: "post",
      body: {
        id: id,
        title: formData.value.title,
        start: formData.value.start.replace("T", " "),
        end: formData.value.end.replace("T", " "),
      },
    });
    if (response?.status?._value === "success") {
      window.alert("Evento Creato");
    } else {
      if (response?.error?.value.statusCode === 404) {
        window.alert("Error " + response.error.value.data.message);
        console.error("404, Not found");
      }
      if (response?.error?.value?.statusCode === 500) {
        window.alert("Error " + response.error.value.data.message);
        console.error("500, internal server error");
      }
    }
  } catch (error) {
    console.error("Fetch", error);
  }
};
</script>

<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label for="title">title</label>
        <input
          required
          type="text"
          v-model="formData.title"
          id="title"
          placeholder="Event Name"
        />
      </div>

      <div>
        <label for="start">start</label>
        <input
          required
          type="datetime-local"
          v-model="formData.start"
          id="start"
          placeholder="2023-12-20 12:00"
        />
      </div>

      <div>
        <label for="end">end</label>
        <input
          required
          type="datetime-local"
          v-model="formData.end"
          id="end"
          placeholder="2023-12-20 13:00"
        />
      </div>

      <div>
        <button type="submit">Submit Event</button>
      </div>
    </form>
  </div>
</template>

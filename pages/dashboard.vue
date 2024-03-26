<script setup>
import { ref } from "vue";

const formData = ref({
  title: "",
  start: "",
  end: "",
});

const submitForm = async () => {
  const id = Date.now();
  const { data: responseData } = await useFetch(
    "http://localhost:3000/api/events",
    {
      method: "post",
      body: {
        id: id,
        title: formData.value.title,
        start: formData.value.start.replace("T", " "),
        end: formData.value.end.replace("T", " "),
      },
    }
  );
};
</script>

<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label for="title">title</label>
        <input
          type="text"
          v-model="formData.title"
          id="title"
          placeholder="Event Name"
        />
      </div>

      <div>
        <label for="start">start</label>
        <input
          type="datetime-local"
          v-model="formData.start"
          id="start"
          placeholder="2023-12-20 12:00"
        />
      </div>

      <div>
        <label for="end">end</label>
        <input
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

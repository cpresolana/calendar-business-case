<script setup>
import { ScheduleXCalendar } from "@schedule-x/vue";
import {
  createCalendar,
  viewDay,
  viewWeek,
  viewMonthGrid,
  viewMonthAgenda,
} from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/index.css";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { reloadNuxtApp } from "nuxt/app";
//

const response = await fetch("/api/events");
const data = await response.json();

const calendarApp = createCalendar({
  selectedDate: Date.now,
  views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
  defaultView: viewWeek.name,
  plugins: [createEventModalPlugin()],
  events: data.events,
  calendars: {
    work: {
      colorName: "work",
      lightColors: {
        container: "#fff",
        onContainer: "#000",
        main: "#fff",
      },
      darkColors: {
        container: "#000",
        onContainer: "#fff",
        main: "#000",
      },
    },
  },
});

async function deleteEvent(id) {
  calendarApp.events.remove(id);
  const { data: responseData } = await useFetch(
    "http://localhost:3000/api/events",
    {
      method: "delete",
      body: {
        id: id,
      },
    }
  );
  reloadNuxtApp();
}

import { ref } from "vue";

const formData = ref({
  title: "",
  start: "",
  end: "",
});

const submitForm = async () => {
  const { data: responseData } = await useFetch(
    "http://localhost:3000/api/events",
    {
      method: "patch",
      body: {
        title: formData.value.title,
        start: formData.value.start.replace("T", " "),
        end: formData.value.end.replace("T", " "),
      },
    }
  );
  reloadNuxtApp();
};
</script>

<template>
  <div>
    <ClientOnly>
      <ScheduleXCalendar :calendar-app="calendarApp">
        <template #eventModal="{ calendarEvent }">
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
              <button type="submit">Update Event</button>
            </div>
          </form>
          <button @click="deleteEvent(calendarEvent.id)">Delete event</button>
        </template>
      </ScheduleXCalendar>
    </ClientOnly>
  </div>
</template>

<style>
.sx-vue-calendar-wrapper {
  height: 700px;
  max-height: 90vh;
  width: 100%;
}
</style>
<template>
  <a-form
    :model="formState"
    v-bind="layout"
    name="nest-messages"
    @submit="onSubmit"
    labelAlign="left"
    class="form-container"
  >
    <a-form-item :name="total" :rules="[{ required: true }]">
      <a-row type="flex" align="middle" :gutter="[16, 0]">
        <a-col flex="60px" align="end">
          <div
            style="
              display: flex;
              justify-content: center;
              border-radius: 4px;
              border: 1px solid black;
              /* width: 80%; */
            "
          >
            USD
          </div>
        </a-col>
        <a-col flex="auto">
          <a-input v-model:value="formState.total" />
        </a-col>
      </a-row>
    </a-form-item>
    <a-form-item
      :name="category"
      :rules="[{ type: 'number', min: 0, max: 99 }]"
    >
      <a-row type="flex" align="middle" :gutter="[16, 0]">
        <a-col flex="60px" align="end">
          <unordered-list-outlined style="font-size: 16px" />
        </a-col>
        <a-col flex="auto">
          <a-input v-model:value="formState.category" type="number" />
        </a-col>
      </a-row>
    </a-form-item>
    <a-form-item :name="note" label="note">
      <a-input v-model:value="formState.note" type="text" style="width: 50%" />
    </a-form-item>
    <a-form-item :name="date" label="date">
      <a-input v-model:value="formState.date" type="date" />
    </a-form-item>
    <a-form-item :wrapper-col="{ ...layout.wrapperCol }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
  <form @submit.prevent="onSubmit">
    <div class="container">
      <label for="total" class="item-container">
        <div
          style="
            border-radius: 4px;
            border: 1px solid black;
            margin-left: 8px;
            padding: 0 4px;
            width: 32px;
          "
        >
          <span>USD</span>
        </div>
        <div class="input-container">
          <span>Total</span>
          <input
            type="number"
            id="total"
            name="total"
            placeholder="Total"
            v-model="total"
          />
        </div>
      </label>
      <label for="category" class="item-container">
        <div
          style="
            width: 42px;
            margin-left: 8px;
            display: flex;
            justify-content: center;
          "
        >
          <span
            style="
              display: inline-block;
              background-color: aqua;
              width: 24px;
              height: 24px;
              border-radius: 50%;
            "
          ></span>
        </div>
        <div class="input-container">
          <input
            type="text"
            id="category"
            name="category"
            placeholder="Select Category"
            v-model="category"
          />
        </div>
      </label>
      <label for="note" class="item-container">
        <div
          style="
            width: 42px;
            margin-left: 8px;
            display: flex;
            justify-content: center;
          "
        >
          <span>
            <unordered-list-outlined />
          </span>
        </div>
        <div class="input-container">
          <input
            type="text"
            id="note"
            name="note"
            placeholder="Note"
            v-model="note"
          />
        </div>
      </label>
      <label for="date" class="item-container">
        <div
          style="
            width: 42px;
            margin-left: 8px;
            display: flex;
            justify-content: center;
          "
        >
          <span>
            <calendar-outlined />
          </span>
        </div>
        <div class="input-container">
          <input type="date" id="date" name="date" v-model="date" />
        </div>
      </label>
      <label for="wallet" class="item-container">
        <div
          style="
            width: 42px;
            margin-left: 8px;
            display: flex;
            justify-content: center;
          "
        >
          <span>
            <wallet-outlined />
          </span>
        </div>
        <div class="input-container">My Wallet</div>
      </label>
    </div>
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px 0;
      "
      v-if="!isShowDetail"
    >
      <button
        style="border: none; background-color: white; color: blue"
        @click="isShowDetail = !isShowDetail"
      >
        More detail
      </button>
    </div>

    <!-- More detail -->
    <div style="padding: 10px 36px" v-if="isShowDetail">
      <label for="location" class="item-container">
        <div
          style="
            width: 42px;
            margin-left: 8px;
            display: flex;
            justify-content: center;
          "
        >
          <span>
            <global-outlined />
          </span>
        </div>
        <div class="input-container">
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Select a location"
          />
        </div>
      </label>
      <label for="person" class="item-container">
        <div
          style="
            width: 42px;
            margin-left: 8px;
            display: flex;
            justify-content: center;
          "
        >
          <span>
            <team-outlined />
          </span>
        </div>
        <div class="input-container">
          <input
            type="text"
            id="person"
            name="person"
            placeholder="With person"
          />
        </div>
      </label>

      <!-- Upload photo -->
      <div style="padding: 10px 0">
        <label for="photo" class="item-container">
          <div
            style="
              width: 42px;
              margin-left: 8px;
              display: flex;
              justify-content: center;
            "
          >
            <span>
              <camera-outlined />
            </span>
          </div>
          <div class="input-container">
            <span>Upload photo</span>
            <input
              type="file"
              id="photo"
              name="photo"
              hidden
              @change="onChangeFile"
            />
          </div>
        </label>
      </div>
    </div>
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px 0;
      "
    >
      <button type="submit">Add</button>
    </div>
  </form>
</template>

<script lang="ts">
import { ref, reactive } from "vue";
import { useUser } from "@/composables/useUser";
import { useCollection } from "@/composables/useCollection";
import { useStroage } from "@/composables/useStroage";
import { Timestamp } from "firebase/firestore";
import {
  UnorderedListOutlined,
  CalendarOutlined,
  WalletOutlined,
  GlobalOutlined,
  TeamOutlined,
  CameraOutlined,
} from "@ant-design/icons-vue";

export default {
  components: {
    UnorderedListOutlined,
    CalendarOutlined,
    WalletOutlined,
    GlobalOutlined,
    TeamOutlined,
    CameraOutlined,
  },
  setup() {
    const isShowDetail = ref<boolean>(false);
    const formState = reactive({
      total: 0,
      category: "",
      note: "",
      date: new Date(),
    });
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8 },
    };
    const total = ref<number>(0);
    const category = ref<string>("");
    const note = ref<string>("");
    const date = ref<Date>(new Date());
    const location = ref<string>("");
    const person = ref<string>("");
    const file = ref<File | null>(null);
    const errorFile = ref<string | null>(null);

    const { getUser } = useUser();
    const { error, addRecord } = useCollection("transactions");
    const { errorStroage, fileUrl, uploadFile } = useStroage("transactions");

    const onChangeFile = (e: any) => {
      const files = e.target.files;
      const typeFile = ["image/png", "image/jpg"];
      if (files && files[0] && typeFile.includes(files[0].type)) {
        file.value = files[0];
      } else {
        file.value = null;
        errorFile.value = "Could not upload file";
      }
    };

    const onSubmit = async () => {
      if (file.value) {
        await uploadFile(file.value);
        const { userRef } = getUser();
        if (fileUrl !== null) {
          const data = {
            userId: userRef?.uid,
            total: total.value,
            category: category.value,
            note: note.value,
            date: Timestamp.fromDate(new Date(date.value)),
            location: location.value,
            person: person.value,
            thumbnailUrl: fileUrl.value,
          };
          await addRecord(data);
          if (error.value) {
            console.log(error.value);
            return;
          } else {
            console.log("Add record successfully");
          }
        }
      }
    };
    return {
      isShowDetail,
      formState,
      total,
      category,
      note,
      date,
      layout,
      onChangeFile,
      onSubmit,
    };
  },
};
</script>

<style scoped>
@import "./NewTransactionView/style.css";
</style>

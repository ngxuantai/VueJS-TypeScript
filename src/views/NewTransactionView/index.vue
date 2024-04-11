<template>
  <a-form
    :model="formState"
    labelAlign="left"
    class="form-container"
    :validate-messages="validateMessages"
    @finish="onSubmit"
  >
    <a-row type="flex" align="top" :gutter="[16, 0]">
      <a-col flex="60px" align="end" style="padding-top: 4px">
        <div
          style="
            display: flex;
            justify-content: center;
            border-radius: 4px;
            border: 1px solid black;
          "
        >
          USD
        </div>
      </a-col>
      <a-col flex="auto">
        <a-form-item :name="['total']" :rules="[{ required: true }]">
          <a-input v-model:value="formState.total" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row type="flex" align="top" :gutter="[16, 0]">
      <a-col flex="60px" align="end" style="padding-top: 4px">
        <span
          style="
            display: inline-block;
            background-color: aqua;
            width: 24px;
            height: 24px;
            border-radius: 50%;
          "
        ></span>
      </a-col>
      <a-col flex="auto">
        <a-form-item
          :name="['category']"
          :rules="[{ required: true }, { type: 'number', min: 0, max: 99 }]"
        >
          <a-input-number
            v-model:value="formState.category"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row type="flex" align="top" :gutter="[16, 0]">
      <a-col flex="60px" align="end" style="padding-top: 4px">
        <unordered-list-outlined style="font-size: 16px" />
      </a-col>
      <a-col flex="auto">
        <a-form-item :name="['note']" :rules="[{ required: true }]">
          <a-input
            v-model:value="formState.note"
            type="text"
            style="width: 50%"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row type="flex" align="top" :gutter="[16, 0]">
      <a-col flex="60px" align="end" style="padding-top: 4px">
        <calendar-outlined style="font-size: 16px" />
      </a-col>
      <a-col flex="auto">
        <a-form-item :name="['date']" :rules="[{ required: true }]">
          <a-date-picker v-model:value="formState.date" />
        </a-form-item>
      </a-col>
    </a-row>

    <!-- More details -->
    <a-form-item v-if="!isShowDetail">
      <a-row justify="center">
        <a-button
          type="text"
          @click="isShowDetail = !isShowDetail"
          style="color: blue"
        >
          More detail
        </a-button>
      </a-row>
    </a-form-item>
    <div v-if="isShowDetail">
      <a-form-item>
        <a-row
          type="flex"
          align="middle"
          :gutter="[16, 0]"
          style="margin-top: 16px"
        >
          <a-col flex="60px" align="end">
            <global-outlined style="font-size: 16px" />
          </a-col>
          <a-col flex="auto">
            <a-input v-model="formState.location" type="text" />
          </a-col>
        </a-row>
        <a-row
          type="flex"
          align="middle"
          :gutter="[16, 0]"
          style="margin-top: 16px"
        >
          <a-col flex="60px" align="end">
            <team-outlined style="font-size: 16px" />
          </a-col>
          <a-col flex="auto">
            <a-input v-model="formState.person" type="text" />
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item>
        <a-row type="flex" align="middle" :gutter="[16, 0]">
          <a-col flex="60px" align="end">
            <camera-outlined style="font-size: 16px" />
          </a-col>
          <a-col flex="auto">
            <label for="photo">Upload photo</label>
            <a-input id="photo" type="file" hidden @change="onChangeFile" />
            <a-row type="flex" align="middle" justify="space-between">
              <a-col>
                <label v-if="!formState.errorFile" style="color: blue">{{
                  formState.file?.name
                }}</label>
                <label v-else style="color: red">{{
                  formState.errorFile
                }}</label>
              </a-col>
              <delete-outlined v-if="formState.file?.name" style="color: red" />
            </a-row>
          </a-col>
        </a-row>
      </a-form-item>
    </div>
    <a-form-item :wrapper-col="{ ...layout.wrapperCol }">
      <a-row justify="center">
        <a-button
          type="primary"
          html-type="submit"
          :disabled="isPendingCollec || isPendingStroage"
        >
          {{ isPendingCollec || isPendingStroage ? "Loading" : "Submit" }}
        </a-button>
      </a-row>
    </a-form-item>
  </a-form>
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
  GlobalOutlined,
  TeamOutlined,
  CameraOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";

export default {
  components: {
    UnorderedListOutlined,
    CalendarOutlined,
    GlobalOutlined,
    TeamOutlined,
    CameraOutlined,
    DeleteOutlined,
  },
  setup() {
    const isShowDetail = ref<boolean>(false);
    const formState = reactive({
      total: null as number | null,
      category: null as number | null,
      note: "",
      date: "",
      location: "",
      person: "",
      file: null as File | undefined | null,
      errorFile: "",
    });
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8 },
    };

    const { getUser } = useUser();
    const { isPendingCollec, error, addRecord } = useCollection("transactions");
    const { isPendingStroage, errorStroage, fileUrl, uploadFile } =
      useStroage("transactions");

    const validateMessages = {
      required: "Please input ${label}!",
      types: {
        number: "${label} is not a valid number!",
      },
      number: {
        range: "${label} must be between ${min} and ${max}",
      },
    };

    const onChangeFile = (e: any) => {
      const files = e.target.files;
      console.log(files);
      const typeFile = ["image/png", "image/jpg"];
      if (files && files[0] && typeFile.includes(files[0].type)) {
        formState.file = files[0];
      } else {
        formState.file = null;
        formState.errorFile = "Could not upload file";
      }
    };

    const clearForm = () => {
      formState.total = null;
      formState.category = null;
      formState.note = "";
      formState.date = "";
      formState.location = "";
      formState.person = "";
      formState.file = null;
      formState.errorFile = "";
    };

    const onSubmit = async () => {
      console.log("submit");
      const { userRef } = getUser();
      if (formState.file) {
        await uploadFile(formState.file);
        if (fileUrl !== null) {
          const data = {
            userId: userRef?.uid,
            total: formState.total,
            category: formState.category,
            note: formState.note,
            date: Timestamp.fromDate(new Date()),
            location: formState.location,
            person: formState.person,
            thumbnailUrl: fileUrl.value,
          };
          await addRecord(data);
          if (error.value) {
            console.log(error.value);
            return;
          } else {
            console.log("Add record successfully");
            clearForm();
          }
        }
      } else {
        const data = {
          userId: userRef?.uid,
          total: formState.total,
          category: formState.category,
          note: formState.note,
          date: Timestamp.fromDate(new Date()),
          location: formState.location,
          person: formState.person,
          thumbnailUrl: "",
        };
        await addRecord(data);
        if (error.value) {
          console.log(error.value);
          return;
        } else {
          console.log("Add record successfully");
          clearForm();
        }
      }
    };
    return {
      isShowDetail,
      formState,
      layout,
      validateMessages,
      isPendingCollec,
      isPendingStroage,
      onChangeFile,
      onSubmit,
    };
  },
};
</script>

<style scoped>
@import "./style.css";
</style>

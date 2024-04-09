<template>
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
          <input type="number" id="total" name="total" placeholder="Total" />
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
            type="number"
            id="category"
            name="category"
            placeholder="Select Category"
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
          <input type="text" id="note" name="note" placeholder="Note" />
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
          <input type="date" id="date" name="date" />
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
    <div style="padding: 10px 36px" v-if="isShowDetail">
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
          <input type="text" id="note" name="note" placeholder="Note" />
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
          <input type="date" id="date" name="date" />
        </div>
      </label>
    </div>
  </form>
</template>

<script lang="ts">
import { ref } from "vue";
import {
  UnorderedListOutlined,
  CalendarOutlined,
  WalletOutlined,
} from "@ant-design/icons-vue";

export default {
  components: {
    UnorderedListOutlined,
    CalendarOutlined,
    WalletOutlined,
  },
  setup() {
    const isShowDetail = ref<boolean>(false);
    const onSubmit = () => {
      console.log("submit");
    };
    return {
      isShowDetail,
      onSubmit,
    };
  },
};
</script>

<style scoped>
.container {
  margin-top: 80px;
  padding: 0 36px;
}
.item-container {
  display: flex;
  align-items: end;
  padding: 12px 0;
  gap: 8px;
}
.input-container {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
}
.input-container input {
  border: none;
  font-size: 14px;
}
</style>

<template>
  <div class="container">
    <div class="house_image">
      <img :src="getImages(img)" alt="House" />
    </div>
    <div class="house_info">
      <div>
        <span class="name">
          {{ houseName }}
        </span>
        <span class="type" style="background-color: rgb(251, 146, 82)"
          >住宅</span
        >
        <span class="status" style="background-color: rgb(83, 204, 154)"
          >在售</span
        >
      </div>
      <div class="location">
        <span>{{ city }}</span>
        <i class="split">/</i>
        <span>{{ location }}</span>
      </div>
      <div style="margin-top: 30px; height: 20px">
        <span class="room" v-for="room in rooms" :key="room">
          {{ room }}
        </span>
      </div>
      <div style="margin-top: 30px; height: 20px">
        <span class="area">
          {{ area == "None" ? "" : area }}
        </span>
      </div>
      <div>
        <span v-for="tag in tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>
    </div>
    <div class="house_price">
      <div style="height: 55px; margin-top: 100px; margin-right: 0">
        <div>
          <span class="number">
            {{ number ? number : "价格待定" }}
          </span>
          <span v-if="number" class="desc">&nbsp;元/㎡(均价)</span>
        </div>
        <div>
          <span class="price">{{ data == "None" ? "" : data }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    img: {
      type: String,
      required: true,
    },
    houseName: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    rooms: {
      type: Array,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    getImages(_url) {
      if (_url !== undefined) {
        let _u = _url.substring(7);
        return "https://images.weserv.nl/?url=" + _u;
      }
    },
  },
};
</script>
<style scoped>
.container {
  display: flex;
  margin: 20px;
  height: 250px;
}
.house_image,
.house_image img {
  width: 450px;
  height: 100%;
}
.house_info {
  margin-left: 40px;
  width: 400px;
  text-align: left;
}
.name {
  font-size: 20px;
  color: #333;
  line-height: 20px;
  vertical-align: middle;
  font-weight: 700;
  padding: 0;
}
.type,
.status {
  padding: 6px 7px;
  margin-left: 10px;
  line-height: 12px;
  font-size: 12px;
  color: #fff;
  vertical-align: middle;
  border-radius: 2px;
}
.location {
  margin-top: 26px;
}
.location span {
  font-size: 14px;
  color: #666;
  font-weight: 600;
}
.split {
  margin: 0 8px;
  font-size: 14px;
  color: #ccc;
}
.room,
.area {
  font-size: 14px;
  color: #666;
}
.tag {
  display: inline-block;
  height: 30px;
  margin-right: 10px;
  margin-top: 50px;
  padding: 0 12px;
  line-height: 30px;
  font-size: 12px;
  color: #849aae;
  background-color: rgba(132, 154, 174, 0.1);
}
.house_price {
  margin-left: 80px;
  width: 180px;
  height: 200px;
  text-align: right;
}
.number {
  font-family: Tahoma-Bold;
  font-size: 28px;
  line-height: 28px;
  color: #d44d38;
  vertical-align: bottom;
}
.desc {
  font-family: PingFangSC-Semibold;
  font-size: 14px;
  color: #d44d38;
  vertical-align: bottom;
}
.price {
  margin-top: 10px;
  font-size: 12px;
  color: #666;
  text-align: right;
}
</style> 
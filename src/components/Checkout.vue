<template>
  <div class="checkout fade-in">
    <div>
      <!--  Adding items     -->
      <div v-if="isState('adding')">
        <h2>{{ item.name }}</h2>
        <div class="checkout__image-wrapper">
          <img :src="getMerch(item.imageName)"/>
        </div>
        <div class="checkout__info">
          <div class="checkout__info-quantity">
            <mx-button @click="decrementQt()" class="button-sm">-</mx-button>
            <mx-button @click="incrementQt()" class="button-sm">+</mx-button>
            <div class="ml10">{{ `${qt}` }}ks</div>
          </div>
          <div>{{ item.price * qt }} Kč</div>
        </div>
        <form class="checkout__form mt30">
          <text-input
              class="mt15"
              :model="contact"
              @input="(input)=>{this.contact=input}" name="contact"
              placeholder="E-mail / telefon"/>
          <div class="mt30">
            <textarea-input
                @input="(input)=>{this.note=input}"
                ref="textarea"
                :model="note" class="mt30" placeholder="Poznámka" type="text"/>
          </div>
        </form>
        <div class="checkout__submit-container mt30">
          <mx-button @click="sendOrder()">Objednat</mx-button>
        </div>
      </div>
      <!--  Success     -->
      <div v-if="isState('order-completed')">
        <p class="modal-title">Objedáno!</p>
        <p>Co nejdříve se ti ozveme a domluvíme se na předání :-) </p>
        <mx-button class="button-md" @click="$emit('order-completed')">Super!</mx-button>
      </div>
      <!--  Error-->
      <div v-if="isState('error')">
        <p class="modal-title">Ajaj!</p>
        <p>Něco se pokazilo při odesílání, ale neva. Zavolejte nám nebo napište a domluvíme se ;)</p>
        <address>
          <a class="mt5" href="tel:720999999">720 999 999</a><br>
          <a class="mt5" href="mailto:info@funkymonx.cz">info@funkymonx.cz</a>
        </address>
        <mx-button class="mt25 button-md" @click="$emit('order-completed')">Ok</mx-button>
      </div>
    </div>
  </div>
</template>

<script>
import MxButton from "@/components/buttons/MxButton";
import emailjs from '@emailjs/browser';
import {monxContact, preloaderData} from "@/data/store";
import TextInput from "@/components/form/TextInput";
import TextareaInput from "@/components/form/TextareaInput";
import {emailjsConfig} from "@/data/emailjs";

export default {
  name: "Checkout",
  components: {TextareaInput, TextInput, MxButton},
  props: {item: Object},
  methods: {
    resizeTextArea(event) {
      const textarea = event.target
      textarea.style.height = ''
      textarea.style.height = textarea.scrollHeight + 'px'
    },
    isState(state) {
      return this.state === state
    },
    sendOrder() {
      this.setPreloader(true, "Odesílání objednávky...")
      emailjs.send(
          emailjsConfig.serviceId,
          emailjsConfig.templatesIds.order,
          {contact: this.contact, qt: this.qt, 'item_name': this.item.name, note: this.note},
          emailjsConfig.publicKey)
          .then(() => {
            this.state = 'order-completed'
          }).catch((err) => {
        this.state = 'error'
        console.error(err)
      }).finally(() => {
        this.setPreloader(false, undefined)
      })
    },
    incrementQt() {
      if (this.qt < this.item.qt) {
        this.qt++
      }
    },
    decrementQt() {
      if (this.qt > 0) {
        this.qt--
      }
    },
    getMerch(src) {
      return require(`../assets/merch/${src}`)
    },
    setPreloader(value, description) {
      preloaderData.visible = value
      preloaderData.description = description
    }
  },

  data() {
    return {
      monxContact: monxContact,
      contact: '',
      note: '',
      state: 'adding',
      qt: 1,
    }
  }
}
</script>

<style scoped>
img {
  width: 100%;
}

.checkout {
  padding: 5px 40px 40px;
}

.button-sm {
  width: 30px;
  height: 30px;
}

.button-sm::v-deep.mx-button {
  padding: 0px 5px 5px 5px;
}

.checkout__info {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.checkout__info-quantity {
  display: flex;
  align-items: center;
  font-size: 18px;
}

.label {
  font-size: 16px;
  display: block;
}

.modal-title {
  font-size: 22px;
}

.checkout__image-wrapper {
  max-width: 500px;
  width: 100%;
}

</style>

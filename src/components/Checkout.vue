<template>
  <div class="checkout fade-in">
    <div>
      <!--  Adding items     -->
      <div v-if="isState('adding')">
        <h2>{{ item.name }}</h2>
        <div class="img-container">
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
        <form class="checkout_form mt30">
          <label class="label" for="contact">E-mail / telefon</label>
          <input v-model="contact" class="text-input mt15" name="contact" type="text"/>
          <label class="label mt30" for="note">Poznámka: </label>
          <textarea @input="(event)=>resizeTextArea(event)" ref="textarea" v-model="note"
                    class="textarea text-input mt15" name="note" type="text"/>
        </form>
        <div class="checkout__submit-container mt30">
          <mx-button @click="sendOrder()" aria-disabled="true">Objednat</mx-button>
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
import MxButton from "@/components/MxButton";
import emailjs from '@emailjs/browser';
import {monxContact} from "@/data/store";

export default {
  name: "Checkout",
  components: {MxButton},
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
      emailjs.send('service_fmbevz5', 'template_2jdc37d',
          {contact: this.contact, qt: this.qt, 'item_name': this.item.name, note: this.note}
          , 'pDFIOzS1I02OcfVwO')
          .then(() => {
            this.state = 'order-completed'
          }).catch((err) => {
        this.state = 'error'
        console.error(err)
        this.errorDialogue = true
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

.text-input {
  font-family: RobotoMono-Medium;
  border: none;
  border-bottom: 1px solid white;
  background-color: rgba(0, 0, 0, 0);
  text-align: center;
  width: 100%;
  padding: 0 10px 10px;
  color: white;
  font-size: 20px;
  vertical-align: baseline;
}

.text-input:focus {
  outline: none !important;
  border-bottom: 2px solid #ffbf00;
}

.text-input:hover {
  outline: none !important;
  border-bottom: 2px solid #ffbf00;
}

.textarea {
  font-family: RobotoMono-Medium;
  overflow: hidden;
  margin-top: 10px;
  resize: none;
  background: inherit;
  box-sizing: border-box;
  height: 34px;
}

.modal-title {
  font-size: 22px;
}


.img-container {
  max-width: 500px;
  width: 100%;
}

</style>

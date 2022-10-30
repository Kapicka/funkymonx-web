<template>
  <div>
    <modal v-if="messageState === 'after-message-sent'">
    <div class="dialogue">
        <h3>Zpráva odeslána!</h3>
        <div class="mt30">Co nejdříve se vám ozveme!</div>
        <mx-button class="button-md">Ok</mx-button>
      </div>
    </modal>
    <modal v-if="messageState === 'error'">
      <div class="dialogue">
        <p class="modal-title">Ajaj!</p>
        <p>Něco se při odesílání pokazilo, ale neva. Zavolejte nám nebo napište a domluvíme se ;)</p>
        <address>
          <a class="mt5" href="tel:720999999">720 999 999</a><br>
          <a class="mt5" href="mailto:info@funkymonx.cz">info@funkymonx.cz</a>
        </address>
        <mx-button class="button-md">Ok</mx-button>
      </div>
    </modal>
    <div class="contact fade-in">
      <address class="contact__address">
        <div>
          <div class="contact__address-item">
            <div>Telefon:&nbsp;</div>
            <div><a :href="`tel:${monxContact.phone}`">{{ monxContact.phone }}</a></div>
          </div>
          <div class="contact__address-item mt15">
            <div>E-mail:&nbsp;</div>
            <div><a :href="`mailto:${monxContact.mail}`">{{ monxContact.mail }}</a></div>
          </div>
        </div>
      </address>

      <h3 class="mt100 mt50-mobile">Napište zprávu</h3>
      <form class="contact__message-form">
        <label class="contact__message-label" for="contact">E-mail / telefon</label>
        <input class="text-input mt15" ref="contact" v-model="contact"
               type="text" name="contact"/>
        <label class="contact__message-label mt30" for="message">Vaše zpráva</label>
        <textarea ref="textarea" @input="(event)=>resizeTextArea(event)"
                  v-model="message" class="text-input textarea mt15"
                  name="message"/>
        <div class="checkout__submit-container mt30">
          <mx-button @click="sendOrder()" aria-disabled="true">Odeslat</mx-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import emailjs from "@emailjs/browser";
import MxButton from "@/components/MxButton";
import {monxContact} from '../data/store'
import Modal from "@/components/Modal";

export default {
  name: "Contact",
  components: {
    Modal,
    MxButton
  },
  data() {
    return {
      messageState: 'before-message-sent',
      message: '',
      contact: '',
      monxContact
    }
  },
  methods: {
    resizeTextArea(event) {
      const textarea = event.target
      textarea.style.height = ''
      textarea.style.height = textarea.scrollHeight + 'px'
    },
    sendOrder() {
      emailjs.send('service_fmbevz5', 'template_2jdc37d',
          {contact: this.contact, message: this.message}
          , 'pDFIOzS1I02OcfVwO')
          .then(() => {
            this.messageState = 'after-message-send'
          }).catch((err) => {
        this.messageState = 'error'
        console.error(err)
        this.errorDialogue = true
      })
    },
  }
}
</script>

<style scoped>
.contact__message-label {
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

.a {
  display: block;
}

.text-input:focus {
  outline: none !important;
  border-bottom: 2px solid #ffbf00;
}

.contact__address {
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: left;
}

.contact__address-item {
  display: flex;
  justify-content: center;
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

.dialogue {
  padding: 5px 40px 40px;
}

.text-input:hover {
  outline: none !important;
  border-bottom: 2px solid #ffbf00;
}

@media (max-width: 700px) {
  .mt50-mobile {
    margin-top: 50px
  }

  .contact__message-form {
    text-align: center;
    display: block;
  }
}

</style>

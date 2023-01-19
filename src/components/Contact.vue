<template>
  <div class="contact fade-in">
    <div>
      <address class="contact__address">
        <div class="contact__address-item">
          <div>Telefon:&nbsp;</div>
          <div><a :href="`tel:${monxContact.phone}`">{{ monxContact.phone }}</a></div>
        </div>
        <div class="contact__address-item mt15">
          <div>E-mail:&nbsp;</div>
          <div><a :href="`mailto:${monxContact.mail}`">{{ monxContact.mail }}</a></div>
        </div>
      </address>

      <h3 class="mt100 mt50-mobile">Napište zprávu</h3>
      <form class="contact__message-form">
        <!--        <label class="contact__message-label" for="contact">E-mail / telefon</label>-->
        <div class="contact--short">
          <text-input placeholder="E-mail / telefon"
                      @input="(input)=>{this.contact = input}"
                      :model="contact" class="mt15" ref="contact contact--short"
                      type="text"
                      name="contact"/>
        </div>
        <div class="mt30">
          <textarea-input placeholder="Vaše zpráva" class="mt50" ref="textarea"
                          @input="(input)=>{this.message = input}"
                          :model="message" name="message"/>
        </div>
      </form>
      <div class="mt50">
        <mx-button @click="sendMessage">Odeslat</mx-button>
      </div>
    </div>
    <!--    Modals-->
    <modal v-if="messageState === 'after-message-sent'" :close-button="false">
      <div class="contact__message-status-dialogue">
        <h3>Zpráva odeslána!</h3>
        <div class="mt30">Co nejdříve se vám ozveme!</div>
        <mx-button @click="closeDialogue" class="button-md mt30">Ok</mx-button>
      </div>
    </modal>
    <modal v-if="messageState === 'error'" :close-button="false" @close="closeDialogue">
      <div class="contact__message-status-dialogue">
        <p class="modal-title">Ajaj!</p>
        <p>Něco se při odesílání pokazilo. <br> Zavolejte nám nebo napište a domluvíme se ;)</p>
        <address>
          <a class="mt5" :href="`tel:${monxContact.phone}`">{{ monxContact.phone }}</a><br>
          <a class="mt5" :href="`mailto:${monxContact.mail}}`">{{ monxContact.mail }}</a>
        </address>
        <mx-button @click="closeDialogue" class="button-md mt30">Ok</mx-button>
      </div>
    </modal>
  </div>
</template>

<script>
import MxButton from "@/components/buttons/MxButton";
import emailjs from '@emailjs/browser';
import {monxContact, preloaderData} from '../data/store'
import Modal from "@/components/Modal";
import TextInput from "@/components/form/TextInput";
import TextareaInput from "@/components/form/TextareaInput";
import {emailjsConfig} from "@/data/emailjs";

export default {
  name: "Contact",
  metaInfo: {
    title: 'Kontakt | Funky Monx'
  },
  components: {
    TextareaInput,
    TextInput,
    Modal,
    MxButton
  },
  data() {
    return {
      messageState: 'before-message-sent',
      message: '',
      contact: '',
      monxContact,
    }
  },
  methods: {
    validateForm() {
      console.log(!this.message.length || !this.contact.length)
      return !this.message.length || !this.contact.length
    },
    closeDialogue() {
      this.messageState = 'before-message-sent'
    },
    sendMessage() {
      const message = 'Zpráva:<br><br>' + this.message.replaceAll('\n', '<br>')
      const subject = `Zpráva od: ${this.contact}`
      this.messageState = 'sending-message'
      emailjs.send(
          emailjsConfig.serviceId,
          emailjsConfig.templatesIds.generic,
          {subject, row1: message},
          emailjsConfig.publicKey)
          .then(() => {
            this.messageState = 'after-message-sent'
          }).catch((err) => {
        this.messageState = 'error'
        console.error(err)
      })
    },
  },
  watch: {
    messageState() {
      if (this.messageState === 'after-message-sent') {
        preloaderData.visible = false
        preloaderData.description = undefined
      }
      if (this.messageState === 'sending-message') {
        preloaderData.visible = true
        preloaderData.description = 'Odesílání zprávy...'
      }
    }
  },
}
</script>

<style scoped>

.contact {
  max-width: 500px;
  width: 100%;
}

.contact__address {
  width: 100%;
  text-align: left;
}

.contact__address-item {
  display: flex;
  justify-content: center;
}


.contact__message-status-dialogue {
  margin-top: 15px;
  padding: 5px 40px 40px;
}

.contact--short {
  padding-right: 90px;
  padding-left: 90px;
}


@media (max-width: 700px) {
  .mt50-mobile {
    margin-top: 50px
  }

  .contact--short {
    padding: 0;
  }

  .contact__message-form {
    flex-direction: column;
    display: flex;
    justify-items: center;
    text-align: center;
  }
}
</style>

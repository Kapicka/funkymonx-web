<template>
  <div>
    <modal @close="$emit('close')" v-if="isState('before-submit')">
      <div class="subscribe-dialogue">
        <div>
          <p>Sledujte dění naší kapely!</p>
          <p>Přidejte se do whats up skupiny pomocí odkazu <a :href="monxContact.whatsUp"><b>zde</b></a> anebo nám
            pošlete své
            číslo a my Vás přidáme!</p>
          <form class="contact__input-wrapper">
            <text-input :model="phone" @input="(input)=>this.phone=input" placeholder="Telefon" name="contact"/>
          </form>
          <mx-button @click="subscribe" class="mt20">Odeslat!</mx-button>
        </div>
      </div>
    </modal>

    <modal :close-button="false" v-if="isState('after-submit')">
      <div class="subscribe-dialogue pt10">
        <div class="subscribe-dialogue__content">
          <p>Odesláno!</p>
          <p>Co nejdříve Vás přidáme do skupiny!</p>
          <mx-button @click="()=>$emit('close')" class="mt20 button-md">Ok</mx-button>
        </div>
      </div>
    </modal>

    <modal :close-button="false" v-if="isState('error')">
      <div class="subscribe-dialogue pt10">
        <div class="subscribe-dialogue__content" v-if="isState('error')">
          <p class="modal-title">Ajaj!</p>
          <p>Něco se při odesílání pokazilo. <br> Zavolejte nám nebo napište a domluvíme se ;)</p>
          <address>
            <a class="mt5" :href="`tel:${monxContact.phone}`">{{ monxContact.phone }}</a><br>
            <a class="mt5" :href="`mailto:${monxContact.mail}}`">{{ monxContact.mail }}</a>
          </address>
          <mx-button @click="()=>$emit('close')" class="button-md mt20">Ok</mx-button>
        </div>
      </div>
    </modal>

  </div>
</template>

<script>
import TextInput from "@/components/form/TextInput";
import Modal from "@/components/Modal";
import MxButton from "@/components/buttons/MxButton";
import {monxContact} from "@/data/contact";
import emailjs from "@emailjs/browser";
import {emailjsConfig} from "@/data/emailjs";

export default {
  name: "SubscribeDialogue",
  components: {
    MxButton,
    TextInput,
    Modal,
  },
  methods: {
    subscribe() {
      const body = `Kontakt: ${this.phone}`
      const subject = `Přidání do WP skupiny: ${this.phone}`
      emailjs.send(
          emailjsConfig.serviceId,
          emailjsConfig.templatesIds.generic,
          {subject, row1: body},
          emailjsConfig.publicKey)
          .then(() => {
            this.state= 'after-submit'
          }).catch((err) => {
        this.state= 'error'
        console.error(err)
      })
    },
    isState(state) {
      return this.state === state;
    }
  },
  data() {
    return {
      phone: '',
      monxContact,
      state: 'before-submit'
    }
  }
}
</script>

<style scoped>
.subscribe-dialogue {
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  max-width: 500px;
}

.contact__input-wrapper {
  display: flex;
  justify-content: center;
  padding-left: 40px;
  padding-right: 40px;
}

.subscribe-dialogue__content {
  padding-left: 20px;
  padding-right: 20px;
}

@media (max-width: 700px) {
  .subscribe-dialogue__content {
    padding-left: 10px;
    padding-right: 10px;
  }

}
</style>
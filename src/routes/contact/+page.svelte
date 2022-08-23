<script lang="ts">
  import Message from "../../Components/Message.svelte";

  let error: any = "";
  let message: any = "";

  let name: string;
  let email: string;
  let userMessage: string;

  const submitForm = async () => {
    try {
      const submit = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
          message: userMessage,
        }),
      });

      message = await submit.json();
    } catch (err) {
      error = err;
    }

    name = '';
    email = '';
    userMessage = '';
  };
</script>

<div class="message-container">
  {#if message}
    <Message
      message="Contact submitted successfully!"
      messageType="success-msg"
    />
  {:else if error}
    <Message
      message="There has been an error. Submiting failed!"
      messageType="error-msg"
    />
  {/if}
</div>

<form
  on:submit|preventDefault={submitForm}
  class="contact-form"
  id="contact-form"
>
  <div class="title">
    <h2>CONTACT US</h2>
  </div>
  <div class="half">
    <div class="item">
      <label for="name">NAME</label>
      <input type="text" id="name" name="name" bind:value={name} required />
    </div>
    <div class="item">
      <label for="email">EMAIL</label>
      <input type="text" id="email" name="email" bind:value={email} required />
    </div>
  </div>
  <div class="full">
    <label for="message">MESSAGE</label>
    <textarea name="message" id="message" bind:value={userMessage} required />
  </div>
  <div class="action">
    <input type="submit" value="SEND MESSAGE" />
  </div>
</form>

<style>

  .message-container{
    width: 50rem;
    max-width: 97%;
    margin: 50px auto;
  }

  .contact-form {
    background: var(--secondary-color);
    width: 50rem;
    margin: 50px auto;
    max-width: 97%;
    border-radius: 4px;
    padding: 55px 30px;
  }

  .contact-form .title h2 {
    letter-spacing: 6px;
    border-bottom: 1px solid var(--primary-text-color);
    display: inline-block;
    padding-bottom: 8px;
    margin-bottom: 32px;
    color: var(--primary-text-color);
  }

  .contact-form .half {
    display: flex;
    justify-content: space-between;
  }

  .contact-form .half .item {
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
    width: 48%;
  }

  .contact-form label {
    display: block;
    font-size: 13px;
    letter-spacing: 3.5px;
    margin-bottom: 16px;
    color: var(--primary-text-color);
  }

  .contact-form .half .item input {
    border-radius: 4px;
    border: 1px solid white;
    outline: 0;
    padding: 16px;
    width: 100%;
    height: 44px;
    background: var(--tertiary-color);
    font-size: 17px;
  }

  .contact-form .full {
    margin-bottom: 24px;
  }

  .contact-form .full textarea {
    background: var(--tertiary-color);
    border-radius: 4px;
    border: 1px solid white;
    outline: 0;
    padding: 12px 16px;
    width: 100%;
    height: 200px;
    font-size: 17px;
  }

  .contact-form .action {
    margin-bottom: 32px;
  }

  .contact-form .action input {
    border-radius: 4px;
    border: 1px solid white;
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
    height: 44px;
    letter-spacing: 3px;
    outline: 0;
    padding: 0 20px 0 22px;
    margin-right: 10px;
  }

  .contact-form .action input[type="submit"] {
    background: var(--accent-color);
    color: var(--secondary-text-color);
  }

  @media screen and (max-width: 620px) {
    .contact-form .half {
      flex-direction: column;
    }
    .contact-form .half .item {
      width: 100%;
    }
    .contact-form .action {
      display: flex;
      flex-direction: column;
    }
    .contact-form .action input {
      margin-bottom: 10px;
      width: 100%;
    }
  }
</style>

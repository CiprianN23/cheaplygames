
<main>
  <section class="stores">
    <div class="card">
      <div class="card__image-container">
        <img
        src="https://www.cheapshark.com/img/stores/banners/10.png"
        alt="Steam"
        />
      </div>
      <div class="card__content">
        <p class="card__title text--medium">
          Here's the Title of an Awesome Course
        </p>
        <div class="card__info">
          <p class="text--medium">30 Min</p>
          <p class="card__price text--medium">Free</p>
        </div>
      </div>
    </div>
  </section>
</main>


<style>
  .card {
    grid-column-end: span 4;
    display: flex;
    flex-direction: column;
    background-color: #39393b;
    cursor: pointer;
    transition: all 0.3s ease 0s;
  }

  .card:hover {
    transform: translateY(-7px);
  }

  .card__image-container {
    width: 100%;
    padding-top: 56.25%;
    overflow: hidden;
    position: relative;
  }

  .card__image-container img {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .card__content {
    padding: 20px;
  }

  .card__title {
    margin-bottom: 20px;
  }

  .card__info {
    display: flex;
    align-self: end;
    align-items: center;
  }

  .card__price {
    margin-left: auto;
    padding: 5px 20px;
    background-color: #303032;
    border-radius: 20px;
  }
  .card {
    grid-column-end: span 4;
    display: flex;
    flex-direction: column;
    background-color: #39393b;
    cursor: pointer;
    transition: all 0.3s ease 0s;
  }

  .card:hover {
    transform: translateY(-7px);
  }

  .card__image-container {
    width: 100%;
    padding-top: 56.25%;
    overflow: hidden;
    position: relative;
  }

  .card__image-container img {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .card__content {
    padding: 20px;
  }

  .card__title {
    margin-bottom: 20px;
  }

  .card__info {
    display: flex;
    align-self: end;
    align-items: center;
  }

  .card__price {
    margin-left: auto;
    padding: 5px 20px;
    background-color: #303032;
    border-radius: 20px;
  }

  main {
    display: grid;
    grid-template-columns: 1fr repeat(12, minmax(auto, 60px)) 1fr;
    grid-gap: 40px;
    padding: 60px 0;
  }

  .stores {
    grid-column: 2 / span 12;
    display: grid;
    grid-template-columns: repeat(12, minmax(auto, 60px));
    grid-gap: 40px;
  }

  @media only screen and (max-width: 1000px) {
    .card {
      grid-column-end: span 6;
    }
  }
  @media only screen and (max-width: 700px) {
    .card {
      grid-column-end: span 12;
    }

    main {
      grid-gap: 20px;
    }
  }

  @media only screen and (max-width: 500px) {
    .card {
      grid-column-end: span 6;
    }

    main {
      grid-template-columns: 10px repeat(6, 1fr) 10px;
      grid-gap: 10px;
    }
    .stores {
      grid-column: 2 / span 6;
      grid-template-columns: repeat(6, 1fr);
      grid-gap: 20px;
    }
  }
</style>

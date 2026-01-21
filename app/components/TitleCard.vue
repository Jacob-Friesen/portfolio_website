<style>
  .title {
    text-align: center;
    font-size: 32px;
    font-weight: 400;
    margin: 32px 0;
  }

  .card-side-by-side {
    display: flex;
    justify-content: center;
  }

  .profile-image {
    width: 200px;
    height: 154px;
    border-radius: 8px;
  }

  .description {
    display: flex;
    align-items: center;
    width: 600px;
    padding: 0 32px;
  }

  @media (max-width: 1023px) {
    .title {
      padding: 0 32px;
    }

    .card-side-by-side {
      flex-wrap: wrap;
    }

    .description {
      width: 100%;
      padding-top: 32px;
    }
  }
</style>

<template>
  <h1 class="title">Jacob Friesen - Software Developer</h1>

  <div class="card-side-by-side">
    <img class="profile-image" src="/jacob-friesen-profile.jpg"></img>

    <div class="description">
      <p>
        I am a software developer with over 10 years of experience. I have deep experience in client side, server
        side and phone environments. I have worked in many different environments over the years ranging from startups,
        to the government to large companies. Alongside this I have worked as a back end, front end and full stack
        developer. One highlight is scaling the startup Zimit's software from no product to a $90 million exit in five years.
      </p>
    </div>
  </div>
</template>
<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .main {
    //background-color: salmon;
    width: 800px;
    font-family: helvetica, verdana, arial;
  }

  p {
    margin: 0;
    padding: 0;
  }
</style>

<template>
  <div class="container">
    <div class="main">
      <TitleCard />

      <Links />



      <!-- <NuxtWelcome /> -->
      <!-- <Hello /> -->
      <hr/>
      <Resume />
      <!-- <ZipDownloadTest /> -->
    </div>
  </div>
</template>
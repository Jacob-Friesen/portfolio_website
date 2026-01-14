<style>
  body {
    margin: 0;
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f9f9f9;
  }

  .main {
    //background-color: salmon;
    width: 800px;
    font-family: helvetica, verdana, arial;

    background-color: white;
    border-right: 1px solid #ccc;
    border-left: 1px solid #ccc;
    padding: 0 32px;
    box-shadow: 0 0 8px #ccc;
  }

  p {
    margin: 0;
    padding: 0;
  }

  hr {
    border: none;
    border-top: 1px solid #aaa;
    margin: 0;
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
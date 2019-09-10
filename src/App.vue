<template>
  <div id="app" class="pokedex-wrapper">
    <header class="pokedex-header">
      <div class="bubble-blue"></div>
      <div class="bubble-red"></div>
      <div class="bubble-yellow"></div>
      <div class="bubble-green"></div>
      <div class="block1"></div>
      <div class="block2"></div>
      <div class="block3"></div>
      <!-- <button
        type="button"
        class="settings-trigger"
        :class="{ active: settingsOpened }"
        @click="onSettingsTrigger">
        <font-awesome-icon icon="cog"/>
      </button> -->
    </header>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <main class="pokedex">
      <div class="content">
        <router-view/>
      </div>
    </main>
  </div>
</template>

<style lang="scss">

#app {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.pokedex-wrapper {
  display: flex;
  flex-flow: column;
  height: 100%;
}
.pokedex-header {
  background: $pokedex-red;
  flex-shrink: 0;
  height: 100px;
  overflow: hidden;
  position: relative;
  .bubble-blue {
    background: $pokedex-blue;
    border: 4px solid #fff;
    border-radius: 50%;
    height: 55px;
    left: 15px;
    position: absolute;
    top: 15px;
    width: 55px;
  }
  .bubble-red, .bubble-yellow, .bubble-green {
    border-radius: 50%;
    height: 12px;
    position: absolute;
    top: 20px;
    width: 12px;
  }
  .bubble-red {
    background: rgba(255, 0, 0, 0.6);
    left: 90px;
  }
  .bubble-yellow {
    background: rgba(255, 255, 0, 0.65);
    left: 115px;
  }
  .bubble-green {
    background: rgba(0, 255, 0, 0.6);
    left: 140px;
  }
  .block1, .block2, .block3 {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 0;
  }
  .block1 {
    height: 86px;
    left: 0;
    width: 115px;
  }
  .block2 {
    height: 69px;
    left: 87px;
    transform: rotate(-36deg);
    width: 80px;
  }
  .block3 {
    height: 39px;
    left: 179px;
    width: 650px;
  }
  .settings-trigger {
    background: none;
    border: 0;
    
    cursor: pointer;
    font-size: 20px;
    position: absolute;
    top: 3px;
    right: 10px;
    &:hover, &.active {
      .svg-inline--fa {
        color: rgba(0, 0, 0, 0.70);
      }
    }
    .svg-inline--fa {
      color: rgba(0, 0, 0, 0.40);
    }
  }
}
.pokedex {
  background: $pokedex-red;
  flex: 1;
  overflow: hidden;
  padding: 10px;
}
.content {
  background: #fff;
  height: 100%;
  overflow: auto;
}
</style>

<template>
    <div class="page-loader">
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
    </div> 
  </template>
  
  <script>
    export default {}
  </script>
  
  <style lang="scss" scoped>
     $colors: #184a79, #3ea8e0, #2246b9, #45b2b9;
    // -----------------------------------------------------
    .page-loader {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      left: 45%;
      top: 25%;
    }
    // -----------------------------------------------------
    .cube{
      width: 40px;
      height: 40px;
      margin-right: 10px;
      @for $i from 1 through length($colors) {
        &:nth-child(#{$i}) {
          background-color: nth($colors, $i);
        }
      }
      &:first-child {
        animation: left 1s infinite;
      }
      &:last-child {
        animation: right 1s infinite .5s;
      }
    }
    // -----------------------------------------------------
    @keyframes left {
      40% {
        transform: translateX(-60px);
      }
      50% {
        transform: translateX(0);      
      }
    }
    @keyframes right {
      40% {
        transform: translateX(60px);
      }
      50% {
        transform: translateX(0);
      }
    }
  </style>
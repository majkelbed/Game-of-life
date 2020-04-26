<script lang="typescript">

export let alive = false;

function toggleAlive() {
  alive = !alive;
}

</script>

<svg on:click={toggleAlive} viewBox="0 0 4 4" xmlns="http://www.w3.org/2000/svg">
  <circle cx="2" cy="2" r="2" fill="{alive ? "#ddd" : "#a84"}"/>
</svg>
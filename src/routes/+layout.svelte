<script>
	import Navbar from '$components/Navbar.svelte';
	import '../app.postcss';
</script>

<nav class="container h-16 flex items-center">
	<Navbar />
</nav>
<main class="container p-6 min-h-screen">
	<slot />
</main>

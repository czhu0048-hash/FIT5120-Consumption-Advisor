<script setup>
import WHomeHero from '@/components/WHomeHero.vue'
import WHomeFeatures from '@/components/WHomeFeatures.vue'
import WHomeHowItWorks from '@/components/WHomeHowItWorks.vue'
import WHomeImpact from '@/components/WHomeImpact.vue'
import WHomeClosing from '@/components/WHomeClosing.vue'

function scrollToHow() {
  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
	<div :class="$style.welcomepageParent">
		<div :class="$style.welcomepage">
			<div :class="$style.div">
				<div :class="$style.main">
          <!-- ── New hero section ── -->
          <WHomeHero @scrollDown="scrollToHow" />

          <!-- ── Feature cards section ── -->
          <WHomeFeatures />

				</div>

				<!-- ── Impact stats banner ── -->
				<WHomeImpact />

          <!-- ── How it works ── -->
          <WHomeHowItWorks />

          <!-- ── Closing banner ── -->
          <WHomeClosing />
			</div>
		</div>
	</div>
</template>

<style module>
.welcomepageParent {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	color: #2e2f35;
	font-family: Inter;
	overflow-x: hidden;
}

.welcomepage {
	width: 100%;
	min-height: 100vh;
	background-color: #f4fdf9;
	display: flex;
	flex-direction: column;
}

.div {
	width: 100%;
	display: flex;
	flex-direction: column;
	background-color: #f4fdf9;
}

.main {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
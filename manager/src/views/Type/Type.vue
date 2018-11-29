<template>
    <div class="type">
        <Navigation />
        <h1>Types</h1>
        <div class='table-wrap'>
			<div>
				<button>Types</button>
				<button>Type Matrix</button>
			</div>
		</div>
        <div>
            <div class="typeList">
            </div>
            <div class="typeMatrix">
                <TypeMatrix />
            </div>
        </div>
    </div>
</template>
<script>
    import Navigation from '@/components/Navigation';
    import TypeMatrix from '@/components/TypeMatrix';
    export default{
        name: 'Type',
        components: {
            TypeMatrix
        },
        data() {
            return {
                currentView: 'Types'
            }
        }
    }
</script>
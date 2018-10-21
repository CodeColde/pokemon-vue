import Api from '@/services/Api'

export default {
	fetchPokemon() {
		return Api().get('pokemon')
	},

	addPokemon(params) {
		return Api().post('pokemon', params)
	},

	updatePokemon (params) {
		return Api().put('pokemon/' + params.id, params)
	},

	getPokemon (params) {
		return Api().get('pokemon/' + params.id)
	},

	deletePokemon (id) {
		return Api().delete('pokemon/' + id)
	}
}
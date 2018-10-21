import Api from '@/services/Api'

export default {
	fetchPokemon() {
		return Api().get('pokemon')
	},
	getPokemon (params) {
		return Api().get('pokemon/' + params.id)
	},
}
import Api from '@/services/Api'

export default {
	fetchTypes() {
		return Api().get("types")
	},

	addType(params) {
		return Api().post('type', params)
	},

	updateType (params) {
		return Api().put('type/' + params.id, params)
	},

	getType (params) {
		return Api().get('type/' + params.id)
	},

	deleteType (id) {
		return Api().delete('type/' + id)
	}
}
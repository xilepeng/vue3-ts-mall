import { getTopCategoryAPI } from '@/apis/category'
import { useRoute, onBeforeRouteUpdate } from "vue-router";


export function useCategory () {
	const categoryData = ref({});
const route = useRoute();
const getCategory = async (id: any) => {
    const { result } = await getTopCategoryAPI(id);
    categoryData.value = result;
}

onMounted(() => getCategory(route.params.id));

onBeforeRouteUpdate((to) => {
    getCategory(to.params.id)
})

return { categoryData }

}

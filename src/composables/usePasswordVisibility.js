import { ref } from 'vue';

export const usePasswordVisibility = (initialState = [false]) => {
    const passwordVisible = ref([...initialState]);
    const togglePasswordVisibility = (index) => {
        passwordVisible.value[index] = !passwordVisible.value[index];
    };

    return {
        passwordVisible,
        togglePasswordVisibility,
    };
};

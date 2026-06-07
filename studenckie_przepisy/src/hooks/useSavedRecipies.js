import useLocalStorageState from 'use-local-storage-state'


const useSavedRecipies = () => {
    const [savedRecipies, setSavedRecipies] = useLocalStorageState('savedRecipies', {
        defaultValue: []
    })

    const toggleIsSavedRecipe = (recipeId) => {
        const isSavedRecipe = savedRecipies.includes(recipeId);
        if (isSavedRecipe) {
            // remove from savedRecipies
            setSavedRecipies(savedRecipies => savedRecipies.filter(favouriteId => favouriteId !== recipeId))
        } else {
            // add to savedRecipies
            setSavedRecipies(savedRecipies => [...savedRecipies, recipeId])
        }

    }
    const isSavedRecipe = (recipeId) => savedRecipies.includes(recipeId);

    return {savedRecipies, isSavedRecipe, toggleIsSavedRecipe}
}

export default useSavedRecipies
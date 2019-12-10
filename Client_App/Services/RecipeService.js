import {
  baseURL,
  instance,
  handleError,
  authHeader,
  setHeader,
} from './BaseService';
export async function getRecipe(id) {
  try {
    console.log(authHeader);
    const result = await instance.get(
      `${baseURL}/api/recipe/getrecipe?id=${id}`,
      authHeader,
    );
    if (result) {
      console.log(typeof result.data);
      return result.data;
    }
  } catch (err) {
    handleError(err);
  }
}
export async function getRecipeOfTheWeek(groupid) {
  try {
    console.log(authHeader);
    const result = await instance.get(
      `${baseURL}/api/recipe/getrecipeofweek?groupid=${groupid}`,
      authHeader,
    );
    if (result) {
      console.log(typeof result.data);
      return result.data;
    }
  } catch (err) {
    handleError(err);
  }
}
export async function getGroupRecipes(groupid) {
  try {
    console.log(authHeader);
    const result = await instance.get(
      `${baseURL}/api/recipe/getGroupRecipes?groupid=${groupid}`,
      {},
      authHeader,
    );
    if (result) {
      console.log(typeof result.data);
      return JSON.parse(result.data);
    }
  } catch (err) {
    handleError(err);
  }
}

export async function getComments(groupid) {
  try {
    console.log(authHeader);
    const result = await instance.get(
      `${baseURL}/api/recipe/getComments?groupid=${groupid}`,
      authHeader,
    );
    if (result) {
      console.log(typeof result.data);
      return result.data;
    }
  } catch (err) {
    handleError(err);
  }
}
export async function getAllRecipes(groupid) {
  try {
    console.log(authHeader);
    const result = await instance.get(
      `${baseURL}/api/recipe/getAllRecipes?groupid=${groupid}`,
      authHeader,
    );
    if (result) {
      console.log(typeof result.data);
      return JSON.parse(result.data);
    }
  } catch (err) {
    handleError(err);
  }
}

export async function specialRecipeChangeNoGroupChange(groupId, recipeId) {
  try {
    await instance.put(
      `${baseURL}/api/recipe/specialRecipeChangeNoGroupChange/${groupId}/${recipeId}`,
      {},
      authHeader,
    );
    return true;
  } catch (err) {
    handleError(err);
  }
}
export async function specialRecipeChangeNewRecipe(groupId, recipeId) {
  try {
    const result = await instance.post(
      `${baseURL}/api/recipe/specialRecipeChangeNewRecipe`,
      {
        groupId: groupId,
        recipeId: recipeId,
      },
      authHeader,
    );
    if (result) {
      console.log(result);
      setHeader(result.data.token);
      return result.data;
    }
  } catch (err) {
    handleError(err);
  }
}
export async function NewGroupRecipe(groupId, recipeId) {
  try {
    const result = await instance.post(
      `${baseURL}/api/recipe/NewGroupRecipe`,
      {
        groupId: groupId,
        recipeId: recipeId,
      },
      authHeader,
    );
    if (result) {
      console.log(result);
      setHeader(result.data.token);
      return result.data;
    }
  } catch (err) {
    handleError(err);
  }
}
export async function DeleteGroupRecipe(groupId, recipeId) {
  try {
    await instance.delete(
      `${baseURL}/api/recipe/DeleteGroupRecipe/${groupId}/${recipeId}`,
      authHeader,
    );

    return true;
  } catch (err) {
    handleError(err);
  }
}
export async function addRating(userId, recipeId, comment, rating) {
  try {
    const result = await instance.post(
      `${baseURL}/api/recipe/addRating`,
      {
        UserId: userId,
        RecipeId: recipeId,
        Comment: comment,
        Rating: rating,
      },
      authHeader,
    );
    return true;
  } catch (err) {
    handleError(err);
  }
}

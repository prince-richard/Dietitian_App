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

/* eslint-disable no-console */
import ResourcesAPI from '../api/resources-api';

const resourcesAPI = new ResourcesAPI();

export const getResourceByPath = async (path?: string) => {
  try {
    await resourcesAPI.getResource(path);
  } catch (err) {
    console.log(err);
  }
};

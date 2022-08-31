import { request } from '@strapi/helper-plugin';
const DeploymentApiHandler = {
  getAllDeployments: async () => {
    return await request('/deploybot/getall', {
      method: 'GET',
    });
  },
  addDeployment: async () => {
    return await request(`/deploybot/create`, {
      method: 'POST',
      body: {},
    });
  },
  reDeployment: async (id) => {
    return await request(`/deploybot/redeploy/${id}`, {
      method: 'PUT',
    });
  },
  markDeployment: async (id, status) => {
    return await request(`/deploybot/${id}/mark/${status}`, {
      method: 'PUT',
    });
  },
};
export default DeploymentApiHandler;

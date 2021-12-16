import axios from "axios";

let token: string | null = null;
let projectId: string | null = null;

/**
 * Init SDK
 * @param projectID vercel project id
 * @param Token vercel access token
 */
export const Init = (projectID: string, Token: string) => {
  token = Token;
  projectId = projectID;
};

/**
 * Add new domain to project
 * @param name domain name
 * @param gitBranch Git branch to link the project domain
 * @param redirect Target destination domain for redirect
 * @param redirectStatusCode Status code for domain redirect
 */
export const VercelAddDomain = async (
  name: string,
  gitBranch: string | undefined = undefined,
  redirect: string | undefined = undefined,
  redirectStatusCode: string | undefined = undefined
) => {
  try {
    if (!projectId || !token) {
      return { errorMessages: "Please Init first" };
    }
    const { data } = await axios({
      method: "POST",
      url: `https://api.vercel.com/v8/projects/${projectId}/domains`,
      data: { name, gitBranch, redirect, redirectStatusCode },
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
    });

    return { data };
  } catch (error: any) {
    return {
      errorMessages: error.response?.data.error.message || error.message,
    };
  }
};

/**
 * get all domain from project
 */
export const VercelGetDomains = async () => {
  try {
    if (!projectId || !token) {
      return { errorMessages: "Please Init first" };
    }
    const { data } = await axios({
      method: "GET",
      url: `https://api.vercel.com/v8/projects/${projectId}/domains`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
    });

    return { domains: data.domains };
  } catch (error: any) {
    return { errorMessages: error.message };
  }
};

/**
 * Update domain to project
 * @param name domain name
 * @param gitBranch Git branch to link the project domain
 * @param redirect Target destination domain for redirect
 * @param redirectStatusCode Status code for domain redirect
 */
export const VercelUpdateDomain = async (
  domain: string,
  gitBranch: string | undefined = undefined,
  redirect: string | undefined = undefined,
  redirectStatusCode: string | undefined = undefined
) => {
  try {
    if (!projectId || !token) {
      return { errorMessages: "Please Init first" };
    }
    const { data } = await axios({
      method: "PATCH",
      url: `https://api.vercel.com/v8/projects/${projectId}/domains/${domain}`,
      data: {
        gitBranch,
        redirect,
        redirectStatusCode,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
    });

    return { domains: data.domains };
  } catch (error: any) {
    console.error(error.response);
    return {
      errorMessages: error.response?.data.error.message || error.message,
    };
  }
};

/**
 * Delete domain from project
 * @param name domain name
 */
export const VercelDeleteDomain = async (domain: string) => {
  try {
    if (!projectId || !token) {
      return { errorMessages: "Please Init first" };
    }
    const { data } = await axios({
      method: "DELETE",
      url: `https://api.vercel.com/v8/projects/${projectId}/domains/${domain}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
    });

    return { data };
  } catch (error: any) {
    console.error(error.response);
    return {
      errorMessages: error.response?.data.error.message || error.message,
    };
  }
};

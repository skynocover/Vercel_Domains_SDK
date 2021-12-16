/**
 * Init SDK
 * @param projectID vercel project id
 * @param Token vercel access token
 */
export declare const Init: (projectID: string, Token: string) => void;
/**
 * Add new domain to project
 * @param name domain name
 * @param gitBranch Git branch to link the project domain
 * @param redirect Target destination domain for redirect
 * @param redirectStatusCode Status code for domain redirect
 */
export declare const VercelAddDomain: (name: string, gitBranch?: string | undefined, redirect?: string | undefined, redirectStatusCode?: string | undefined) => Promise<{
    data: any;
    errorMessages?: undefined;
} | {
    errorMessages: any;
    data?: undefined;
}>;
/**
 * get all domain from project
 */
export declare const VercelGetDomains: () => Promise<{
    domains: any;
    errorMessages?: undefined;
} | {
    errorMessages: any;
    domains?: undefined;
}>;
/**
 * Update domain to project
 * @param name domain name
 * @param gitBranch Git branch to link the project domain
 * @param redirect Target destination domain for redirect
 * @param redirectStatusCode Status code for domain redirect
 */
export declare const VercelUpdateDomain: (domain: string, gitBranch?: string | undefined, redirect?: string | undefined, redirectStatusCode?: string | undefined) => Promise<{
    domains: any;
    errorMessages?: undefined;
} | {
    errorMessages: any;
    domains?: undefined;
}>;
/**
 * Delete domain from project
 * @param name domain name
 */
export declare const VercelDeleteDomain: (domain: string) => Promise<{
    data: any;
    errorMessages?: undefined;
} | {
    errorMessages: any;
    data?: undefined;
}>;

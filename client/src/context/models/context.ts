export interface Context {
    userId?: number | null;
    userName?: string | null;
    token?: string | null;
    isAuthenticated: boolean;
    login?: (id: number, name: string, jwtToken: string) => void;
    logout(): void,
    changeIsLoading(value: boolean): void,
}

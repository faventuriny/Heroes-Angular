import { Hero } from "./hero";

export interface Trainer {
    name: string,
    password: string;
    email: string;
    heroesList?: Hero[];
    id?: string;
}

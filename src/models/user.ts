export class User {
    id: string;
    username: string;
    rank: Rank
}

export enum Rank {
    GRAY = "GRAY",
    PURPLE = "PURPLE",
    BLUE = "BLUE",
    GREEN = "GREEN",
    YELLOW = "YELLOW",
    ORANGE = "ORANGE",
    RED = "RED"
}

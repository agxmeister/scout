import {uniqueNamesGenerator, adjectives, colors, animals} from "unique-names-generator";

export function generatePageName(): string {
    return uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
        separator: '-',
        length: 3,
        style: 'lowerCase'
    });
}

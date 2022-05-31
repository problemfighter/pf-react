export default class StringUtil {

    public static capitalize(word: string) {
        return word.charAt(0).toUpperCase() + word.substring(1);
    }

    public static camelCaseToHumanReadable(text: string) {
        let words = text.match(/[A-Za-z][a-z]*/g) || [];
        return words.map(this.capitalize).join(" ");
    }

    public static smallFirstLatter(word: string) {
        return word.charAt(0).toLowerCase() + word.slice(1);
    }

    public static capitalizeFirstLetter(word: string) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    public static camelCaseTo(text: string, char: string = "_") {
        return text.replace(/[A-Z]/g, letter => char + letter);
    }

    public static findReplace(text: string, find: string, replace: string) {
        return text.replace(find, replace);
    }

}
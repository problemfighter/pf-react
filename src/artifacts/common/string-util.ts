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
        return text.replaceAll(/[A-Z]/g, letter => char + letter);
    }

    public static splitCamelCaseToSpace(text: string) {
        text = text.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1");
        text = this.containSingleSpace(text)
        return text.trim()
    }

    public static containSingleSpace(text: string) {
        return text.replace(/ +(?= )/g, '');
    }

    public static replaceMoreThanOneOccurrence(text: string, char: any, replace: any = undefined, regex: any = undefined) {
        if (!regex) {
            regex = char
        }
        regex += "{2,}"
        if (!replace) {
            replace = char
        }
        let re = new RegExp(regex, "g");
        return text.replace(re, replace);
    }

    public static findReplace(text: string, find: string, replace: string) {
        let findRegex = new RegExp(find, 'g');
        return text.replaceAll(findRegex, replace);
    }

}
export default class PersonName {
    constructor(name) {
        this.name = name;
    }

    get words() {
        return this.name.split(' ');
    }
    
    get firstNames() {
        return this.words.slice(0, -1).join(' ');
    }
    get lastName() {
        return this.name.split(' ').slice(-1)[0];
    }

    static cmp(nameA, nameB) {
        const personNameA = new PersonName(nameA);
        const personNameB = new PersonName(nameB);
        if (personNameA.lastName === personNameB.lastName) {
            return personNameA.firstNames.localeCompare(personNameB.firstNames);
        }
        return personNameA.lastName.localeCompare(personNameB.lastName);
    }

}
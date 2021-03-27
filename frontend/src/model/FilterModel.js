export default class FilterModel {
    id;
    description;
    name

    constructor({id, description, name}) {
        this.id = id;
        this.description = description;
        this.name = name;
    }
}
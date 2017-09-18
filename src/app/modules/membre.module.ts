import {RoleModule} from './role.module';

export class MembreModule {
    private _id: string;
    private _name: string;
    private _role: RoleModule;

    constructor(id: string, name: string, role: RoleModule) {
        this._id = id;
        this._name = name;
        this._role = role;
    }

    getMembre() {
        return this;
    }

    getRole() {
        return this._role;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get role(): RoleModule {
        return this._role;
    }

    set role(value: RoleModule) {
        this._role = value;
    }
}

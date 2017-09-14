import {RoleModule} from './role.module';

export class MembreModule {
  private id: string;
  private name: string;
  private role: RoleModule;

  constructor(id: string, name: string, role: RoleModule) {
    this.id = id;
    this.name = name;
    this.role = role;
  }

  getMembre() {
    return this;
  }
}

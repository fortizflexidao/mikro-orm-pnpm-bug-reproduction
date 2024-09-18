import {Entity, MikroORM, PrimaryKey, Property} from '@mikro-orm/sqlite';
import {bootstrapDb} from "../packages/package1/src";

@Entity()
class User {

    @PrimaryKey()
    id!: number;

    @Property()
    name: string;

    @Property({unique: true})
    email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

}

describe("pnpm workspaces", () => {
    test('MikroORM.init imported from the package should work', async () => {
        // This gives MetadataError: Only abstract entities were discovered, maybe you forgot to use @Entity() decorator?
        const orm = await bootstrapDb({entities: [User]});
        orm.close()
    });

    test('Injecting MikroORM.init to a package should work', async () => {
        // With the MikroORM imported from this file it works
        const orm = await bootstrapDb({entities: [User], mikroORMInit: MikroORM.init.bind(MikroORM)});
        orm.close()
    });
})
